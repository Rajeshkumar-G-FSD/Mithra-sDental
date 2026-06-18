/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Palette, ChevronRight, Activity, Smile, RefreshCw, Scissors, Sparkles, HeartPulse } from "lucide-react";
import { DentalCategory, DentalService } from "../types";
import { DENTAL_SERVICES } from "../services/dentalService";

interface ServicesProps {
  onSelectService: (service: DentalCategory) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  // Map our categories to specific graphical themes as shown in the reference image
  const getCategoryTheme = (cat: DentalCategory) => {
    switch (cat) {
      case DentalCategory.ORTHODONTICS:
        return {
          icon: Smile,
          colorClass: "bg-indigo-900/10 text-indigo-700 hover:bg-indigo-900 hover:text-white",
          accentColor: "border-indigo-200/50",
          desc: "Align dental spacing using Invisalign",
        };
      case DentalCategory.SENSITIVE_TEETH:
        return {
          icon: HeartPulse,
          colorClass: "bg-yellow-400 text-slate-900 hover:bg-yellow-500",
          accentColor: "border-yellow-300",
          desc: "Treat exposed nerves and hypersensitivity",
        };
      case DentalCategory.TEETH_CLEANING:
        return {
          icon: Activity,
          colorClass: "bg-teal-900/10 text-teal-700 hover:bg-teal-900 hover:text-white",
          accentColor: "border-teal-200/50",
          desc: "Full hygienic cleaning & tartar descaling",
        };
      case DentalCategory.TEETH_WHITENING:
        return {
          icon: Sparkles,
          colorClass: "bg-fuchsia-900/10 text-fuchsia-700 hover:bg-fuchsia-900 hover:text-white",
          accentColor: "border-fuchsia-200/50",
          desc: "Intense enamel whitening treatments",
        };
      case DentalCategory.DENTAL_IMPLANTS:
        return {
          icon: RefreshCw,
          colorClass: "bg-cyan-900/10 text-cyan-700 hover:bg-cyan-900 hover:text-white",
          accentColor: "border-cyan-200/50",
          desc: "Titanium implants & root replacements",
        };
      case DentalCategory.CHILDREN_CLEANING:
        return {
          icon: Scissors,
          colorClass: "bg-rose-900/10 text-rose-700 hover:bg-rose-900 hover:text-white",
          accentColor: "border-rose-200/50",
          desc: "Kid-friendly checkups & fun cleanings",
        };
      default:
        return {
          icon: Smile,
          colorClass: "bg-neutral-100 text-neutral-800",
          accentColor: "border-neutral-200",
          desc: "Default clinical consult",
        };
    }
  };

  return (
    <section id="services" className="py-24 bg-neutral-100/50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Side descriptor with minimalist tooth illustration */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
                WHAT WE DO
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
                Our Services
              </h2>
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-sm font-sans">
              We offer comprehensive specialist dental procedures to safeguard oral hygienes. Explore our service nodes, or select a deliverable treatment below to secure your clinical appointment instantly.
            </p>

            {/* Aesthetic Dental Graphic mimicking the tooth & mirror drawing */}
            <div className="hidden lg:flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-200/60 shadow-2xs max-w-xs">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
                <Smile className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Premium Operations</div>
                <div className="text-xs font-semibold text-slate-800">Advanced Laser Hygiene</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Grid representation of core services */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DENTAL_SERVICES.map((serv, index) => {
                const { icon: Icon, colorClass, desc } = getCategoryTheme(serv.category);
                
                return (
                  <motion.div
                    key={serv.id}
                    id={`service-card-${serv.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => onSelectService(serv.category)}
                    className="group bg-white p-6 rounded-2xl border border-neutral-200/80 shadow-2xs hover:shadow-md hover:border-yellow-400 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Top icon indicator layout conforming to the rounded photo grids */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${colorClass}`}>
                          <Icon size={20} className="stroke-[2px]" />
                        </div>
                        <ChevronRight size={16} className="text-neutral-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                      </div>

                      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight group-hover:text-yellow-600 transition-colors">
                        {serv.title}
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-1 italic font-mono uppercase tracking-wider">
                        {serv.tagline}
                      </p>
                      
                      <p className="text-xs text-neutral-500 mt-3.5 leading-relaxed font-sans">
                        {serv.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-yellow-600 transition-colors">
                      <span>Schedule Now</span>
                      <span className="text-[9px] font-mono bg-neutral-100 px-2 py-0.5 rounded-full">Book In 1m</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
