import type { Metadata } from "next";
import "./globals.scss";
import Header from "@/app/_componets/Header/Header";

export const metadata: Metadata = {
  title: "Volodymyr Leskiv",
  description: "Volodymyr Leskiv's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
      <div className="flex w-full justify-center">
          <main className="px-4">
            {children}
          </main>
      </div>

      </body>
    </html>
  );
}
