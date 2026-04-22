/**
 * SVG compression — pure DOM manipulation, no pixel data involved
 *
 * Steps:
 *  1. Remove semantic-only elements: <metadata>, <title>, <desc>
 *  2. Remove XML comments
 *  3. Round numeric values in path `d`, transform, viewBox, and common
 *     numeric attributes to `precision` decimal places
 *  4. Collapse redundant whitespace in the serialised output
 *
 * Privacy: no network calls — runs entirely in the browser.
 */

const NUMERIC_ATTRS = [
  'x', 'y', 'x1', 'y1', 'x2', 'y2',
  'cx', 'cy', 'r', 'rx', 'ry',
  'width', 'height',
  'stroke-width', 'stroke-dasharray', 'stroke-dashoffset',
  'opacity', 'fill-opacity', 'stroke-opacity',
  'font-size', 'letter-spacing',
  'offset',                // <stop offset>
];

// Rounds every decimal number inside an arbitrary string
function roundNumbers(value: string, precision: number): string {
  return value.replace(/-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/g, (match) => {
    const n = parseFloat(match);
    if (isNaN(n)) return match;
    const rounded = parseFloat(n.toFixed(precision));
    return rounded.toString();
  });
}

function processElement(el: Element, precision: number): void {
  // Round path data
  const d = el.getAttribute('d');
  if (d) el.setAttribute('d', roundNumbers(d, precision));

  // Round transform matrix values
  const transform = el.getAttribute('transform');
  if (transform) el.setAttribute('transform', roundNumbers(transform, precision));

  // Round viewBox
  const viewBox = el.getAttribute('viewBox');
  if (viewBox) el.setAttribute('viewBox', roundNumbers(viewBox, precision));

  // Round known numeric attributes
  for (const attr of NUMERIC_ATTRS) {
    const val = el.getAttribute(attr);
    if (val) el.setAttribute(attr, roundNumbers(val, precision));
  }

  // Recurse into children
  for (const child of Array.from(el.children)) {
    processElement(child, precision);
  }
}

function removeComments(node: Node): void {
  const toRemove: Node[] = [];
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_COMMENT);
  let current: Node | null;
  while ((current = walker.nextNode())) toRemove.push(current);
  for (const c of toRemove) c.parentNode?.removeChild(c);
}

export async function compressSvg(file: File, precision: number): Promise<Blob> {
  const text = await file.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'image/svg+xml');

  // Abort on parse error (parseFromString never throws — check for error element)
  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error(`SVG parse error: ${parseError.textContent?.slice(0, 100)}`);

  // Remove editor metadata that adds no visual content
  for (const tag of ['metadata', 'title', 'desc']) {
    doc.querySelectorAll(tag).forEach((el) => el.remove());
  }

  // Remove XML comments
  removeComments(doc.documentElement);

  // Round coordinate precision
  processElement(doc.documentElement, precision);

  // Serialise and collapse redundant internal whitespace between tags
  const raw = new XMLSerializer().serializeToString(doc);
  const optimised = raw
    .replace(/>\s{2,}</g, '><')   // collapse whitespace between tags
    .replace(/\s{2,}/g, ' ');     // collapse runs of spaces elsewhere

  return new Blob([optimised], { type: 'image/svg+xml' });
}
