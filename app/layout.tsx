import type { Metadata } from "next";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";

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
      <body>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
