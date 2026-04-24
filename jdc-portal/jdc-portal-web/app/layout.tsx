import type { Metadata } from "next";
import "./globals.css";
import ToasterWrapper from "./_widget/toaster-wrapper";

export const metadata: Metadata = {
  title: "JDC",
  description: "Java Developer Class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {children}
        <ToasterWrapper />
      </body>
    </html>
  );
}
