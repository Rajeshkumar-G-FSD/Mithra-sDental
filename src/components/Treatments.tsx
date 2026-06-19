/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkle, Check, PhoneCall, HelpCircle, HeartPulse, ShieldAlert, Award } from "lucide-react";

export function Treatments() {
  const leftColumnTreatments = [
    { title: "Teeth Cleaning", desc: "Professional tartar descaling & plaque removals for superb oral hygiene." },
    { title: "Teeth Whitening", desc: "Advanced enamel-safe cosmetic whitening to instantly brighten your smile." },
    { title: "Dental Fillings", desc: "Composite, metal-free durable restoration matching your natural teeth shade." },
    { title: "Tooth Extractions", desc: "Safe, pain-free extraction of damaged or severely decayed clinical teeth." },
    { title: "Wisdom Tooth Extractions", desc: "Expert surgical removal to prevent spacing alignment problems and pain." },
    { title: "Dental Crowns & Bridges", desc: "High-grade porcelain restoratives to restore form, function, and aesthetics." },
    { title: "Removable / Fixed Dentures", desc: "Comfortable, premium prosthetic layouts carefully mapped to your mouth shape." },
    { title: "Implant Supported Dentures", desc: "Rock-solid stabilization blending traditional dentures with dental implants." },
    { title: "Complete Dentures", desc: "Full arched natural-looking solutions to bring complete confidence back." },
    { title: "Esthetic Smile Designing", desc: "Bespoke smile makeovers leveraging veneers, bonding, and facial symmetry." },
  ];

  const rightColumnTreatments = [
    { title: "Dental Implants", desc: "Premium biocompatible titanium root placements with custom-engineered crowns." },
    { title: "Orthognathic Surgery", desc: "Specialist jaw alignment restructuring for severe malocclusions & visual balance." },
    { title: "Root Canal Treatments", desc: "Precision endodontic therapies to heal infected nerves and salvage original teeth." },
    { title: "Post & Core Placement", desc: "Deep structural foundations to anchor crowns on severely weakened teeth." },
    { title: "Orthodontic Treatment", desc: "Traditional metal & ceramic bracing systems with customized force calibration." },
    { title: "Aligner Orthodontic Treatment (Invisalign)", desc: "Virtually invisible, removable clear alignment trays for elegant comfort." },
    { title: "Orthodontic Disimpactions", desc: "Surgical-orthodontic micro-procedures to gently guide impacted teeth into place." },
  ];

  return (
    <section id="treatments" className="py-24 bg-white text-slate-800 border-t border-neutral-105 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5D57A5]/10 text-[#5D57A5] rounded-full border border-[#5D57A5]/10 text-[9px] font-bold uppercase tracking-widest"
          >
            <Sparkle size={10} className="fill-current text-[#5D57A5]" />
            <span>Comprehensive Care</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight"
          >
            Our Dental Treatments
          </motion.h2>
          
          <div className="w-12 h-1 bg-yellow-400 rounded-full mx-auto" />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-500 text-xs sm:text-sm leading-relaxed font-sans"
          >
            We offer comprehensive dental care services to help you achieve and maintain a healthy, beautiful smile. From routine cleaning to elite alignment and specialized reconstructive surgeries, our expert clinical procedures are tailored to your needs.
          </motion.p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Card left column: General & Esthetic Care */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-50/75 rounded-3xl p-6 sm:p-8 border border-neutral-200/50 shadow-2xs space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/60">
              <div className="w-10 h-10 rounded-xl bg-[#5D57A5]/10 text-[#5D57A5] flex items-center justify-center shrink-0">
                <HeartPulse size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-tight">General & Esthetic Care</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Procedural Treatments</span>
              </div>
            </div>

            <div className="space-y-4">
              {leftColumnTreatments.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                  <div className="mt-0.5 p-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Check size={12} className="stroke-[3px]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-[#5D57A5] transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-sans mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card right column: Advanced Specialists */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-neutral-50/75 rounded-3xl p-6 sm:p-8 border border-neutral-200/50 shadow-2xs space-y-6"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-200/60">
              <div className="w-10 h-10 rounded-xl bg-yellow-400/10 text-yellow-650 flex items-center justify-center shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 leading-tight">Specialist & Orthodontics</h3>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Advanced Dental Therapies</span>
              </div>
            </div>

            <div className="space-y-4.5">
              {rightColumnTreatments.map((item, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                  <div className="mt-0.5 p-0.5 rounded-full bg-[#5D57A5]/10 text-[#5D57A5] shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Check size={12} className="stroke-[3px]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 group-hover:text-yellow-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-sans mt-0.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Dynamic Marketing Footer Call-out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 p-6 sm:p-8 bg-[#1C1242] text-white rounded-3xl relative overflow-hidden shadow-md"
        >
          {/* Subtle wave backgrounds to tie into overall brand */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none w-52 h-full">
            <svg opacity="0.3" viewBox="0 0 100 100" className="w-full h-full fill-current text-[#5D57A5]">
              <path d="M0,50 C30,80 70,20 100,50 L100,100 L0,100 Z" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold tracking-widest text-yellow-300 uppercase block">Expert-Led Dentistry</span>
              <p className="text-xs sm:text-sm text-[#DFDBF2] font-medium leading-relaxed max-w-2xl italic font-sans">
                "Healthy smiles begin with expert care. Contact us today to learn more about our treatments and personalized dental solutions."
              </p>
            </div>
            
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <PhoneCall size={14} />
              <span>Contact Experts</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
