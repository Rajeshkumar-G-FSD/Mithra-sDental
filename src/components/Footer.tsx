/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Smile, Calendar, Trash2, CheckCircle2, X, Database, ShieldAlert, ArrowDown } from "lucide-react";
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
      <footer id="dental-footer" className="relative bg-slate-950 text-white overflow-hidden pt-24 pb-12 font-sans">
        
        {/* Decorative Wave Overlay Separator */}
        <div className="absolute top-0 left-0 right-0 z-0 select-none pointer-events-none transform rotate-180">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto text-white fill-current opacity-100"
            xmlns="http://www.w3.org/2500/svg"
          >
            <path d="M0,64L120,53.3C240,43,480,21,720,21C960,21,1200,43,1320,53.3L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
            
            {/* Column 1: Brand details */}
            <div className="md:col-span-5 space-y-4">
              <a href="#home" className="flex items-center gap-2 group w-max">
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
              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
                State-of-the-art restorative dental hygiene, laser alignments, and gentle family care diagnostics located in the center of Nappa, CA.
              </p>
              
              {/* Database Indicator representing backend pipeline */}
              <div className="pt-2">
                <button
                  id="toggle-staff-database-btn"
                  onClick={() => setShowStaffPortal(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-800 text-yellow-300 hover:bg-neutral-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs border border-neutral-700/50"
                >
                  <Database size={11} className="animate-pulse" />
                  <span>Interactive Staff Database Portal</span>
                </button>
              </div>
            </div>

            {/* Column 2: Specialties */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400">
                Our Specialties
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li><a href="#services" className="hover:text-yellow-400 transition-colors">Orthodontic Braces</a></li>
                <li><a href="#services" className="hover:text-yellow-400 transition-colors">Enamel Whitening</a></li>
                <li><a href="#services" className="hover:text-yellow-400 transition-colors">Prophylactic Cleaning</a></li>
                <li><a href="#services" className="hover:text-yellow-400 transition-colors">Children Checkups</a></li>
              </ul>
            </div>

            {/* Column 3: Timings */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-yellow-400">
                Opening Hours
              </h4>
              <div className="space-y-2 text-xs text-neutral-400">
                <div className="flex justify-between items-center">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold text-white font-mono">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Saturday:</span>
                  <span className="font-semibold text-white font-mono">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sunday:</span>
                  <span className="font-semibold text-rose-400 uppercase font-mono">Closed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Deep footer credits */}
          <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-neutral-500 font-mono">
            <span>© 2026 CITY SMILE PRACTICE INC. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-4">
              <a href="#home" className="hover:text-yellow-400 transition-colors">PRIVACY CODE</a>
              <span>•</span>
              <a href="#home" className="hover:text-yellow-400 transition-colors">OPERATIONAL CONSENTS</a>
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
