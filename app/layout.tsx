import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Comma Design Challenge",
  description: "A design challenge for comma.ai",
  icons: {
    icon: "https://comma.ai/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://comma.ai/favicon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
