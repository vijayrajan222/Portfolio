import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

// Display face — used with restraint, only for the huge stacked name.
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '800'],
  variable: '--font-display',
});

// Body face — tagline subtitle and any longer-form copy.
const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
});

// Utility face — eyebrow label, REC badge, scroll label. Gives the
// developer-portfolio feel a touch of technical/timecode credibility.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-mono',
});

export const metadata = {
  title: 'Vijayaraj A N — Full-Stack Developer',
  description:
    'Full-Stack Developer building data-driven web applications with the MERN stack.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
