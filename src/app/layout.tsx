import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lekker Layouts | Custom-Coded Websites for South African Businesses",
    template: "%s | Lekker Layouts",
  },
  description:
    "Professional, hand-coded website templates built with modern technology. Lightning fast, SEO optimized, and fully customizable. Proudly South African.",
  keywords: [
    "web design South Africa",
    "website templates",
    "custom websites",
    "Next.js templates",
    "web development Cape Town",
    "South African web agency",
    "affordable websites SA",
  ],
  authors: [{ name: "Lekker Layouts" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Lekker Layouts",
    title: "Lekker Layouts | Custom-Coded Websites for South African Businesses",
    description:
      "Professional, hand-coded website templates built with modern technology. From R3,500.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekker Layouts",
    description:
      "Custom-coded websites for South African businesses. Fast, beautiful, affordable.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
