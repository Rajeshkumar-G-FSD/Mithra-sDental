/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Trash2, CheckCircle2, X, Database, ShieldAlert } from "lucide-react";
import { Appointment } from "../types";

interface FooterProps {
  appointments: Appointment[];
  onConfirmAppt: (id: string) => void;
  onCancelAppt: (id: string) => void;
}

export function Footer({ appointments, onConfirmAppt, onCancelAppt }: FooterProps) {
  const [showStaffPortal, setShowStaffPortal] = useState(false);

  return (
    <>
      <footer id="dental-footer" className="relative bg-[#1C1242] text-white pt-36 pb-12 font-sans overflow-hidden">
        
        {/* Layered Wave Design from attached image */}
        <div className="absolute top-0 left-0 right-0 w-full h-[80px] sm:h-[130px] md:h-[180px] overflow-hidden leading-none pointer-events-none z-0">
          <svg
            viewBox="0 0 1440 180"
            className="relative block w-full h-full text-white fill-current translate-y-[-2px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* White backdrop covering the entire SVG to serve as the previous section's white background */}
            <rect width="1440" height="180" fill="#ffffff" />
            
            {/* Wave 1: Soft lavender layer */}
            <path
              d="M0,60 C320,150 640,-10 960,110 C1200,170 1360,95 1440,55 L1440,180 L0,180 Z"
              fill="#5D57A5"
              opacity="0.25"
            />
            
            {/* Wave 2: Mid purple transparent layer */}
            <path
              d="M0,85 C400,180 700,20 1020,140 C1240,200 1360,115 1440,75 L1440,180 L0,180 Z"
              fill="#5D57A5"
              opacity="0.45"
            />
            
            {/* Wave 3: Solid background matching the footer color (#1C1242) */}
            <path
              d="M0,110 C440,210 740,30 1080,165 C1280,210 1380,140 1440,100 L1440,180 L0,180 Z"
              fill="#1C1242"
            />
          </svg>
        </div>

        {/* Content of Footer */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Glassy Panel 1: Services and Quick Links */}
            <div className="lg:col-span-8 bg-[#8C82C4]/20 backdrop-blur-lg rounded-[35px] sm:rounded-[45px] md:rounded-[50px] border border-white/15 p-8 sm:p-10 md:p-14 flex flex-col sm:flex-row justify-around gap-10 shadow-lg">
              
              {/* Column: Our Services */}
              <div className="space-y-6">
                <h4 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-white">
                  OUR SERVICES
                </h4>
                <ul className="space-y-4 text-sm text-[#DFDBF2]/80 font-medium tracking-wide">
                  <li>
                    <a href="#services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Dental Implants
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Teeth Whitening
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Braces & Aligners
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Teeth Cleaning
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column: Quick Links */}
              <div className="space-y-6">
                <h4 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-white">
                  QUICK LINKS
                </h4>
                <ul className="space-y-4 text-sm text-[#DFDBF2]/80 font-medium tracking-wide">
                  <li>
                    <a href="#home" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Home
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Services
                    </a>
                  </li>
                  <li>
                    <a href="#about-us" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> About
                    </a>
                  </li>
                  <li>
                    <a href="#blogs" className="hover:text-yellow-300 transition-colors flex items-center gap-2">
                      <span className="text-white/40">-</span> Blogs
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Glassy Panel 2: Opening Hours */}
            <div className="lg:col-span-4 bg-[#8C82C4]/20 backdrop-blur-lg rounded-[35px] sm:rounded-[45px] md:rounded-[50px] border border-white/15 p-8 sm:p-10 md:p-14 flex flex-col justify-center space-y-6 shadow-lg">
              <h4 className="text-[14px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-white">
                OPENING HOURS
              </h4>
              <ul className="space-y-2.5 text-[12px] sm:text-xs text-[#DFDBF2]/80 font-medium tracking-wide">
                <li className="flex items-start gap-1.5">
                  <span className="text-white/40 shrink-0 mt-0.5">-</span>
                  <span>Mon – Thu: 10am – 2pm, 5pm – 8pm</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-white/40 shrink-0 mt-0.5">-</span>
                  <span>Friday: 9am – 2pm, 5pm – 8pm</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-white/40 shrink-0 mt-0.5">-</span>
                  <span>Saturday: 10am – 2pm, 5pm – 8pm</span>
                </li>
                <li className="flex items-start gap-1.5 text-rose-300">
                  <span className="text-rose-450 shrink-0 mt-0.5">-</span>
                  <span>Sunday: Closed</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Branding Block */}
            <div className="flex items-center gap-3">
              <img
                src="/images/Mithra’s Dental S_round_logo.png"
                alt="Mithra’s Dental Studio"
                className="w-10 h-10 rounded-full object-contain filter drop-shadow border border-white/20"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-bold tracking-wide text-white uppercase leading-none">Mithra's</span>
                <span className="text-[7.5px] text-yellow-300 font-mono tracking-widest uppercase mt-1">DENTAL STUDIO • ERODE</span>
              </div>
            </div>

            {/* Credits with animation & clickable DataZync link */}
            <div className="text-[10px] text-white/50 font-mono flex flex-wrap items-center justify-center gap-1.5 md:justify-end text-center md:text-right">
              <span>© 2026 Mithra’s Dental Studio Erode • Developed by </span>
              <a
                href="https://www.datazync.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-yellow-300 hover:text-white font-bold transition-all duration-300 transform hover:scale-105 relative group tracking-wider"
              >
                DataZync
                <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-yellow-300 group-hover:w-full transition-all duration-300" />
              </a>
            </div>

          </div>

        </div>
      </footer>

      {/* Slide-over interactive Staff Database Portal Drawer */}
      <AnimatePresence>
        {showStaffPortal && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStaffPortal(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white text-slate-800 shadow-2xl flex flex-col justify-between"
              >
                {/* Drawer Header */}
                <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Database className="text-yellow-400" size={18} />
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider">Staff Appointment Back-office</h4>
                      <p className="text-[9px] text-neutral-400 font-mono uppercase mt-0.5">Database Synchronization Portal</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowStaffPortal(false)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Queue list body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div className="flex gap-2.5 p-3.5 bg-yellow-400/10 border border-yellow-400/20 rounded-xl">
                    <ShieldAlert size={15} className="text-yellow-600 mt-0.5 shrink-0" />
                    <span className="text-[10px] text-slate-600 leading-relaxed">
                      <strong>Office Diagnostics Mode:</strong> This panel simulates a secure health database portal. Click the green checkbox to toggle status between <code className="bg-slate-100 p-0.5 rounded text-indigo-700">pending</code> and <code className="bg-slate-100 p-0.5 rounded text-emerald-700">confirmed</code>, or the trash can to cancel/delete appointments.
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-450 font-mono uppercase font-bold border-b border-neutral-100 pb-2">
                    <span>Active Reserves Pool</span>
                    <span>Total Slots: {appointments.length}</span>
                  </div>

                  {appointments.length === 0 ? (
                    <div className="py-12 text-center border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50 p-4">
                      <Calendar size={24} className="mx-auto text-neutral-300 mb-3" />
                      <h5 className="text-xs font-bold text-neutral-700">Queues are Empty</h5>
                      <p className="text-[10px] text-neutral-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                        No patient appointments have been registered. Make one using the booking modal.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {appointments.map((appt) => (
                        <div
                          key={appt.id}
                          id={`staff-appt-row-${appt.id}`}
                          className={`p-4 rounded-xl border transition-all ${
                            appt.status === "confirmed"
                              ? "bg-emerald-50/50 border-emerald-150/40"
                              : "bg-amber-50/50 border-amber-150/40"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                               <div className="text-xs font-bold text-slate-800">{appt.patientName}</div>
                               <div className="text-[10px] text-neutral-400 mt-0.5 font-mono">{appt.email} | {appt.phone}</div>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => onConfirmAppt(appt.id)}
                                className={`p-1 rounded-md border transition-all ${
                                  appt.status === "confirmed"
                                    ? "bg-emerald-100 border-emerald-200 text-emerald-700"
                                    : "bg-white border-neutral-200 text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                                title={appt.status === "confirmed" ? "Mark as pending" : "Confirm appointment"}
                              >
                                <CheckCircle2 size={13} className="stroke-[2.5]" />
                              </button>
                              
                              <button
                                onClick={() => onCancelAppt(appt.id)}
                                className="p-1 rounded-md border border-neutral-200 bg-white text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-all hover:border-rose-100"
                                title="Cancel appointment"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          <div className="mt-3.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-slate-700 bg-neutral-100/80 px-2 py-0.5 rounded-full uppercase tracking-tight text-[9px]">
                              {appt.service}
                            </span>
                            <span className="font-mono text-neutral-400">
                              {appt.date} • {appt.time}
                            </span>
                          </div>
                          
                          {appt.notes && (
                            <div className="mt-2 text-[10px] text-neutral-400 italic bg-white/70 p-1.5 rounded-md border border-neutral-100/50 leading-relaxed font-sans">
                              "{appt.notes}"
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer instructions */}
                <div className="p-6 bg-neutral-50 border-t border-neutral-100 text-center text-[10px] text-neutral-400 italic leading-relaxed">
                  Active in sandbox mode. Changes saved automatically in localStorage database layers.
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
