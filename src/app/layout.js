import { Google_Sans_Code, Roboto_Mono, Alegreya_Sans_SC } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const a = Alegreya_Sans_SC({
  subsets: ["latin"],
  weight: ['400'],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "luis eme | creating stuff ",
  description: "Websites, AI, Big Data, Crypto.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={a.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
