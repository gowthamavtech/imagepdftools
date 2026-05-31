'use client';

import { PDF } from '@libpdf/core';

export async function unlockPdf(bytes: Uint8Array, password: string): Promise<Uint8Array> {
  const pdf = await PDF.load(bytes, { credentials: password });
  pdf.removeProtection();
  return pdf.save();
}
