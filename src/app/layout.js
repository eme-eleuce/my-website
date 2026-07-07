import { Roboto_Mono, Alegreya_Sans_SC } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const a = Alegreya_Sans_SC({
  subsets: ["latin"],
  weight: ['400'],
  variable: "--font-display",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ['400'],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "luis eme | creating stuff ",
  description: "Websites, AI, Big Data, Crypto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${a.className} ${robotoMono.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
