import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Royal Art — Beyond Art | Premium Art Marketplace',
  description:
    'A curated world of original artworks that celebrate timeless traditions and contemporary expression.',
  icons: {
    icon: '/assets/royal-art-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F6F0E4] text-[#25251F] selection:bg-[#C6A15B] selection:text-[#05291F]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
