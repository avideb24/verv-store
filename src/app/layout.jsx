import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/navbar";
import { QueryProvider } from "@/providers/query-provider";
import { CartProvider } from "@/providers/cart-provider";

export const metadata = {
  title: "Verv Store",
  description: "E-commerce Store",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body
        className={`antialiased bg-light dark:bg-dark text-dark dark:text-light`}>
        <QueryProvider>
          <CartProvider>
            <Navbar />
            <div className="min-h-screen py-5 md:py-8">
              {children}
            </div>
            <Toaster />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
