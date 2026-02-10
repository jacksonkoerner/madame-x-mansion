import type { Metadata } from "next";
import { Cormorant_Garamond, Crimson_Text, Jost } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const crimson = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-crimson",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Madame X Mansion — 927 Toulouse Street, New Orleans",
  description:
    "Where scandal meets splendor. A storied French Quarter address with luxury apartments at 927 Toulouse Street, New Orleans. Est. 1825.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${crimson.variable} ${jost.variable}`}>
      <body className="font-body">
        <div className="noise-overlay" />
        <Navigation />
        <main className="page-enter">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
