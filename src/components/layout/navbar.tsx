'use client';

import TransactionDialog from "@/components/transactions/TransactionDialog";
import { Button } from "@/components/ui/button";
import { useNavbar } from "@/contexts/NavContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiBell, FiMenu, FiSearch } from "react-icons/fi";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const { navLinks, ctaButton, dropDown } = useNavbar();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full z-20 top-0 start-0 md:pl-72 md:px-6 md:py-4"
    >
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center justify-between bg-background md:rounded-2xl shadow-sm px-6 py-3 border border-border">
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleMobileMenu}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            <FiMenu className="h-5 w-5" />
          </Button>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-semibold whitespace-nowrap">
            Caelium FMS
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks?.map((button, index) => (
            <Link
              key={index}
              href={button.url}
              className={`text-sm font-medium transition-colors ${
                button.active
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              {button.name}
            </Link>
          ))}
          {dropDown && (
            <div className="relative">
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-foreground"
              >
                {dropDown.name}
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </button>
              <div
                id="dropdownNavbar"
                className="z-10 hidden absolute top-full mt-2 w-48 bg-background rounded-xl shadow-lg"
              >
                <ul className="py-2">
                  {dropDown.options.map((option, index) => (
                    <li key={index}>
                      <a
                        href={option.url}
                        className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted"
                      >
                        {option.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-muted/50 border border-border text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          
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
          
          {/* CTA Button */}
          {ctaButton && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button
                onClick={() => setShowTransactionDialog(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium h-auto"
              >
                {ctaButton.name}
              </Button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } absolute top-full left-0 right-0 mt-4 mx-6 bg-background rounded-2xl shadow-lg md:hidden`}
        id="navbar-sticky"
      >
        <ul className="py-4">
          {navLinks?.map((link, index) => (
            <li key={index}>
              <Link
                href={link.url}
                className={`block px-6 py-3 text-sm font-medium ${
                  link.active
                    ? 'text-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {ctaButton && (
            <li className="px-6 py-3">
              <Button
                onClick={() => {
                  setShowTransactionDialog(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium text-center h-auto"
              >
                {ctaButton.name}
              </Button>
            </li>
          )}
        </ul>
      </div>

      {/* Transaction Dialog */}
      <TransactionDialog 
        open={showTransactionDialog} 
        onOpenChange={setShowTransactionDialog} 
      />
    </motion.nav>
  );
}
