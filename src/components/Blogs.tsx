/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen, Calendar, ArrowRight, Clock, User } from "lucide-react";
import { BlurText } from "./BlurText";

export function Blogs() {
  const blogs = [
    {
      id: "blog-1",
      title: "The Ultimate Guide to Invisible Braces & Aligners",
      tag: "Orthodontics",
      date: "June 14, 2026",
      readTime: "4 min read",
      author: "Dr. Elena Vance",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400",
      summary: "Understand the mechanics of modern transparent overlays and why orthodontistry is moving towards steel-free invisible models.",
    },
    {
      id: "blog-2",
      title: "5 Clinical Practices for Perfectly Polished White Teeth",
      tag: "Hygiene",
      date: "May 28, 2026",
      readTime: "5 min read",
      author: "Hygienist Ray S.",
      image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400",
      summary: "Explore safe enamel shade mapping, laser-activated whitening technology, and daily schedules to prevent stubborn yellow tea stains.",
    },
    {
      id: "blog-3",
      title: "Children Dental Checkups: Banishing Clinic Fear Patterns",
      tag: "Pediatrics",
      date: "May 10, 2026",
      readTime: "3 min read",
      author: "Dr. Marcus Cole",
      image: "https://images.unsplash.com/photo-1512223792601-592a9809eed4?auto=format&fit=crop&q=80&w=400",
      summary: "Learn how kid-friendly smart chairs, animated displays, and gentle diagnostics eliminate early patient anxiety patterns during checkups.",
    },
  ];

  return (
    <section id="blogs" className="py-24 bg-white text-[#2B1B54] font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header Title */}
        <div className="text-center space-y-2 mb-16">
          <span className="text-[#5D57A5] font-mono text-[11px] font-bold uppercase tracking-widest block">
            OUR INSIGHTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight">
            <BlurText
              text="Latest Dental Blogs"
              delay={120}
              animateBy="words"
              className="text-3xl sm:text-4xl font-serif font-semibold text-slate-900 tracking-tight"
            />
          </h2>
          <div className="w-12 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        {/* Blog layout list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <motion.article
              key={blog.id}
              id={blog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-250/20 shadow-2xs hover:shadow-lg hover:border-[#5D57A5]/35 transition-all"
            >
              <div>
                {/* Visual Cover */}
                <div className="relative aspect-video overflow-hidden bg-neutral-200">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 bg-[#5D57A5] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {blog.tag}
                  </span>
                </div>

                {/* Content Node */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-[#5D57A5] transition-colors uppercase tracking-tight">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                    {blog.summary}
                  </p>
                </div>
              </div>

              {/* Author & Action footer */}
              <div className="px-6 pb-6 pt-4 border-t border-neutral-200/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700">
                    <User size={12} className="text-[#5D57A5]" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600">{blog.author}</span>
                </div>

                <a
                  href="#contact-us"
                  className="text-[10px] font-bold uppercase tracking-wider text-[#5D57A5] group-hover:text-yellow-600 flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all text */}
        <div className="text-center mt-12">
          <a
            id="view-all-blogs-btn"
            href="#contact-us"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5D57A5] hover:text-yellow-600 transition-colors"
          >
            <BookOpen size={14} />
            <span>Discover All Insights</span>
          </a>
        </div>

      </div>
    </section>
  );
}
