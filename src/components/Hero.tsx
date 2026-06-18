/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Calendar, Heart } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  // Utilizing the persistent pre-generated background hero image
  const HERO_IMAGE_URL = "/src/assets/images/dental_hero_banner_1781798327821.jpg";

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-start overflow-hidden pt-36 pb-32 bg-[#1C143B]"
    >
      {/* Background Hero Image with Deep Indigo and Rose-Pink Overlays from the reference design representation */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Gentle patient smile outcome clinic"
          className="w-full h-full object-cover object-center scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Layer 1: Deep purple overlay with multiply blend mode */}
        <div className="absolute inset-0 bg-[#271E57]/80 mix-blend-multiply z-10" />
        
        {/* Layer 2: Rich color-preserving gradient matching the magenta/pink dental glow in the image */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#251b54] via-[#43318C]/80 to-[#D4226C]/25 opacity-90 z-20" />
        
        {/* Layer 3: Soft ambient radial gradient highlighting the central focus area */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_35%,transparent_30%,#181137_85%)] opacity-85 z-30" />
      </div>

      {/* Decorative Layered Wave Curve separating Hero from the AboutUs section */}
      <div className="absolute bottom-0 left-0 right-0 z-40 select-none pointer-events-none w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 180"
          className="relative block w-full h-[60px] sm:h-[100px] md:h-[150px] translate-y-[2px]"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Wave 1: Soft transparent lavender */}
          <path
            d="M0,60 C320,150 640,-10 960,110 C1200,170 1360,95 1440,55 L1440,180 L0,180 Z"
            fill="#5D57A5"
            opacity="0.25"
          />
          {/* Wave 2: Mid purple transparent */}
          <path
            d="M0,85 C400,180 700,20 1020,140 C1240,200 1360,115 1440,75 L1440,180 L0,180 Z"
            fill="#5D57A5"
            opacity="0.45"
          />
          {/* Wave 3: Solid white on TOP */}
          <path
            d="M0,110 C440,210 740,30 1080,165 C1280,210 1380,140 1440,100 L1440,180 L0,180 Z"
            fill="#ffffff"
          />
        </svg>
      </div>



      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-35 w-full text-white">
        <div className="max-w-2xl space-y-6">
          
          {/* Tagline Indicator / Visual spark from reference */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-yellow-300 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest"
          >
            <Sparkles size={11} className="fill-current text-yellow-300" />
            <span>Welcome To City Smile Dentistry</span>
          </motion.div>

          <div className="space-y-4">
            {/* Primary Majestic Heading in Exact spelling matching reference ("Healty Smiles Everyday") */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.05] drop-shadow-md"
            >
              Healty Smiles <br />
              <span className="font-normal font-serif">Everyday</span>
            </motion.h1>

            {/* Subheading from client request */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-white/90 leading-relaxed italic tracking-wider font-sans opacity-95"
            >
              ...because your smile is our passion
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs text-white/70 max-w-sm leading-relaxed font-sans"
          >
            Elevated dental health built on highly sanitized environments, persistent alignment precision, and warm family care.
          </motion.p>

          {/* Action CTAs: Make an Appointment Outline Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-4 flex flex-wrap gap-4"
          >
            <button
              id="hero-appointment-btn"
              onClick={onOpenBooking}
              className="py-3 px-8 border border-white/55 hover:bg-white hover:text-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Calendar size={13} className="group-hover:scale-110 transition-transform" />
              <span>Make An Appointment</span>
            </button>

            <a
              id="hero-specialties-btn"
              href="#services"
              className="py-3 px-8 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] uppercase tracking-widest rounded-full transition-all text-center tracking-normal border border-white/5"
            >
              Our specialties
            </a>
          </motion.div>

          {/* Minimal aesthetic stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-white/10 max-w-sm grid grid-cols-3 gap-4"
          >
            <div>
              <div className="text-lg font-bold font-display text-white">12k+</div>
              <div className="text-[9px] text-white/50 font-mono uppercase tracking-wider">
                alignments
              </div>
            </div>
            <div>
              <div className="text-lg font-bold font-display text-white">100%</div>
              <div className="text-[9px] text-white/50 font-mono uppercase tracking-wider">
                sterilize
              </div>
            </div>
            <div>
              <div className="text-lg font-bold font-display text-white">4.9 ★</div>
              <div className="text-[9px] text-white/50 font-mono uppercase tracking-wider">
                reviews
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
