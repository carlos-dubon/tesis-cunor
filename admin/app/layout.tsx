import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./_components/Sidebar";
import { Toaster } from "react-hot-toast";
import { BallotContextProvider } from "./_context/BallotContext";

const font = Inter({
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vota Seguro Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <BallotContextProvider>
          <div className="grid grid-cols-[300px_max-content]">
            <Sidebar />
            <div className="border-l border-l-gray-200 min-h-screen p-4">
              {children}
            </div>
          </div>
        </BallotContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
