export interface ZipEntry {
  name: string;
  blob: Blob;
}

/**
 * Assembles a ZIP file from the given entries and triggers a browser download.
 * JSZip is dynamically imported so it doesn't contribute to the initial bundle.
 */
export async function downloadAllAsZip(results: ZipEntry[]): Promise<void> {
  if (results.length === 0) return;

  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();

  for (const { name, blob } of results) {
    const arrayBuffer = await blob.arrayBuffer();
    zip.file(name, arrayBuffer);
  }

  const content = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ImagePDF.Tools-compressed.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
