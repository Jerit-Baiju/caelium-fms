"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiBell, FiMenu, FiMoon, FiSearch, FiSun, FiUser } from "react-icons/fi";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only show theme toggle after hydration to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 md:left-64 right-0 z-20 bg-background border-b border-border transition-all duration-300"
    >
      <div className="py-4 px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground"
            aria-label="Toggle menu"
          >
            <FiMenu className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Search Bar */}
        <div className="hidden md:flex relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full rounded-md bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (
              theme === "dark" ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )
            ) : (
              <span className="h-5 w-5" />
            )}
          </Button>
          
          {/* Notifications */}
          <Button 
            variant="ghost"
            size="icon"
            className="text-foreground relative"
            aria-label="Notifications"
          >
            <FiBell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
          </Button>
          
          {/* Profile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground"
            aria-label="Profile"
          >
            <FiUser className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
