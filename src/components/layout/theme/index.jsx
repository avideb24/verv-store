'use client';

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";



const Theme = () => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme == 'light') {
            setDarkMode(false)
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark')
        }
        else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode]);


    return (
        <div onClick={() => setDarkMode(!darkMode)} className="block px-4 w-14 h-7 bg-transparent border border-slate-700 dark:border-white rounded-full cursor-pointer relative">
            <p className={`${darkMode ? 'text-white' : 'text-black'} absolute ${darkMode ? 'top-[4px] left-1 ' : 'top-[4px] right-1'} duration-500`}>
                { darkMode ? <Sun size={16} /> : <Moon size={16} /> }
            </p>
        </div>
    );
};

export default Theme;