
import { Poppins,GoogleSans,Montserrat,DM_Sans,Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "./Toast";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from "@/components/ui/toaster"

const inter = Outfit({ subsets: ["latin"], weight:["100","200","300","400","500","600","700","800","900"] 
});

export const metadata = {
  title: "The Bridge",
  description: "Annual Youth Camp 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <ToastContainer/>
        <Toaster/>
        <Footer/>
        </body>
    </html>
  );
}
