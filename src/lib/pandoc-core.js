/* pandoc-wasm: Core pandoc logic (environment-agnostic)
   Vendored from node_modules/pandoc-wasm/src/core.js to allow direct import
   without hitting the package's exports-map restriction. Do not edit; update
   by re-copying from the source package when pandoc-wasm is upgraded.
*/

import {
    ConsoleStdout,
    File,
    OpenFile,
    PreopenDirectory,
    WASI
} from "@bjorn3/browser_wasi_shim"

// Initialize and export the pandoc instance creator
export function createPandocInstance(wasmBinary) {
    // Initialize WASM module
    const args = ["pandoc.wasm", "+RTS", "-H64m", "-RTS"]
    const env = []
    const fileSystem = new Map()
    const fds = [
        new OpenFile(new File(new Uint8Array(), {readonly: true})),
        ConsoleStdout.lineBuffered(msg => console.log(`[WASI stdout] ${msg}`)),
        ConsoleStdout.lineBuffered(msg => console.warn(`[WASI stderr] ${msg}`)),
        new PreopenDirectory("/", fileSystem)
    ]
    const options = {debug: false}
    const wasi = new WASI(args, env, fds, options)

    // Instantiate WASM
    return WebAssembly.instantiate(wasmBinary, {
        wasi_snapshot_preview1: wasi.wasiImport
    }).then(({instance}) => {
        wasi.initialize(instance)
        instance.exports.__wasm_call_ctors()

        function memory_data_view() {
            return new DataView(instance.exports.memory.buffer)
        }

        const argc_ptr = instance.exports.malloc(4)
        memory_data_view().setUint32(argc_ptr, args.length, true)
        const argv = instance.exports.malloc(4 * (args.length + 1))
        for (let i = 0; i < args.length; ++i) {
            const arg = instance.exports.malloc(args[i].length + 1)
            new TextEncoder().encodeInto(
                args[i],
                new Uint8Array(
                    instance.exports.memory.buffer,
                    arg,
                    args[i].length
                )
            )
            memory_data_view().setUint8(arg + args[i].length, 0)
            memory_data_view().setUint32(argv + 4 * i, arg, true)
        }
        memory_data_view().setUint32(argv + 4 * args.length, 0, true)
        const argv_ptr = instance.exports.malloc(4)
        memory_data_view().setUint32(argv_ptr, argv, true)

        instance.exports.hs_init_with_rtsopts(argc_ptr, argv_ptr)

        // Helper function to add file to filesystem
        // Accepts either a Blob or a string
        async function addFile(filename, data, readonly) {
            let uint8Array
            if (typeof data === "string") {
                // Convert string to Uint8Array
                uint8Array = new TextEncoder().encode(data)
            } else {
                // Assume it's a Blob
                const buffer = await data.arrayBuffer()
                uint8Array = new Uint8Array(buffer)
            }
            const file = new File(uint8Array, {readonly: readonly})
            fileSystem.set(filename, file)
        }

        // Main API: query function
        function query(options) {
            const opts_str = JSON.stringify(options)
            const encoded = new TextEncoder().encode(opts_str)
            // Allocate memory based on byte length, not character count
            const opts_ptr = instance.exports.malloc(encoded.length)
            new TextEncoder().encodeInto(
                opts_str,
                new Uint8Array(
                    instance.exports.memory.buffer,
                    opts_ptr,
                    encoded.length
                )
            )

            // Setup filesystem
            fileSystem.clear()
            const out_file = new File(new Uint8Array(), {readonly: false})
            const err_file = new File(new Uint8Array(), {readonly: false})
            fileSystem.set("stdout", out_file)
            fileSystem.set("stderr", err_file)

            instance.exports.query(opts_ptr, encoded.length)

            const err_text = new TextDecoder("utf-8", {fatal: true}).decode(
                err_file.data
            )
            if (err_text) {
                console.log(err_text)
            }
            const out_text = new TextDecoder("utf-8", {fatal: true}).decode(
                out_file.data
            )
            return JSON.parse(out_text)
        }

        // Main API: convert function
        async function convert(options, stdin, files) {
            const opts_str = JSON.stringify(options)

            const encoded = new TextEncoder().encode(opts_str)
            const opts_ptr = instance.exports.malloc(encoded.length)
            new TextEncoder().encodeInto(
                opts_str,
                new Uint8Array(
                    instance.exports.memory.buffer,
                    opts_ptr,
                    encoded.length
                )
            )

            // Clone files object to avoid mutating the input parameter
            files = {...files}

            // Setup filesystem
            fileSystem.clear()
            const in_file = new File(new Uint8Array(), {readonly: true})
            const out_file = new File(new Uint8Array(), {readonly: false})
            const err_file = new File(new Uint8Array(), {readonly: false})
            const warnings_file = new File(new Uint8Array(), {readonly: false})
            fileSystem.set("stdin", in_file)
            fileSystem.set("stdout", out_file)
            fileSystem.set("stderr", err_file)
            fileSystem.set("warnings", warnings_file)

            // Track known files to detect newly created media files
            const knownFiles = new Set([
                "stdin",
                "stdout",
                "stderr",
                "warnings"
            ])

            // Add input files (can be Blobs or strings)
            for (const filename in files) {
                await addFile(filename, files[filename], true)
                knownFiles.add(filename)
            }

            const outputFileName = options["output-file"] || null
            const extractMediaPath = options["extract-media"] || null

            if (outputFileName) {
                await addFile(outputFileName, new Blob(), false)
                knownFiles.add(outputFileName)
            }

            if (extractMediaPath) {
                // Do NOT pre-create the directory as a file — pandoc needs to
                // create it as a directory via WASI. Pre-creating it as a File
                // causes "inappropriate type (Not a directory)" errors.
                if (extractMediaPath.endsWith(".zip")) {
                    await addFile(extractMediaPath, new Blob(), false)
                    knownFiles.add(extractMediaPath)
                }
            }

            // Set stdin content
            if (stdin) {
                in_file.data = new TextEncoder().encode(stdin)
            }

            // Run conversion
            instance.exports.convert(opts_ptr, encoded.length)

            // Collect output file if generated
            if (options["output-file"]) {
                const outputFile = fileSystem.get(options["output-file"])
                if (outputFile && outputFile.data && outputFile.data.length > 0) {
                    files[options["output-file"]] = new Blob([outputFile.data])
                }
            }

            // Collect extracted media if generated
            if (options["extract-media"]) {
                const mediaFile = fileSystem.get(options["extract-media"])
                if (mediaFile && mediaFile.data && mediaFile.data.length > 0) {
                    files[options["extract-media"]] = new Blob(
                        [mediaFile.data],
                        { type: "application/zip" }
                    )
                }
            }

            // Recursively walk WASI filesystem (directories are nested Maps or
            // Directory objects with a .contents Map — not flat top-level entries).
            function collectFilesRecursive(container, prefix) {
                const result = {}
                const map =
                    container instanceof Map
                        ? container
                        : container && container.contents instanceof Map
                        ? container.contents
                        : null
                if (!map) return result
                for (const [name, entry] of map.entries()) {
                    const fullPath = prefix ? `${prefix}/${name}` : name
                    if (entry && entry.data instanceof Uint8Array) {
                        if (entry.data.length > 0) result[fullPath] = entry
                    } else if (entry) {
                        Object.assign(result, collectFilesRecursive(entry, fullPath))
                    }
                }
                return result
            }

            // Collect any newly created media files (e.g., extracted images)
            const mediaFiles = {}
            const allFsFiles = collectFilesRecursive(fileSystem, "")
            for (const [name, fileData] of Object.entries(allFsFiles)) {
                if (
                    !knownFiles.has(name) &&
                    fileData &&
                    fileData.data &&
                    fileData.data.length > 0
                ) {
                    const blob = new Blob([fileData.data])
                    files[name] = blob
                    if (name !== outputFileName && name !== extractMediaPath) {
                        mediaFiles[name] = blob
                    }
                }
            }

            // Parse warnings
            const rawWarnings = new TextDecoder("utf-8", {fatal: true}).decode(
                warnings_file.data
            )
            let warnings = []
            if (rawWarnings) {
                try {
                    warnings = JSON.parse(rawWarnings)
                } catch (e) {
                    console.warn("Failed to parse warnings:", e)
                }
            }

            return {
                stdout: new TextDecoder("utf-8", {fatal: true}).decode(out_file.data),
                stderr: new TextDecoder("utf-8", {fatal: true}).decode(err_file.data),
                warnings: warnings,
                files: files,
                mediaFiles: mediaFiles
            }
        }

        // Helper function to convert data to Uint8Array
        async function toUint8Array(inData) {
            let uint8Array
            if (typeof inData === "string") {
                uint8Array = new TextEncoder().encode(inData)
            } else if (inData instanceof Blob) {
                const arrayBuffer = await inData.arrayBuffer()
                uint8Array = new Uint8Array(arrayBuffer)
            } else {
                throw new Error("Unsupported type: inData must be a string or a Blob")
            }
            return uint8Array
        }

        const textDecoder = new TextDecoder("utf-8", {fatal: true})

        function convertData(data) {
            let outData
            try {
                outData = textDecoder.decode(data)
            } catch (_e) {
                outData = new Blob([data])
            }
            return outData
        }

        // Legacy API: pandoc function (for backward compatibility)
        async function pandoc(args_str, inData, resources = []) {
            const argParts = args_str.trim().split(/\s+/)
            const options = {}
            const files = {}

            let i = 0
            while (i < argParts.length) {
                const arg = argParts[i]
                if (arg === "-f" || arg === "--from") {
                    options.from = argParts[++i]
                } else if (arg === "-t" || arg === "--to") {
                    options.to = argParts[++i]
                } else if (arg === "-o" || arg === "--output") {
                    options["output-file"] = argParts[++i]
                } else if (arg === "-s" || arg === "--standalone") {
                    options.standalone = true
                } else if (arg === "--extract-media") {
                    options["extract-media"] = argParts[++i]
                } else if (arg === "--toc" || arg === "--table-of-contents") {
                    options["table-of-contents"] = true
                }
                i++
            }

            for (const resource of resources) {
                if (typeof resource.contents === "string") {
                    files[resource.filename] = resource.contents
                } else {
                    const contents = await toUint8Array(resource.contents)
                    files[resource.filename] = new Blob([contents])
                }
            }

            let stdin = null
            if (inData) {
                if (typeof inData === "string") {
                    stdin = inData
                } else {
                    const uint8Array = await toUint8Array(inData)
                    stdin = new TextDecoder("utf-8").decode(uint8Array)
                }
            }

            const result = await convert(options, stdin, files)

            const mediaFiles = new Map()
            for (const [name, blob] of Object.entries(result.mediaFiles)) {
                mediaFiles.set(
                    name,
                    convertData(new Uint8Array(await blob.arrayBuffer()))
                )
            }

            let out
            if (options["output-file"] && result.files[options["output-file"]]) {
                out = convertData(
                    new Uint8Array(await result.files[options["output-file"]].arrayBuffer())
                )
            } else {
                out = result.stdout
            }

            return { out, mediaFiles }
        }

        return { convert, query, pandoc }
    })
}
