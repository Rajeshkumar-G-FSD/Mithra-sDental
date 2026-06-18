/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Check, AlertCircle, FileText, Smile } from "lucide-react";
import { DentalCategory } from "../types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: DentalCategory;
  onBook: (patientName: string, email: string, phone: string, date: string, time: string, service: DentalCategory, notes?: string) => void;
}

export function AppointmentModal({ isOpen, onClose, selectedCategory, onBook }: AppointmentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<DentalCategory>(selectedCategory);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  // Sync category on open selection change
  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !date) return;

    onBook(name, email, phone, date, time, category, notes);
    setSuccess(true);
  };

  const handleResetAndClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("09:00 AM");
    setNotes("");
    setSuccess(false);
    onClose();
  };

  const timeslots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM",
    "06:00 PM",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
          
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-yellow-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider font-display">
                  Secure Dental Booking Form
                </h3>
              </div>
              <button
                id="modal-close-btn"
                onClick={handleResetAndClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {success ? (
              /* Booking Success view */
              <div id="booking-success-container" className="p-8 text-center flex flex-col items-center">
                <span className="p-4 bg-emerald-100 text-emerald-800 rounded-full mb-4 shadow-sm">
                  <Check size={26} className="stroke-[3px]" />
                </span>
                <h4 className="text-md font-serif font-bold text-slate-900">
                  Appointment Requested!
                </h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed max-w-sm">
                  Your clinical slot for <strong className="text-slate-800">{category}</strong> on <strong className="text-slate-800">{date}</strong> at <strong className="text-slate-800">{time}</strong> has been logged to the coordinator panel.
                </p>

                <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 w-full text-left space-y-2">
                  <div className="flex items-center justify-between text-[11px] border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-400 font-semibold">PATIENT</span>
                    <span className="font-bold text-slate-800">{name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-400 font-semibold">PROCEDURE</span>
                    <span className="font-bold text-indigo-600">{category}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-b border-neutral-100 pb-1.5">
                    <span className="text-neutral-400 font-semibold">CONTACT</span>
                    <span className="font-bold text-slate-800">{phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 font-semibold">STATUS</span>
                    <span className="font-bold text-amber-600 uppercase flex items-center gap-1">
                      <AlertCircle size={10} /> Pending Confirmation
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col w-full gap-2 text-xs">
                  <button
                    id="success-portal-close-btn"
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold uppercase tracking-widest rounded-full shadow-md cursor-pointer transition-all"
                  >
                    Done & Return
                  </button>
                  <p className="text-[10px] text-neutral-400 italic">
                    Use the staff database drawer in the footer to review confirmation queues.
                  </p>
                </div>
              </div>
            ) : (
              /* Booking Input fields view */
              <form id="appointment-booking-form" onSubmit={handleSubmit} className="p-6 space-y-4">
                
                {/* Notice banner */}
                <div className="flex gap-2.5 p-3.5 bg-indigo-50 border border-indigo-100/40 rounded-xl">
                  <FileText size={15} className="text-indigo-600 mt-0.5 shrink-0" />
                  <span className="text-[10px] text-indigo-700/90 leading-relaxed">
                    <strong>Notice:</strong> Please double-check your email and mobile parameters. Staff will dial or email you to synchronize timing if adjustments are necessary.
                  </span>
                </div>

                {/* Patient Name */}
                <div>
                  <label htmlFor="appt-patient-name" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Patient Full Name
                  </label>
                  <input
                    id="appt-patient-name"
                    type="text"
                    required
                    placeholder="e.g. Thomas Wayne"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs text-slate-800 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <div>
                    <label htmlFor="appt-email" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="appt-email"
                      type="email"
                      required
                      placeholder="e.g. thomas@corporate.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs text-slate-800 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="appt-phone" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Mobile Number
                    </label>
                    <input
                      id="appt-phone"
                      type="tel"
                      required
                      placeholder="e.g. (555) 012-3499"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs text-slate-800 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Service Category */}
                <div>
                  <label htmlFor="appt-category-sel" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Specialist Treatment Area
                  </label>
                  <select
                    id="appt-category-sel"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as DentalCategory)}
                    className="w-full px-3 py-2.5 text-xs text-slate-700 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all"
                  >
                    {Object.values(DentalCategory).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat} Care Node
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Appointment Date */}
                  <div>
                    <label htmlFor="appt-date" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      id="appt-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs text-slate-800 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all font-sans cursor-pointer"
                    />
                  </div>

                  {/* Preferred Time Slot */}
                  <div>
                    <label htmlFor="appt-time" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      id="appt-time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs text-slate-700 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all cursor-pointer"
                    >
                      {timeslots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Diagnostic Notes */}
                <div>
                  <label htmlFor="appt-notes" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Pre-Diagnosis Context / Notes
                  </label>
                  <textarea
                    id="appt-notes"
                    placeholder="e.g., Severe tooth flareup on left molar, request nitrous oxide if possible..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 text-xs text-slate-800 bg-neutral-50/50 border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 focus:bg-white transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    id="btn-appt-submit"
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Confirm & Queue Request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
