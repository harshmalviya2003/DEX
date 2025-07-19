"use client";

import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const particleVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    opacity: [0, 0.3, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
  { icon: <Github className="h-5 w-5" />, href: "https://github.com" },
];

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "Team", href: "#team" },
  { name: "FAQ", href: "#faq" },
];

const contactInfo = [
  { icon: <Mail className="h-4 w-4" />, text: "contact@ailabs.com" },
  { icon: <Phone className="h-4 w-4" />, text: "+1 (555) 123-4567" },
  { icon: <MapPin className="h-4 w-4" />, text: "123 AI Street, Tech City, TC 12345" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-5"></div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cyan-500/20 rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            variants={particleVariants}
            animate="animate"
            initial={{ opacity: 0 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center md:justify-start"
            >
              <span className="text-2xl font-bold text-blue-600">
                AI Labs
              </span>
            </motion.div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Revolutionizing the future with cutting-edge artificial intelligence solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-800 w-max">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-800 w-max">
              Contact
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-0.5">{item.icon}</span>
                  <span className="text-sm text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-800 w-max">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-200 flex items-center justify-center"
                  >
                    {social.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} <span className="text-blue-600">Demo Rewbi</span>. All rights reserved. 
            <span className="block sm:inline"> Design by <span className="text-blue-600">DesignsVerse</span></span>
          </p>
        </div>
      </div>
    </footer>
  );
}