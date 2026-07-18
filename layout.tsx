import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildRent Pro - Construction Equipment Rental & Materials Sales",
  description:
    "Rent premium construction equipment (excavators, cranes, bulldozers) or buy quality building materials at best prices. Fast delivery across India.",
  keywords:
    "construction equipment rental, excavator rental, crane hire, building materials, cement, steel, TMT bars, construction supplies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
