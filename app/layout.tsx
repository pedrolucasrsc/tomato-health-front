'use client';

import './globals.css';
import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import createEmotionCache from './createEmotionCache';
import theme from './theme';
import { DefaultAppBar } from './ui/app-bar';
import { Footer } from './ui/footer';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Seu Aplicativo',
//   description: 'Soluções inovadoras para a saúde das suas plantas.',
// };

const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Place any additional head elements here */}
      </head>
      <body className={inter.className}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline provides a consistent baseline */}
            <CssBaseline />
            <DefaultAppBar />
            {children}
            <Footer />
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
