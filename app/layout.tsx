import './globals.css';
import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import { DefaultAppBar } from './ui/app-bar';
import { Footer } from './ui/footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tomato Health',
  description: 'Soluções inovadoras para a saúde das suas plantas.',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Place any additional head elements here */}
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <DefaultAppBar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
