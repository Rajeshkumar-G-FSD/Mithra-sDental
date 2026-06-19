/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, Mail, MapPin, Phone, RefreshCw, Send, Sparkles } from "lucide-react";

interface ContactFormProps {
  onSubmitContact: (name: string, email: string, subject: string, message: string) => void;
}

export function ContactForm({ onSubmitContact }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setLoading(true);
    // Simulate slight loading latency
    setTimeout(() => {
      onSubmitContact(name, email, subject || "General Inquiry", message);
      setLoading(false);
      setSubmitted(true);
      // Reset after success
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 600);
  };

  return (
    <section id="contact-us" className="py-24 bg-white text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header styling */}
        <div className="text-center space-y-2 mb-16">
          <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
            CONTACT US
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
            Contact Form
          </h2>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Clinic details & Custom Interactive Vector Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-serif font-semibold text-slate-900">
                Mithra's Dental Studio Clinic
              </h3>
              <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans">
                Our premium dental studio is beautifully designed and conveniently situated on EVN Road in Erode, opposite the Government Hospital, with easy access and dedicated patient vehicle assistance.
              </p>

              {/* Direct Address nodes */}
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Main Studio Address</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">220/1, EVN Rd, opp. Govt Hospital, near rohini medicals, Erode, Tamil Nadu 638009</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-yellow-105 text-yellow-700 rounded-lg shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Phone & SMS Support</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Primary: 093845 98991</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-yellow-105 text-yellow-700 rounded-lg shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Digital Support</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">contact@mithrasdentalstudio.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized high fidelity simulated medical vector map from image reference */}
            <div className="relative border border-neutral-200 bg-neutral-50 rounded-2xl p-4 overflow-hidden h-64 shadow-2xs flex flex-col justify-between">
              {/* Absolutes and SVGs for Grid Lines representing Map grids */}
              <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" />
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Decorative map layout blocks */}
              <div className="absolute top-8 left-12 w-28 h-10 bg-neutral-200/60 rounded-lg transform -rotate-6" />
              <div className="absolute top-24 right-10 w-24 h-16 bg-neutral-200/60 rounded-xl transform rotate-12" />
              <div className="absolute bottom-8 left-16 w-32 h-12 bg-neutral-200/60 rounded-lg transform rotate-20" />
              <div className="absolute inset-x-0 top-1/2 h-4 bg-emerald-500/20 w-full transform -rotate-12" /> {/* River */}
              <div className="absolute inset-y-0 left-1/3 w-4 bg-amber-500/10 h-full transform rotate-45" /> {/* Blvd */}

              {/* Real Pin Indicator */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="p-2.5 bg-yellow-400 text-slate-900 rounded-full shadow-lg border border-yellow-300 pointer-events-none"
                >
                  <MapPin size={22} className="fill-current text-slate-900" />
                </motion.div>
                <div className="mt-2.5 px-3 py-1 bg-slate-900 text-white rounded-lg shadow-sm border border-slate-800 text-[10px] font-bold uppercase tracking-wider">
                  Mithra’s Dental Studio Erode
                </div>
              </div>

              {/* Bottom tag */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span>COORD // 11.3410 N, 77.7172 E</span>
                <span className="text-emerald-600 font-bold">● LIVE GPX PATH ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction contact form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl shadow-xs text-center flex flex-col justify-center items-center h-full min-h-[400px]"
              >
                <span className="p-4 bg-yellow-400 text-slate-900 rounded-full shadow-md animate-bounce mb-6">
                  <Check size={28} className="stroke-[3.5px]" />
                </span>
                <h3 className="text-lg font-serif font-semibold text-slate-900">
                  Message Transmitted Successfully!
                </h3>
                <p className="text-xs text-neutral-500 mt-2 max-w-sm leading-relaxed">
                  Thank you for writing to Mithra’s Dental Studio. Our clinical coordinator will review your inquiry and reply via email within twenty-four business hours.
                </p>
                <button
                  id="reset-contact-form-btn"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all"
                >
                  Submit Another Question
                </button>
              </motion.div>
            ) : (
              <form
                id="clinical-contact-form"
                onSubmit={handleSubmit}
                className="p-8 bg-neutral-50/50 border border-neutral-200 rounded-2xl shadow-xs flex flex-col gap-5"
              >
                <div className="text-neutral-400 text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-neutral-200/50">
                  <Sparkles size={12} className="text-yellow-600" />
                  <span>Interactive Delivery Pipeline</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Amanda Cole"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs text-slate-800 bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 transition-all font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="amanda@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs text-slate-800 bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Subject / Topic
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="e.g. Invisalign Payment Structure Queries"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-3 text-xs text-slate-800 bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 transition-all font-sans"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="contact-desc" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Message / Question <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-desc"
                    required
                    placeholder="Write your clinical questions or schedule constraints here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full px-3.5 py-3 text-xs text-slate-800 bg-white border border-neutral-200 rounded-lg focus:outline-hidden focus:border-yellow-400 transition-all resize-none font-sans"
                  />
                </div>

                {/* Action button */}
                <div className="pt-2">
                  <button
                    id="btn-contact-submit"
                    type="submit"
                    disabled={loading || !name.trim() || !email.trim() || !message.trim()}
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed justify-center items-center flex gap-2 transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={13} className="animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
