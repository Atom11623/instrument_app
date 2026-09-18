import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instrumentation O&M System",
  description: "Instrumentation Engineering Operations & Maintenance System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
