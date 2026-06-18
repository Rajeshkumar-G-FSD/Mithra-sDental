/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Award, ShieldCheck, Heart } from "lucide-react";

export function AboutUs() {
  const ABOUT_IMAGE_URL = "/src/assets/images/dental_about_dentist_1781798344444.jpg";

  return (
    <section id="about-us" className="py-24 bg-white overflow-hidden text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          
          {/* Left Column: Stylized Image Frame with underlying custom back outline shape */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Outline tooth shape background watermark representing the background icon in the original */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-slate-50 rounded-full blur-2xl z-0" />
            
            <div className="relative z-10 w-full max-w-sm sm:max-w-md">
              {/* Decorative back outline frame from original design */}
              <div className="absolute -inset-4 bg-slate-100 rounded-3xl transform -rotate-2 -scale-95 z-0 border border-slate-200/50" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl shadow-xl border-4 border-white bg-slate-200 aspect-4/3"
              >
                <img
                  src={ABOUT_IMAGE_URL}
                  alt="City Smile Consultation Room"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Float floating success badge */}
              <div className="absolute -bottom-4 -right-4 p-4 bg-yellow-400 text-slate-900 rounded-2xl shadow-lg flex items-center gap-3 border border-yellow-300 z-20">
                <div className="p-2 bg-slate-900 text-white rounded-xl">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider">Top Rated</div>
                  <div className="text-[10px] font-mono">Clinic of Nappa 2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
                WELCOME TO CITY SMILE
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
                About Us
              </h2>
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a gallery of type and scramble it to make.
            </p>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              We focus on delivering high-fidelity clinical healthcare operations. All our procedures utilize medical-grade sterilities and advanced digital x-ray diagnostics to guarantee pain-free alignments and treatments.
            </p>

            {/* List highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 max-w-lg">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-slate-100 text-slate-800 rounded-lg shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Certified Dentists</h4>
                  <p className="text-[10px] text-neutral-400">Board certified medical dental experts</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 bg-slate-100 text-slate-800 rounded-lg shrink-0">
                  <Heart size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Comfortable Environment</h4>
                  <p className="text-[10px] text-neutral-400">Symptom relief and anti-anxiety care</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <a
                id="about-readmore-btn"
                href="#services"
                className="inline-block py-2.5 px-8 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer"
              >
                Read More
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
