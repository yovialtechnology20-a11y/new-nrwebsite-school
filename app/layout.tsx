import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import { Toaster } from '@/components/ui/sonner';
import SplashWrapper from '@/components/SplashWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'PACE NR Olympiad School | Excellence in Education',
  description: 'PACE NR Olympiad School - A premier institution for Olympiad preparation and academic excellence. Nurturing young minds through innovative education.',
  keywords: ['Olympiad School', 'PACE NR', 'Education', 'Academic Excellence', 'Olympiad Coaching'],
  openGraph: {
    title: 'PACE NR Olympiad School | Excellence in Education',
    description: 'A premier institution for Olympiad preparation and academic excellence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider>
          <SplashWrapper>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16 md:pt-28">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </SplashWrapper>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
