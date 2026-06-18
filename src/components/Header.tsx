/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About us", href: "#about-us" },
    { name: "Services", href: "#services" },
    { name: "Blogs", href: "#blogs" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <>
      <header
        id="dental-navigation"
        className="w-full absolute top-0 left-0 z-50 pt-6 px-4 md:px-8 font-sans"
      >
        <div className="max-w-6xl mx-auto">
          {/* Floating purple capsule according to mock screenshot style */}
          <div className="bg-[#5D57A5]/90 backdrop-blur-lg rounded-full px-6 py-2.5 md:py-3 border border-white/15 shadow-lg flex items-center justify-between text-white">
            
            {/* Elegant Line-Art Custom Tooth Logo matching screenshot */}
            <a href="#home" className="flex items-center gap-2 group transition-opacity hover:opacity-90">
              <div className="relative flex items-center justify-center">
                <svg className="w-8 h-8 text-white filter drop-shadow animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C10.5 2 9.5 3 9 4.5c-.3 1-.3 2.2-.4 3.5-.1 1-.5 2-1.2 2.7C6.7 11.4 6 12.5 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.5-.7-2.6-1.4-3.3-.7-.7-1.1-1.7-1.2-2.7-.1-1.3-.1-2.5-.4-3.5C14.5 3 13.5 2 12 2Z" />
                  <path d="M12 6c.5 1 .5 2 .5 2.5" stroke="#F1C40F" strokeWidth="1.5" />
                  <path d="M9 14.5s1 1 3 1 3-1 3-1" stroke="#F1C40F" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight leading-none text-white">
                  City Smile
                </span>
                <span className="text-[8px] text-yellow-300 font-mono tracking-widest uppercase mt-0.5">
                  DENTAL PRACTICE
                </span>
              </div>
            </a>

            {/* Nav Items Desktop */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[11px] font-semibold text-white/90 hover:text-yellow-300 transition-colors uppercase tracking-wider relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA Buttons in exact styling */}
            <div className="hidden md:flex items-center">
              <button
                id="header-booking-btn"
                onClick={onOpenBooking}
                className="text-[10px] font-black uppercase tracking-widest bg-[#F0C808] hover:bg-yellow-405 text-slate-900 px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer transform active:scale-95"
              >
                Contact Us
              </button>
            </div>

            {/* Hamburger Menu Toggle (Mobile) */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-yellow-300 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-[84px] bg-[#5C539D]/95 backdrop-blur-lg z-45 rounded-[32px] border border-white/15 p-6 md:hidden text-white shadow-2xl"
          >
            <nav className="flex flex-col gap-3.5 mb-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-wider text-white/90 hover:text-yellow-300 transition-colors py-1 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <button
                id="header-booking-btn-m"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2.5 bg-[#F0C808] hover:bg-yellow-500 text-slate-900 font-black text-[10px] rounded-full uppercase tracking-widest transition-all text-center"
              >
                Contact Us
              </button>
              <div className="flex items-center justify-center gap-2 text-[9px] text-white/60 mt-1">
                <ShieldCheck size={12} className="text-yellow-300" />
                <span>Certified Dental Care Center</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
