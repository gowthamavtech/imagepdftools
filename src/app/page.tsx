import type { Metadata } from "next";
import { CompressorUI } from "@/components/CompressorUI";

export const metadata: Metadata = {
    title: "SquishIt — Free Image Compressor Online",
    description: "Compress JPEG, PNG, and WebP images in your browser instantly. No uploads, no server, no limits. 100% private.",
    alternates: { canonical: "https://squishit.app" },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "SoftwareApplication",
            name: "SquishIt",
            operatingSystem: "Any (browser-based)",
            applicationCategory: "UtilitiesApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
            "@type": "HowTo",
            name: "How to compress an image online",
            step: [
                { "@type": "HowToStep", text: "Drag and drop your image onto the drop zone." },
                { "@type": "HowToStep", text: "Adjust the quality slider to set compression level." },
                { "@type": "HowToStep", text: "Click Download to save your compressed image." },
            ],
        },
    ],
};

export default function HomePage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <main className="relative flex-1 overflow-hidden">
                {/* Shared gradient background — covers hero + drop zone as one section */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-purple-600 to-pink-500 opacity-[0.08] dark:opacity-[0.15]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />
                <div className="absolute top-10 right-1/4 w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-10 dark:opacity-5 pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 pt-10 sm:pt-16 pb-16 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                        100% Browser-Based · Zero Uploads
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                        Compress Images <span className="italic bg-linear-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">Instantly</span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
                        Reduce JPEG, PNG, WebP and SVG file sizes right in your browser. Nothing is ever uploaded to a server.
                    </p>

                    {/* Stats row */}
                    <div className="flex justify-center gap-6 sm:gap-10 text-sm mb-10">
                        {[
                            { value: "Free", label: "Forever" },
                            { value: "100%", label: "Private" },
                            { value: "5 formats", label: "Supported" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <div className="font-bold text-violet-600 dark:text-violet-400 text-base sm:text-lg">{value}</div>
                                <div className="text-gray-400 text-xs">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Drop zone + compressor — same section, no divider */}
                    <div className="text-left">
                        <CompressorUI />
                    </div>
                </div>
            </main>

        </>
    );
}
