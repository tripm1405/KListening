import type { Metadata } from 'next';
import localFont from 'next/font/local';
import React from 'react';
import AppProvider from '~/app/App.Provider';
import { ILayoutProps } from '~/app.type';
import './globals.css';
import Script from 'next/script';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'K',
};

export default function RootLayout({ children }: ILayoutProps) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <AppProvider>
      {children}
    </AppProvider>
    <Script src="https://code.responsivevoice.org/responsivevoice.js?key=uvxBCSG2" />
    </body>
    </html>
  );
}
