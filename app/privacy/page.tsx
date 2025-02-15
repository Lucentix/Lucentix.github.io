"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <span className="text-cyan-400">Privacy Policy</span>
          </Link>
        </div>
      </header>

      <div className="h-4"></div>

      <section className="relative flex min-h-screen items-center justify-center pt-16">
        <div className="container px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-5xl font-bold"
          >
            Privacy Policy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-12 max-w-3xl mx-auto space-y-6 text-gray-400"
          >
            <p>
              We build <span className="text-cyan-400">open-source projects</span> with a focus on transparency and security. Your privacy is important to us, and we do not collect personal data.
            </p>

            <h2 className="text-2xl font-bold text-white">Open Source & Transparency</h2>
            <p>
              All of our code is publicly available on <Link href="/projects" className="text-cyan-400 underline">GitHub</Link>. You are free to review, contribute, and use our projects under the respective open-source licenses.
            </p>

            <h2 className="text-2xl font-bold text-white">Data Collection</h2>
            <p>
              We do not collect or store personal data. If any third-party services (like GitHub API) are used, their privacy policies apply.
            </p>

            <h2 className="text-2xl font-bold text-white">Cookies & Tracking</h2>
            <p>
              Our website does not use cookies or tracking mechanisms. We believe in an ad-free and privacy-friendly experience.
            </p>

            <h2 className="text-2xl font-bold text-white">License & Rights</h2>
            <p>
              Our projects are licensed under open-source licenses (e.g., MIT, Apache). Check individual repositories for license details.
            </p>

            <h2 className="text-2xl font-bold text-white">Contact</h2>
            <p>
              If you have any questions, feel free to join our <Link href="/discord" className="text-cyan-400 underline">Discord</Link>.
            </p>
            
            <div className="h-4"></div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
