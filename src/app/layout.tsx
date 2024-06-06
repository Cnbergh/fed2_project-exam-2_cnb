import './globals.css';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Bebas_Neue } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import Header from '@/components/header/header';
import ToasterProvider from '@/components/providers/toaster_provider';
import { AuthProvider } from '@/components/providers/auth_context';

const inter = Bebas_Neue({ subsets: ['latin'], weight:'400' });

export const metadata: Metadata = {
  title: 'Holidaze',
  description: 'Created by CNB',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
{/*         <Theme> */}
          <AuthProvider>
            <ToasterProvider />
            <Header />
            {children}
          </AuthProvider>
{/*         </Theme> */}
      </body>
    </html>
  );
}
