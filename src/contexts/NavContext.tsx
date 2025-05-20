'use client';
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { IconType } from 'react-icons';
import {
    FiArchive, FiBarChart2, FiCreditCard, FiDollarSign, FiHome,
    FiPieChart, FiSettings, FiTarget, FiTrendingDown, FiTrendingUp
} from 'react-icons/fi';

// Define interfaces for navigation
interface NavLink {
  name: string;
  url: string;
  active?: boolean;
}

interface DropDown {
  name: string;
  options: NavLink[];
}

// Define interface for sidebar option items
interface SidebarOption {
  name: string;
  url: string;
  icon: IconType;
}

// Define interface for sidebar sections
interface SidebarSection {
  section: string;
  items: SidebarOption[];
}

// Update the context interface to use proper types
interface NavbarContextData {
  ctaButton: NavLink | null;
  setCtaButton: Dispatch<SetStateAction<NavLink | null>>;
  navLinks: NavLink[] | null;
  setNavLinks: Dispatch<SetStateAction<NavLink[] | null>>;
  dropDown: DropDown | null;
  setDropDown: Dispatch<SetStateAction<DropDown | null>>;
  defaultCtaButton: NavLink | null;
  viewSM: boolean;
  setViewSM: Dispatch<SetStateAction<boolean>>;
  showNav: boolean;
  setShowNav: Dispatch<SetStateAction<boolean>>;
  resetToDefaultNav: () => void;
  sidebarOptions: SidebarOption[] | SidebarSection[];
  setSidebarOptions: Dispatch<SetStateAction<SidebarOption[] | SidebarSection[]>>;
  resetToDefaultSidebar: () => void;
}

const NavbarContext = createContext<NavbarContextData | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

// Default navigation configurations
let defaultNavLinks: NavLink[] = [
  { name: 'Dashboard', url: '/' },
  { name: 'Analytics', url: '/analytics' },
  { name: 'Transactions', url: '/transactions' },
];

let defaultCtaButton: NavLink = { name: 'Add Transaction', url: '/transactions/add' };

// Default sidebar options with sections
export const defaultSidebarOptions: SidebarSection[] = [
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

// Options for bottom navigation
export const bottomNavOptions: SidebarOption[] = [
  { name: "Dashboard", url: "/", icon: FiHome },
  { name: "Transactions", url: "/transactions", icon: FiDollarSign },
  { name: "Analytics", url: "/analytics", icon: FiBarChart2 },
  { name: "Reports", url: "/reports", icon: FiPieChart },
  { name: "Settings", url: "/settings", icon: FiSettings },
];

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State hooks
  const [ctaButton, setCtaButton] = useState<NavLink | null>(defaultCtaButton);
  const [navLinks, setNavLinks] = useState<NavLink[] | null>(defaultNavLinks);
  const [dropDown, setDropDown] = useState<DropDown | null>(null);
  const [viewSM, setViewSM] = useState<boolean>(true);
  const [showNav, setShowNav] = useState<boolean>(true);
  const [sidebarOptions, setSidebarOptions] = useState<SidebarOption[] | SidebarSection[]>(defaultSidebarOptions);

  // Function to reset navigation to default
  const resetToDefaultNav = () => {
    setNavLinks(defaultNavLinks);
    setCtaButton(defaultCtaButton);
    setDropDown(null);
  };

  // Function to reset sidebar to default
  const resetToDefaultSidebar = () => {
    setSidebarOptions(defaultSidebarOptions);
  };

  return (
    <NavbarContext.Provider
      value={{
        ctaButton,
        setCtaButton,
        navLinks,
        setNavLinks,
        dropDown,
        setDropDown,
        defaultCtaButton,
        viewSM,
        setViewSM,
        showNav,
        setShowNav,
        resetToDefaultNav,
        sidebarOptions,
        setSidebarOptions,
        resetToDefaultSidebar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export { type DropDown, type NavLink, type SidebarOption, type SidebarSection };
export default NavbarContext;
