"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="md:ml-64 transition-all duration-300">
        {/* Navbar */}
        <Navbar />
        
        {/* Page Content */}
        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 pt-20"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
