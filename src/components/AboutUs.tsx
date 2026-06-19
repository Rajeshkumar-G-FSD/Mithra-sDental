/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  ShieldCheck, 
  Heart, 
  Stethoscope, 
  Sparkle, 
  Check, 
  GraduationCap, 
  Scissors, 
  Sparkles, 
  Activity, 
  ShieldAlert 
} from "lucide-react";

export function AboutUs() {
  const ABOUT_IMAGE_URL = "/src/assets/images/dental_about_dentist_1781798344444.jpg";

  // State to filter Dr. Mithra's Areas of Expertise
  const [activeTab, setActiveTab] = useState<string>("ortho");

  const doctorExpertise = [
    {
      id: "ortho",
      title: "Orthodontics & Aligner Therapy",
      icon: <Sparkles className="w-4 h-4" />,
      skills: [
        "Invisalign® and Clear Aligner Orthodontics",
        "Braces Treatment",
        "Adult Orthodontics",
        "Pediatric Orthodontics",
        "Interdisciplinary Orthodontics",
        "Accelerated Orthodontics",
        "Functional Jaw Orthopedics",
        "Fixed Functional Orthodontics",
        "3D Aligner Planning",
        "Lingual Orthodontics"
      ]
    },
    {
      id: "advanced",
      title: "Advanced Orthodontic & Surgical",
      icon: <Activity className="w-4 h-4" />,
      skills: [
        "3D Surgical Orthodontics",
        "3D Orthodontic Appliance Design",
        "Expansion Orthodontics",
        "Surgical Orthodontics",
        "Cleft and Craniofacial Orthodontics"
      ]
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Restorative",
      icon: <Sparkle className="w-4 h-4" />,
      skills: [
        "Esthetic Smile Designing",
        "Teeth Whitening",
        "Dental Fillings",
        "Anterior Root Canal Treatment",
        "Tooth Jewellery"
      ]
    },
    {
      id: "surgery",
      title: "Oral Surgery & Prostho",
      icon: <Stethoscope className="w-4 h-4" />,
      skills: [
        "Emergency Surgical Extractions",
        "Single Implant Placement",
        "Removable and Fixed Dentures",
        "Complete Dentures"
      ]
    }
  ];

  const currentCategory = doctorExpertise.find(cat => cat.id === activeTab) || doctorExpertise[0];

  return (
    <section id="about-us" className="py-24 bg-white overflow-hidden text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: About Us clinic information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center pb-20 border-b border-neutral-100">
          
          {/* Left Column: Stylized Image Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-slate-50 rounded-full blur-2xl z-0" />
            
            <div className="relative z-10 w-full max-w-sm sm:max-w-md">
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
                  alt="Mithra’s Dental Studio Erode Consultation Room"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Floating top-rated badge */}
              <div className="absolute -bottom-4 -right-4 p-4 bg-yellow-400 text-slate-900 rounded-2xl shadow-lg flex items-center gap-3 border border-yellow-300 z-20">
                <div className="p-2 bg-slate-900 text-white rounded-xl">
                  <Award size={18} />
                </div>
                <div>
                   <div className="text-xs font-black uppercase tracking-wider">Top Rated</div>
                   <div className="text-[10px] font-mono">Clinic in Erode 2026</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Explanatory Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[#5D57A5] font-mono text-[11px] font-bold uppercase tracking-widest block">
                WELCOME TO MITHRA’S DENTAL STUDIO
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
                About Our Studio
              </h2>
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
            </div>

            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans">
              At Mithra’s Dental Studio, we are dedicated to transforming your smile with world-class dental solutions. Our state-of-the-art clinic is equipped with cutting-edge medical technologies and advanced diagnostic scans to ensure precise, comfortable, and highly personalized care.
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
                  <h4 className="text-xs font-bold text-slate-900">Certified Specialists</h4>
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
                href="#treatments"
                className="inline-block py-2.5 px-8 bg-[#5D57A5] hover:bg-[#4E4894] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer"
              >
                View Our Treatments
              </a>
            </div>
          </div>

        </div>

        {/* Unified Doctors Profile & Areas of Expertise Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Dr. Mithra Portrait / Bio Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
                  MEET OUR SPECIALIST
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                  Dr. Mithra, MDS
                </h3>
                <p className="text-xs font-semibold text-[#5D57A5] tracking-wide uppercase">
                  Chief Orthodontist & Aligner Specialist
                </p>
                <div className="w-12 h-0.5 bg-[#5D57A5] rounded-full" />
              </div>

              {/* Doctor Quick Badge Bio */}
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/60 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#5D57A5]/10 text-[#5D57A5] flex items-center justify-center shrink-0">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Education & Credentials</h4>
                    <p className="text-[10px] text-neutral-400">Master of Dental Surgery (MDS)</p>
                  </div>
                </div>

                <p className="text-neutral-500 text-xs leading-relaxed font-sans">
                  Dr. Mithra is a certified aligner specialist widely acclaimed for premium orthodontic correction, functional orthogenics, and customized smile aesthetics in Erode. Dedicated to utilizing state-of-the-art 3D diagnostics and surgical alignments.
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-md text-[10px] font-bold tracking-wider uppercase">Invisalign Expert</span>
                  <span className="px-2.5 py-1 bg-purple-100 text-[#5D57A5] rounded-md text-[10px] font-bold tracking-wider uppercase">3D Planner</span>
                </div>
              </div>
            </div>

            {/* Specialties & Areas of Expertise Tab Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>Areas of Expertise</span>
                </h3>
                <p className="text-neutral-500 text-xs">
                  Click a category below to view Dr. Mithra's clinical expertise and specialties:
                </p>
              </div>

              {/* Styled Category Tabs */}
              <div className="flex flex-wrap gap-2 pb-2 border-b border-neutral-100">
                {doctorExpertise.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 border cursor-pointer ${
                      activeTab === cat.id
                        ? "bg-[#5D57A5] text-white border-[#5D57A5] shadow-sm scale-102"
                        : "bg-white text-slate-650 border-neutral-200 hover:bg-neutral-50 text-neutral-500"
                    }`}
                  >
                    {cat.icon}
                    <span>{cat.title}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Skills Panel showing expertise lists */}
              <div className="bg-[#1C1242] text-white p-6 sm:p-8 rounded-3xl min-h-[280px] flex flex-col justify-between relative overflow-hidden box-border">
                {/* Background decorative path representing modern engineering detail */}
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none w-48 h-full">
                  <svg opacity="0.3" viewBox="0 0 100 100" className="w-full h-full fill-current text-[#5D57A5]">
                    <polygon points="50,0 100,0 100,100 0,100" />
                  </svg>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2 text-yellow-300 font-mono text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles size={11} className="fill-current animate-pulse" />
                    <span>Selected Clinical Suite</span>
                  </div>

                  <h4 className="text-sm font-bold tracking-wide uppercase text-neutral-100 pb-2 border-b border-white/10">
                    {currentCategory.title} Specialist Care
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-2">
                    <AnimatePresence mode="wait">
                      {currentCategory.skills.map((skill, index) => (
                        <motion.div
                          key={`${currentCategory.id}-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2, delay: index * 0.04 }}
                          className="flex items-start gap-2 group"
                        >
                          <div className="mt-0.5 p-0.5 rounded-full bg-yellow-300 text-slate-900 shrink-0 select-none">
                            <Check size={8} className="stroke-[3px]" />
                          </div>
                          <span className="text-[11px] sm:text-xs text-[#DFDBF2] font-sans group-hover:text-white transition-colors">
                            {skill}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <span className="text-[10px] text-white/50 font-mono tracking-wider">
                    *Delivering advanced orthodontic, cosmetic, restorative, and surgical dental care with precision and expertise.
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-yellow-300 hover:text-white font-bold uppercase text-[9px] tracking-widest hover:translate-x-1 transition-transform"
                  >
                    <span>Book Appointment with Her</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
