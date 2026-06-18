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
  // Using the absolute path of the generated image
  const HERO_IMAGE_URL = "/src/assets/images/dental_hero_banner_1781798327821.jpg";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-slate-900"
    >
      {/* Background Hero Image with Deep Slate Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_URL}
          alt="Friendly dentist clinic"
          className="w-full h-full object-cover object-center opacity-45 scale-105 animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-100" />
      </div>

      {/* Decorative Wavy Curve separating Hero from next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 select-none pointer-events-none">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-auto text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,128L80,117.3C160,107,320,85,480,90.7C640,96,800,128,960,138.7C1120,149,1280,139,1360,133.3L1440,128L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full text-white">
        <div className="max-w-2xl">
          {/* Tagline Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full border border-yellow-400/30 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={11} className="fill-current text-yellow-300" />
            <span>Welcome To City Smile Dentistry</span>
          </motion.div>

          {/* Primary Majestic Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold tracking-tight text-white leading-none"
          >
            Healy Smiles <br />
            <span className="text-yellow-400 italic">Everyday</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300/90 mt-4 leading-relaxed italic tracking-wide font-sans flex items-center gap-2"
          >
            <Heart size={16} className="text-rose-500 fill-current animate-pulse shrink-0" />
            <span>...because your smile is our passion</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs text-neutral-400 mt-2 max-w-md font-sans leading-relaxed"
          >
            Providing dental care built on state-of-the-art hygiene technology, persistent precision, and welcoming comfort.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              id="hero-appointment-btn"
              onClick={onOpenBooking}
              className="py-3 px-8 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all hover:shadow-yellow-500/20 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Calendar size={14} />
              <span>Make An Appointment</span>
            </button>

            <a
              id="hero-learn-more-btn"
              href="#services"
              className="py-3 px-8 border border-white hover:bg-white hover:text-slate-900 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all text-center"
            >
              Our Specialties
            </a>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md text-white"
          >
            <div>
              <div className="text-xl font-bold font-display text-yellow-400">12k+</div>
              <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Happy Teeth
              </div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-yellow-400">15+</div>
              <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Dental Specialists
              </div>
            </div>
            <div>
              <div className="text-xl font-bold font-display text-yellow-400">99.8%</div>
              <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mt-0.5">
                Satisfaction
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
