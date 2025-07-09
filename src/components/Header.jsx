/* eslint-disable no-unused-vars */
import { useUserAuth } from "@/context/userAuthContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { Home, FileText, PlusCircle, Info, Mail, LogOut } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useUserAuth();
    const navigate = useNavigate();

    const handleCreateClick = (e, to) => {
        if (!user) {
            e.preventDefault();
            navigate('/login');
        }
        // If user exists, default Link behavior will proceed to /create
    };

    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally show error to user
        }
    };

    const menuItems = [
        {
            id: 1,
            name: 'Home',
            icon: <Home className="mr-2" />,
            to: '/'
        },
        {
            id: 2,
            name: 'Blogs',
            icon: <FileText className="mr-2" />,
            to: '/blogs'
        },
        {
            id: 3,
            name: 'Create',
            icon: <PlusCircle className="mr-2" />,
            to: '/create',
            requiresAuth: true
        },
        {
            id: 4,
            name: 'About',
            icon: <Info className="mr-2" />,
            to: '/about'
        },
        {
            id: 5,
            name: 'Contact',
            icon: <Mail className="mr-2" />,
            to: '/contact'
        }
    ];

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { y: -20, opacity: 0 },
        show: { y: 0, opacity: 1 },
        hover: { scale: 1.05, originX: 0, color: "#f8f8f8" },
        tap: { scale: 0.95 },
    };

    const logoVariants = {
        initial: { rotate: 0 },
        animate: { rotate: 360, transition: { duration: 1.5, repeat: Infinity, ease: "linear" } },
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg fixed w-full z-50"
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo with infinite rotation (only on hover) */}
                <Link to="/">
                    <motion.div
                        className="flex items-center gap-2 cursor-pointer"
                        whileHover="animate"
                        initial="initial"
                    >
                        <motion.div
                            variants={logoVariants}
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                        >
                            <span className="text-indigo-600 font-bold text-xl">B</span>
                        </motion.div>
                        <motion.span
                            className="text-xl font-bold"
                            whileHover={{ scale: 1.05 }}
                        >
                            BlogWave
                        </motion.span>
                    </motion.div>
                </Link>

                {/* Desktop Menu */}
                <motion.nav
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="hidden md:flex gap-8 items-center"
                >
                    {menuItems.map((menuItem) => (
                        <motion.div
                            key={menuItem.id}
                            variants={item}
                            whileHover="hover"
                            whileTap="tap"
                            className="relative cursor-pointer"
                        >
                            {menuItem.requiresAuth ? (
                                <Link
                                    to={menuItem.to}
                                    className="flex items-center"
                                    onClick={(e) => handleCreateClick(e, menuItem.to)}
                                >
                                    {menuItem.icon}
                                    {menuItem.name}
                                </Link>
                            ) : (
                                <Link
                                    to={menuItem.to}
                                    className="flex items-center"
                                >
                                    {menuItem.icon}
                                    {menuItem.name}
                                </Link>
                            )}
                            {menuItem.name === "Create" && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="absolute -top-2 -right-3 bg-yellow-400 text-xs text-black px-1 rounded-full"
                                >
                                    New!
                                </motion.span>
                            )}
                        </motion.div>
                    ))}

                    {user && (
                        <motion.div
                            variants={item}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 text-white hover:bg-white/10"
                                onClick={handleLogOut}
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </motion.div>
                    )}
                </motion.nav>

                {/* Mobile Menu Button */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col gap-1.5 z-50"
                >
                    <motion.span
                        animate={{
                            rotate: isOpen ? 45 : 0,
                            y: isOpen ? 8 : 0,
                            width: isOpen ? 28 : 24,
                        }}
                        className="block h-0.5 bg-white w-6"
                    ></motion.span>
                    <motion.span
                        animate={{ opacity: isOpen ? 0 : 1 }}
                        className="block h-0.5 bg-white w-6"
                    ></motion.span>
                    <motion.span
                        animate={{
                            rotate: isOpen ? -45 : 0,
                            y: isOpen ? -8 : 0,
                            width: isOpen ? 28 : 24,
                        }}
                        className="block h-0.5 bg-white w-6"
                    ></motion.span>
                </motion.button>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", bounce: 0.2 }}
                        className="fixed inset-0 bg-indigo-800 z-40 flex flex-col items-center justify-center gap-8 text-2xl md:hidden"
                    >
                        {menuItems.map((menuItem) => (
                            <motion.div
                                key={menuItem.id}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer py-2 px-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors flex items-center"
                                onClick={() => {
                                    setIsOpen(false);
                                    if (menuItem.requiresAuth && !user) {
                                        navigate('/login');
                                    }
                                }}
                            >
                                <Link
                                    to={menuItem.requiresAuth && !user ? '/login' : menuItem.to}
                                    className="flex items-center"
                                >
                                    {menuItem.icon}
                                    {menuItem.name}
                                </Link>
                            </motion.div>
                        ))}

                        {user && (
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer py-2 px-4 rounded-lg hover:bg-white hover:text-indigo-600 transition-colors flex items-center"
                                onClick={handleLogOut}
                            >
                                <LogOut className="mr-2" />
                                <span className="text-xl">Logout</span>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </motion.header>
    );
};

export default Header;