import JSZip from 'jszip';

export interface DocxAnalysis {
  hasHeadersFooters: boolean;
  hasNestedTables:   boolean;
  hasTextBoxes:      boolean;
  hasCustomFonts:    boolean;
  hasImages:         boolean;
  hasColumns:        boolean;
  recommendation:    'fast' | 'hd';
  reasons:           string[];
}

// Fonts that Typst ships with — anything outside this set = "custom"
const BUNDLED_FONTS = new Set([
  'calibri', 'arial', 'times new roman', 'courier new', 'helvetica',
  'georgia', 'verdana', 'trebuchet ms', 'garamond', 'palatino',
  'cambria', 'tahoma', 'century gothic', 'book antiqua', 'comic sans ms',
  'linux libertine', 'new computer modern',
]);

export async function analyzeDocx(file: File): Promise<DocxAnalysis> {
  const blank: DocxAnalysis = {
    hasHeadersFooters: false, hasNestedTables: false, hasTextBoxes: false,
    hasCustomFonts: false, hasImages: false, hasColumns: false,
    recommendation: 'fast', reasons: [],
  };

  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(await file.arrayBuffer());
  } catch {
    return blank;
  }

  const hasHeadersFooters = Boolean(
    zip.file('word/header1.xml') || zip.file('word/footer1.xml')
  );

  const docXml = await zip.file('word/document.xml')?.async('string') ?? '';

  // Detect nested tables: a <w:tbl> that appears before its outer </w:tbl> closes
  const hasNestedTables = /<w:tbl\b[^>]*>(?:(?!<\/w:tbl>)[\s\S])*<w:tbl\b/.test(docXml);

  // Text boxes and drawing canvases
  const hasTextBoxes = /<wps:txbx\b|<mc:AlternateContent\b|<v:textbox\b/.test(docXml);

  // Inline or anchored images
  const hasImages = /<wp:inline\b|<wp:anchor\b/.test(docXml);

  // Multi-column layout (2+ columns)
  const hasColumns = /<w:cols\s[^>]*w:num="(?:[2-9]|\d{2,})/.test(docXml);

  // Fonts not in Typst's bundled set → would be substituted in Fast mode
  const fontTableXml = await zip.file('word/fontTable.xml')?.async('string') ?? '';
  const fontNames: string[] = [];
  for (const m of fontTableXml.matchAll(/w:name="([^"]+)"/g)) {
    fontNames.push(m[1].toLowerCase());
  }
  const hasCustomFonts = fontNames.some((f) => !BUNDLED_FONTS.has(f));

  const reasons: string[] = [];
  if (hasHeadersFooters) reasons.push('headers/footers');
  if (hasNestedTables)   reasons.push('complex tables');
  if (hasTextBoxes)      reasons.push('text boxes');
  if (hasCustomFonts)    reasons.push('custom fonts');
  if (hasColumns)        reasons.push('multi-column layout');

  return {
    hasHeadersFooters, hasNestedTables, hasTextBoxes,
    hasCustomFonts, hasImages, hasColumns,
    recommendation: reasons.length > 0 ? 'hd' : 'fast',
    reasons,
  };
}
