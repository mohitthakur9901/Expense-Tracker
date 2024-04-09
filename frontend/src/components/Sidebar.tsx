import React from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


interface User {
    _id: string;
    name: string;
    email: string;
    refresh_token: string;
    account: string;
}

interface SidebarProps {
    className?: string;
    links: { title: string; path: string }[];
    user: User | null;
    isOpen?: boolean;
    toggleSidebar?: () => void; // Added toggleSidebar function prop
}

const Sidebar: React.FC<SidebarProps> = ({
    className,
    links,
    user,
    isOpen = false,
    toggleSidebar,
}) => {
    return (
        <div className="">
            <div className={`fixed top-0 left-0 w-64 h-full bg-slate-100 rounded-r-md  z-50 transition-all duration-300 ease-in-out transform ${isOpen ? "-translate-x-0" : "-translate-x-full"
                } md:w-64 lg:w-80 ${className}`}>
                <div className="flex items-center justify-between py-4 px-6 ">
                    <h1 className="text-xl font-bold ">Expense Tracker</h1>
                </div>
                <div className="flex flex-col space-y-4 px-6 py-4">
                    {links.map((link) => (
                        <Link
                            key={link.title}
                            to={link.path}
                            className="hover:text-gray-400 py-2 px-4 rounded-md font-medium bg-gray-200 "
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className="mt-auto flex items-end justify-center border border-t-2 rounded-xl" >
                    {user && <p className="text-lg text-gray-400">Hi, {user.name}</p>}
                </div>
                <div className="fixed bottom-10 left-2">
                    <Button className="text-gray-400 hover:text-white">
                        <Link to="/sign-in">Sign Out</Link>
                    </Button>
                </div>
            </div>
            <div className="fixed bottom-4 right-4 rounded-lg flex  md:hidden">
                <Button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                    {
                        toggleSidebar ? <FaBars size={20} /> : <FaTimes size={20} />
                    }
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
