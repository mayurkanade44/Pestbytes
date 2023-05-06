import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/modals/Modal";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pestbytes",
  description: "Pestbytes designed for blogs on pest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
