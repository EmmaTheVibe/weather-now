import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata = {
  title: "Weather Now",
  description: "Weather Now",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${bricolageGrotesque.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
