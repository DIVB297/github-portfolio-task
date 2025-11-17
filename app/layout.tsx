import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitHub Profile",
  description: "GitHub profile page clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
