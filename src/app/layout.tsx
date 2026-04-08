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
    default: "Lekker Layouts | The Networking Hub for SA Business Owners",
    template: "%s | Lekker Layouts",
  },
  description:
    "The networking hub for South African small business owners. Connect with entrepreneurs, grow your brand, and access digital tools to take your business further.",
  keywords: [
    "South African business network",
    "small business South Africa",
    "entrepreneur networking SA",
    "business community platform",
    "SA startup hub",
    "connect business owners",
    "grow your business South Africa",
  ],
  authors: [{ name: "Lekker Layouts" }],
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Lekker Layouts",
    title: "Lekker Layouts | Where SA Businesses Grow Together",
    description:
      "The networking hub for South African small business owners. Connect, grow, and get discovered.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lekker Layouts",
    description:
      "The networking hub for South African small business owners. Connect, grow, and get discovered.",
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
