import type { Metadata } from 'next';
import WhatsNewContent from './WhatsNewContent';

export const metadata: Metadata = {
  title: "What's New",
  description: 'The latest features, improvements, and fixes in ImagePDF.Tools — updated with every release.',
  alternates: { canonical: 'https://imagepdf.tools/whats-new' },
  robots: { index: true, follow: true },
};

export default function WhatsNewPage() {
  return <WhatsNewContent />;
}
