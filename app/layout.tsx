import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./scene.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devansh Mahant — AI/ML & Full-Stack Engineer",
  description:
    "I make machines think and interfaces feel. AI agent infrastructure, LLM guardrails, and full-stack systems. Bangalore, India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
