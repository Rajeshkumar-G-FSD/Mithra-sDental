/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Clock, PhoneCall, HelpCircle } from "lucide-react";

interface VisitUsProps {
  onOpenBooking: () => void;
}

export function VisitUs({ onOpenBooking }: VisitUsProps) {
  const CHAIR_IMAGE_URL = "/src/assets/images/dental_treatment_chair_1781798366891.jpg";

  return (
    <section id="visit-us" className="py-24 bg-white overflow-hidden text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          
          {/* Left Column: Context details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#12805C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full font-sans tracking-wide">
                  4.9 ★ 62 Google Reviews
                </span>
                <span className="text-neutral-400 text-[10px] font-mono">Orthodontist Specialist</span>
              </div>
              <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
                TOP RATED ORTHODONTIST IN TAMIL NADU
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
                Mithra’s Dental Studio Erode
              </h2>
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
              Welcome to <strong>Mithra’s Dental Studio</strong> in Erode. Led by top-tier orthodontic specialists, we deliver elite dental implants, braces, teeth whitening, and complete scan diagnostics with state-of-the-art facilities. 
            </p>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans max-w-xl">
              Conveniently located on EVN Road opposite the Government Hospital near Rohini Medicals in Erode, our clinic is just 5 minutes away from key local transits.
            </p>

            {/* Timings highlights & Phone */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-yellow-100 text-yellow-700 rounded-full shrink-0 mt-0.5">
                  <Clock size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Regular Working Hours</div>
                  <div className="text-[10px] text-neutral-500 leading-relaxed">
                    Mon – Sat: 10:00 AM – 2:00 PM, 5:00 PM – 8:00 PM <br />
                    (Fri opens early at 9:00 AM) <br />
                    Sunday: Closed
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-900 text-white rounded-full shrink-0">
                  <PhoneCall size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Phone Consultation</div>
                  <div className="text-[11px] text-yellow-605 font-bold font-mono">093845 98991</div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                id="visit-appointment-btn"
                onClick={onOpenBooking}
                className="py-3 px-8 bg-yellow-400 hover:bg-yellow-505 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer text-center"
              >
                Contact Us
              </button>
              <a
                id="visit-learn-more-btn"
                href="#contact-us"
                className="py-3 px-8 border border-neutral-300 hover:bg-neutral-50 text-neutral-600 font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center"
              >
                Find Location
              </a>
            </div>
          </div>

          {/* Right Column: Floating Luxury Dental Chair Image */}
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-300/10 rounded-full blur-3xl z-0" />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative z-10 w-full max-w-sm"
            >
              <div className="absolute -inset-2 bg-yellow-400 rounded-3xl transform rotate-3 -scale-100 opacity-20" />
              <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xl overflow-hidden aspect-square">
                <img
                  src={CHAIR_IMAGE_URL}
                  alt="Modern Luxury Dental Chair"
                  className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
