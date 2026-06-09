"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Product: ["Features", "Subjects", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies", "Licenses"],
};

export const Footer = () => {
  return (
    <footer className="relative py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="text-white font-black">
                AI Interview <span className="text-violet-400">Pro</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              The most advanced AI-powered interview preparation platform.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/40 hover:text-white
                        transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t border-white/5
          flex flex-col md:flex-row items-center
          justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            © 2026 AI Interview Pro. All rights reserved.
          </p>
          <p className="text-white/30 text-sm">
            Built with ❤️ using Claude AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;