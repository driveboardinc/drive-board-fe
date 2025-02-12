import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Driver Board",
  description:
    "Simplifying the hiring process for transportation companies and helping drivers find their next opportunity. The most advanced job and load board platform for the modern trucking industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-inter antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
