'use client'
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 lg:py-40 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center mb-4">
            <hr className="w-16 h-1 bg-gray-800 border-0 rounded mr-4" />
            <span className="text-gray-900 font-semibold tracking-wider uppercase text-sm md:text-base">Who We Are</span>
            <hr className="w-16 h-1 bg-gray-800 border-0 rounded ml-4" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
            Supercharge Your <span className="text-blue-600">Browser</span> with Dex
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your AI copilot for productivity, living right in your browser
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8"
          >
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Dex is your <span className="font-semibold text-gray-900">AI-powered browser assistant</span>, designed to offload tedious tasks, streamline workflows, and eliminate context switching. From summarizing articles to tracking PRs and app updates, Dex works where you do.
            </p>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              Since 2025, Dex has empowered <span className="font-semibold text-gray-900">thousands of users</span> to 10x their productivity. With context-aware intelligence, voice-activated commands, and secure data handling, Dex is your ultimate productivity intern.
            </p>
            <div className="pt-2">
              <motion.button
                whileHover={{ 
                  scale: 1.05
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 text-lg"
              >
                Join the Waitlist
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-200/50 transform transition-all duration-500 group-hover:shadow-xl">
              <img
                src="/about.jpg"
                alt="Dex AI assistant visual"
                className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-500 rounded-2xl"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gray-400/20 rounded-2xl translate-x-6 translate-y-6 transition-all duration-500 group-hover:translate-x-8 group-hover:translate-y-8"></div>
            
          
          </motion.div>
        </div>
      </div>
    </section>
  );
}