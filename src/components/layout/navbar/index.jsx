"use client";

import Link from "next/link";
import { ShoppingCart, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/providers/cart-provider";
import Theme from "../theme";
import Image from "next/image";
import logo from "@/assets/images/logo.png";


const Navbar = () => {

    const { getCartCount } = useCart();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 py-4 transition-all duration-300 bg-light dark:bg-dark ${scrolled
                ? "shadow-md border-b border-gray-200 dark:border-gray-700"
                : "border-b"
                }`}
        >
            <div className="container">
                <nav className="flex justify-between items-center">
                    <Link href="/" title="Verb Store">
                        <Image src={logo} className="w-24 md:w-32" width={100} height={100} alt="Verb Store" />
                    </Link>

                    <div className="flex items-center space-x-4">
                        <Link href="/add-product" className="button !hidden md:!flex">
                            <Plus />
                            Add Product
                        </Link>
                        <Link href={"/add-product"} className="md:hidden">
                            <Plus />
                        </Link>
                        <Link href="/cart" className="relative">
                            <ShoppingCart className="md:w-7 md:h-7" />
                            {getCartCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartCount()}
                                </span>
                            )}
                        </Link>
                        <Theme />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
