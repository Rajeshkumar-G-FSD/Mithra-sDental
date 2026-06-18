/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smile, Menu, X, Phone, ShieldCheck } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
}

export function Header({ onOpenBooking }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About us", href: "#about-us" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact us", href: "#contact-us" },
  ];

  return (
    <>
      <header
        id="dental-navigation"
        className="w-full absolute top-0 left-0 bg-transparent py-4 text-white z-50 transition-all font-sans"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="p-2 bg-yellow-400 text-slate-900 rounded-full group-hover:scale-105 transition-all">
              <Smile className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight leading-none text-white">
                City Smile
              </span>
              <span className="text-[9px] text-yellow-300 font-mono tracking-widest uppercase mt-0.5">
                Dental Clinic
              </span>
            </div>
          </a>

          {/* Nav Items Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider relative group"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-yellow-400 hover:w-full transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-booking-btn"
              onClick={onOpenBooking}
              className="text-xs font-bold bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-2.5 rounded-full uppercase tracking-wider transition-all hover:shadow-lg cursor-pointer transform active:scale-95"
            >
              Contact Us
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
            className="fixed inset-x-0 top-[72px] bg-slate-900/95 backdrop-blur-md z-40 border-b border-slate-800 p-6 md:hidden text-white"
          >
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold tracking-wide hover:text-yellow-400 transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <button
                id="header-booking-btn-m"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs rounded-full uppercase tracking-widest transition-all text-center"
              >
                Contact Us
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 mt-2">
                <ShieldCheck size={14} className="text-yellow-400" />
                <span>Certified Dental Care Center</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
