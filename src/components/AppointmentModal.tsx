/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Check, AlertCircle, FileText, ChevronDown, MapPin } from "lucide-react";
import { DentalCategory } from "../types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: DentalCategory;
  onBook: (
    patientName: string,
    email: string,
    phone: string,
    date: string,
    time: string,
    service: DentalCategory,
    notes?: string,
    address?: string,
    appointmentType?: string
  ) => void;
}

const APPOINTMENT_TYPES = [
  "Exam & Cleaning",
  "Consultation",
  "Checkup",
  "Treatment",
  "Urgent Dental Care",
  "Other"
];

const DENTAL_SERVICES = [
  "Dental Implants",
  "Whitening / Bleaching",
  "Root Canal Treatment",
  "Orthodontics / Braces",
  "Periodontitis / Gum Treatment",
  "Lasers In Dentistry",
  "Preventive-Dentistry",
  "Fillings",
  "Inlays / Onlays",
  "Veneers",
  "Oral / Maxillo Facial Surgery",
  "Dentures",
  "Ceramic Crown / Bridges",
  "Pediatric",
  "Cosmetic / Esthetic",
  "Crown And Bridge",
  "Tooth Removal",
  "Smile Design",
  "Guided Surgery",
  "Full Mouth Rehabilitation"
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "01:30 PM",
  "03:00 PM",
  "04:30 PM",
  "06:00 PM"
];

export function AppointmentModal({ isOpen, onClose, selectedCategory, onBook }: AppointmentModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [apptType, setApptType] = useState("Exam & Cleaning");
  const [serviceSelect, setServiceSelect] = useState("Preventive-Dentistry");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);

  // Custom dropdown states
  const [apptTypeDropdownOpen, setApptTypeDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);

  // Refs for closing on outside click
  const apptTypeRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);

  // Map incoming categories cleanly
  const mapCategoryToService = (cat: DentalCategory): string => {
    switch (cat) {
      case DentalCategory.ORTHODONTICS:
        return "Orthodontics / Braces";
      case DentalCategory.SENSITIVE_TEETH:
        return "Periodontitis / Gum Treatment";
      case DentalCategory.TEETH_CLEANING:
        return "Preventive-Dentistry";
      case DentalCategory.TEETH_WHITENING:
        return "Whitening / Bleaching";
      case DentalCategory.DENTAL_IMPLANTS:
        return "Dental Implants";
      case DentalCategory.CHILDREN_CLEANING:
        return "Pediatric";
      default:
        return "Preventive-Dentistry";
    }
  };

  // Sync selection when opened with predefined category
  useEffect(() => {
    if (selectedCategory) {
      setServiceSelect(mapCategoryToService(selectedCategory));
    }
  }, [selectedCategory, isOpen]);

  // Handle outside dropdown clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (apptTypeRef.current && !apptTypeRef.current.contains(event.target as Node)) {
        setApptTypeDropdownOpen(false);
      }
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setServiceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !address.trim()) {
      return;
    }

    // Call dynamic database hooks to save record locally & Firestore sync
    onBook(
      name,
      "", // No Email requested in the new high-fidelity screenshot
      phone,
      date,
      time,
      serviceSelect as DentalCategory, // Safe type Assertion
      notes,
      address,
      apptType
    );

    // Format details for WhatsApp redirect
    const formattedDate = date.split("-").reverse().join("/"); // YYYY-MM-DD -> DD/MM/YYYY
    const message = 
      `*New Appointment Booking*\n` +
      `------------------------------------\n` +
      `👤 *Full Name:* ${name.trim()}\n` +
      `📞 *Phone/WhatsApp:* ${phone.trim()}\n` +
      `📋 *Appointment Type:* ${apptType}\n` +
      `🦷 *Dental Service:* ${serviceSelect}\n` +
      `📅 *Preferred Date:* ${formattedDate}\n` +
      `⏰ *Time Slot:* ${time}\n` +
      `📍 *Address:* ${address.trim()}\n` +
      (notes.trim() ? `💬 *Comments/Issue:* ${notes.trim()}\n` : "") +
      `------------------------------------\n` +
      `_Submitted via Mithra's Dental Studio Portal_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919384598991?text=${encodedMessage}`;

    // Open WhatsApp link
    window.open(whatsappUrl, "_blank");

    setSuccess(true);
  };

  const handleResetAndClose = () => {
    setName("");
    setPhone("");
    setApptType("Exam & Cleaning");
    setServiceSelect("Preventive-Dentistry");
    setDate("");
    setTime("09:00 AM");
    setAddress("");
    setNotes("");
    setSuccess(false);
    onClose();
  };

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
            className="fixed inset-0 bg-[#00142A]/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Header: Dark Deep Navy matching the screenshot */}
            <div className="bg-[#002147] px-8 py-6 text-white relative border-b border-[#003366]">
              <span className="text-[10px] font-mono font-bold tracking-widest text-blue-300 block mb-1.5 uppercase">
                MITHRA'S DENTAL STUDIO & EXPANDED HOSPITAL
              </span>
              <h3 className="text-2xl font-serif font-black tracking-tight text-white leading-tight">
                Book an Appointment
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                All fields marked <span className="text-rose-400 font-bold">*</span> are required
              </p>

              <button
                id="modal-close-btn"
                onClick={handleResetAndClose}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close appointment modal"
              >
                <X size={20} />
              </button>
            </div>

            {success ? (
              /* Success View */
              <div id="booking-success-container" className="p-8 text-center flex flex-col items-center">
                <span className="p-4 bg-emerald-100 text-emerald-800 rounded-full mb-4 shadow-sm animate-bounce">
                  <Check size={32} className="stroke-[3.5px]" />
                </span>
                <h4 className="text-xl font-serif font-black text-slate-900">
                  Appointment Sent!
                </h4>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed max-w-sm">
                  We have forwarded your booking details to WhatsApp and stored it in the systems panel.
                </p>

                <div className="mt-5 p-5 rounded-2xl bg-[#F4F6FA] border border-neutral-100 w-full text-left space-y-2.5 max-w-md">
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-205/60 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">PATIENT</span>
                    <span className="font-extrabold text-slate-800">{name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-205/60 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">PHONE</span>
                    <span className="font-extrabold text-slate-800">{phone}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-205/60 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">TREATMENT</span>
                    <span className="font-extrabold text-[#5D57A5]">{serviceSelect}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-205/60 pb-2">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">DATE & TIME</span>
                    <span className="font-extrabold text-slate-800">{date.split("-").reverse().join("/")} at {time}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400 font-bold uppercase tracking-wider">STATUS</span>
                    <span className="font-extrabold text-amber-600 uppercase flex items-center gap-1.5">
                      <AlertCircle size={11} className="stroke-[2.5]" /> Pending Confirmation
                    </span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col w-full max-w-md gap-3">
                  <button
                    id="success-portal-close-btn"
                    onClick={handleResetAndClose}
                    className="w-full py-3 bg-[#002147] hover:bg-[#003166] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md cursor-pointer transition-all active:scale-[0.98]"
                  >
                    Done & Return
                  </button>
                  <p className="text-[10px] text-neutral-400 italic">
                    The office will reach out directly. You can track status inside the Patient Ledger menu.
                  </p>
                </div>
              </div>
            ) : (
              /* Input Form View */
              <form id="appointment-booking-form" onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Full Name <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D57A5] focus:border-[#5D57A5] focus:bg-white transition-all font-sans"
                    />
                  </div>

                  {/* Phone / Whatsapp */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Phone / Whatsapp <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D57A5] focus:border-[#5D57A5] focus:bg-white transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Appointment Type */}
                  <div className="relative" ref={apptTypeRef}>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Appointment Type <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setApptTypeDropdownOpen(!apptTypeDropdownOpen)}
                      className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#5D57A5] transition-all"
                    >
                      <span>{apptType || "Select type"}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${apptTypeDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {apptTypeDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-100 shadow-xl overflow-hidden z-20 max-h-56 overflow-y-auto"
                        >
                          {APPOINTMENT_TYPES.map((type, idx) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => {
                                setApptType(type);
                                setApptTypeDropdownOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-xs font-semibold tracking-wide hover:bg-[#F4F6FB] transition-colors border-b border-slate-50 last:border-0 ${
                                apptType === type ? "bg-[#5D57A5]/10 text-[#5D57A5] font-bold" : "text-slate-700"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Dental Service */}
                  <div className="relative" ref={serviceRef}>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Dental Service <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                      className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#5D57A5] transition-all"
                    >
                      <span className="truncate pr-2">{serviceSelect || "Select treatment"}</span>
                      <ChevronDown size={14} className={`text-slate-400 transition-transform ${serviceDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {serviceDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-neutral-100 shadow-xl overflow-hidden z-20 max-h-56 overflow-y-auto"
                        >
                          {DENTAL_SERVICES.map((serv) => (
                            <button
                              key={serv}
                              type="button"
                              onClick={() => {
                                setServiceSelect(serv);
                                setServiceDropdownOpen(false);
                              }}
                              className={`w-full text-left px-5 py-3 text-xs font-semibold tracking-wide hover:bg-[#F4F6FB] transition-colors border-b border-slate-50 last:border-0 ${
                                serviceSelect === serv ? "bg-[#5D57A5]/10 text-[#5D57A5] font-bold" : "text-slate-700"
                              }`}
                            >
                              {serv}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Preferred Date <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#5D57A5] focus:border-[#5D57A5] focus:bg-white transition-all font-sans cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                      Time Slot <span className="text-rose-500 font-bold">*</span>
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 focus:outline-[#5D57A5] focus:bg-white transition-all cursor-pointer appearance-none bg-no-repeat"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundPosition: "right 1.25rem center",
                        backgroundSize: "0.85em"
                      }}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                    Address <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your complete address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D57A5] focus:border-[#5D57A5] focus:bg-white transition-all font-sans"
                  />
                </div>

                {/* Comments / Issue */}
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#4A5D6E] uppercase mb-2">
                    Comments / Issue <span className="text-slate-400 normal-case font-medium">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Briefly describe your concern..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full bg-[#F4F6FB] border border-[#D5DFEA] rounded-2xl px-4 py-3.5 text-xs text-slate-800 placeholder-[#94A3B8] focus:outline-none focus:ring-1 focus:ring-[#5D57A5] focus:border-[#5D57A5] focus:bg-white transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit button: Matching screenshot visual layout perfectly */}
                <div className="pt-4">
                  <button
                    id="btn-appt-submit"
                    type="submit"
                    className="w-full py-4 bg-[#001D3D] hover:bg-[#002B54] text-white font-extrabold text-xs uppercase tracking-widest rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <Calendar size={15} className="stroke-[2.5px]" />
                    <span>Confirm Booking</span>
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
