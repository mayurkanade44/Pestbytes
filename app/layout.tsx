import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Pestbytes Blog",
  description: "Pest blogs build with Next Js and AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className} suppressHydrationWarning={true}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
