import './globals.css';

export const metadata = {
  title: 'Vijayaraj A N — Full-Stack Developer',
  description:
    'Full-Stack Developer building data-driven web applications with the MERN stack.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
