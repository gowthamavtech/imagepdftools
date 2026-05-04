import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the ImagePDF.Tools team. We reply within 24 hours.',
  alternates: { canonical: 'https://imagepdf.tools/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactForm />;
}
