import localFont from "next/font/local";
import { Inter, Poppins} from 'next/font/google'
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({subsets: ['latin']});
const poppins = Inter({subsets: ['latin'], variable: '--font-poppins'})


export const metadata = {
  title: "EduConnect - World best learning platform",
  description: "Explore || Learn || Build || Share",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, poppins.className)}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
