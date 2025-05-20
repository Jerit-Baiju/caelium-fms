'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArchive,
  FiBarChart2,
  FiCreditCard,
  FiDollarSign,
  FiHome,
  FiPieChart,
  FiSettings,
  FiTarget,
  FiTrendingDown,
  FiTrendingUp
} from "react-icons/fi";

const sidebarLinks = [
  { 
    section: "OVERVIEW",
    items: [
      { name: "Dashboard", url: "/", icon: FiHome },
      { name: "Analytics", url: "/analytics", icon: FiBarChart2 },
      { name: "Goals", url: "/goals", icon: FiTarget },
    ]
  },
  {
    section: "FINANCES",
    items: [
      { name: "Transactions", url: "/transactions", icon: FiDollarSign },
      { name: "Income", url: "/income", icon: FiTrendingUp },
      { name: "Expenses", url: "/expenses", icon: FiTrendingDown },
      { name: "Cards", url: "/cards", icon: FiCreditCard },
      { name: "Archives", url: "/archives", icon: FiArchive },
    ]
  },
  {
    section: "SYSTEM",
    items: [
      { name: "Reports", url: "/reports", icon: FiPieChart },
      { name: "Settings", url: "/settings", icon: FiSettings },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -15, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed top-0 left-0 z-30 w-64 h-screen hidden md:block border-r border-border bg-sidebar"
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col py-6 overflow-y-auto">
        {/* Logo Section */}
        <div className="px-6 mb-8">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-sidebar-foreground">
              Caelium FMS
            </span>
          </Link>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3 space-y-6">
          {sidebarLinks.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <div className="px-4 text-xs font-medium tracking-wider text-sidebar-foreground/70 uppercase">
                {section.section}
              </div>
              {section.items.map((item, index) => (
                <Link 
                  key={index}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors",
                    pathname === item.url 
                      ? "bg-sidebar-primary/10 text-sidebar-primary-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 mt-6 border-t border-sidebar-border">
          <div className="space-y-2">
            <p className="text-xs text-sidebar-foreground/70">Storage</p>
            <div className="w-full h-1.5 bg-sidebar-border/50 rounded-full overflow-hidden">
              <div className="bg-sidebar-primary h-full rounded-full" style={{ width: '35%' }}></div>
            </div>
            <div className="flex justify-between items-center text-xs text-sidebar-foreground/70">
              <span>3.5 GB</span>
              <span>10 GB</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )};