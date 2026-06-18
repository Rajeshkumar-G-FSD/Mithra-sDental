/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, Camera, CheckSquare, Sparkles } from "lucide-react";

export function Gallery() {
  const [filter, setFilter] = useState<"all" | "clinic" | "smiles" | "equipment">("all");
  const [expanded, setExpanded] = useState(false);

  const initialImages = [
    {
      id: "gal-1",
      tag: "smiles",
      src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      alt: "Radiant aligned smile outcome",
      title: "Orthodontic smile outcome",
    },
    {
      id: "gal-2",
      tag: "clinic",
      src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
      alt: "Friendly consult process",
      title: "Patient consultation lounge",
    },
    {
      id: "gal-3",
      tag: "equipment",
      src: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600",
      alt: "State of the art sterilization",
      title: "Prophylactic tool hygiene",
    },
    {
      id: "gal-4",
      tag: "smiles",
      src: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600",
      alt: "Laser tooth whitening care",
      title: "Whitening shade mapping",
    },
    {
      id: "gal-5",
      tag: "clinic",
      src: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=600",
      alt: "Pediatric checkup procedure",
      title: "Kid-friendly comfort chair",
    },
    {
      id: "gal-6",
      tag: "equipment",
      src: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      alt: "Premium dental implants fitting",
      title: "Laser surgical scanner",
    },
  ];

  const extraImages = [
    {
      id: "gal-7",
      tag: "smiles",
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      alt: "Confident natural alignment",
      title: "Client post-treatment smile",
    },
    {
      id: "gal-8",
      tag: "clinic",
      src: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=600",
      alt: "Impeccably clean lobby setup",
      title: "City Smile Reception Lounge",
    },
    {
      id: "gal-9",
      tag: "equipment",
      src: "https://images.unsplash.com/photo-1609156272580-043960c1b4f1?auto=format&fit=crop&q=80&w=600",
      alt: "High frequency restorative scanner",
      title: "Digital orthodontistry suite",
    },
  ];

  const galleryList = expanded ? [...initialImages, ...extraImages] : initialImages;

  const filteredImages = galleryList.filter((img) => {
    return filter === "all" ? true : img.tag === filter;
  });

  return (
    <section id="gallery" className="py-24 bg-neutral-100/50 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-yellow-600 font-mono text-[11px] font-bold uppercase tracking-widest block">
            PHOTOGRAPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
            Our Gallery
          </h2>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(["all", "smiles", "clinic", "equipment"] as const).map((tab) => {
            const labelMap = {
              all: "All Photos",
              smiles: "Patient Smiles",
              clinic: "Our Clinic",
              equipment: "Clinical Systems",
            };
            return (
              <button
                key={tab}
                id={`gallery-tab-${tab}`}
                onClick={() => setFilter(tab)}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {labelMap[tab]}
              </button>
            );
          })}
        </div>

        {/* Dynamic Grid list */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                id={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-200/50 shadow-2xs hover:shadow-lg transition-all aspect-4/3"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Beautiful Yellow Hover Overlay */}
                <div className="absolute inset-0 bg-yellow-400/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10 text-slate-900">
                  <div className="flex justify-end">
                    <span className="p-2 bg-slate-900 text-white rounded-xl">
                      <ZoomIn size={14} />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-800 bg-white/45 px-2 py-0.5 rounded-full">
                      {img.tag}
                    </span>
                    <h3 className="text-sm font-semibold tracking-tight mt-2 text-slate-900">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* See More Expand button */}
        <div className="text-center mt-12">
          <button
            id="btn-gallery-toggle"
            onClick={() => setExpanded(!expanded)}
            className="inline-block py-2.5 px-8 bg-yellow-400 hover:bg-yellow-505 text-slate-900 font-bold text-xs uppercase tracking-widest rounded-full shadow-md transition-all cursor-pointer"
          >
            {expanded ? "See Less" : "See More"}
          </button>
        </div>

      </div>
    </section>
  );
}
