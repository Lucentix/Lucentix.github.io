"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  LineChart,
  Lock,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    stars: 0,
    followers: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      const userRes = await fetch("https://api.github.com/users/Lucentix");
      const userData = await userRes.json();

      const reposRes = await fetch("https://api.github.com/users/Lucentix/repos");
      const reposData = await reposRes.json();

      setGithubStats({
        repos: reposData.length, // Set the number of repositories
        stars: reposData.reduce(
          (acc: number, { stargazers_count }: { stargazers_count: number }) => acc + stargazers_count,
          0 // Initial value for acc
        ),
        followers: userData.followers,
      });
    }

    fetchGitHubStats();
  }, []);


  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <Wallet className="h-6 w-6 text-cyan-400" />
            <span>Lucentix</span>
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad1" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
              }}
              d="M 100 100 Q 300 0 500 100 T 900 100"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 0.5,
              }}
              d="M 0 200 Q 200 100 400 200 T 800 200"
              fill="none"
              stroke="url(#grad2)"
              strokeWidth="1"
            />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 1,
                delay: 1,
              }}
              d="M 100 600 Q 300 500 500 600 T 900 600"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="1"
            />
          </svg>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: "100%", opacity: 0 }}
                animate={{
                  x: "-100%",
                  opacity: [0, 0.7, 0.7, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                }}
                className="absolute right-0"
                style={{
                  top: `${15 + i * 10}%`,
                  height: "1px",
                  width: "100%",
                  background: `linear-gradient(90deg, transparent, ${
                    i % 2 === 0 ? "#22d3ee" : "#8b5cf6"
                  }60, transparent)`,
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="absolute inset-0 z-[1]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/30 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute -right-1/4 top-1/2 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
          />
        </div>

        <div className="container relative z-[3] px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Lucentix
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl">
              We focus on creating high-quality solutions with a passion for
              innovation and community-driven development.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://discord.gg/qPHhXmVUm2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                  Connect with us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section
  id="features"
  className="relative z-10 border-t border-white/10 bg-black py-24"
>
  <div className="container px-4">
    <div className="mb-16 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        Why Choose Us?
      </h2>
      <p className="mt-4 text-gray-400">Here’s why you should join and contribute to our open-source movement</p>
    </div>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
      >
        <CreditCard className="mb-4 h-12 w-12 text-cyan-400" />
        <h3 className="mb-2 text-xl font-bold">Completely Free for Everyone</h3>
        <p className="text-gray-400">
          We believe in making technology accessible to all. That's why our projects are completely free to use, with no hidden fees or restrictions. 
          Whether you're a beginner or an expert, our open-source tools and resources are available to everyone at no cost. 
          Join us and enjoy the freedom of using and contributing to high-quality software without worrying about licensing or costs.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
      >
        <CheckCircle2 className="mb-4 h-12 w-12 text-cyan-400" />
        <h3 className="mb-2 text-xl font-bold">Fully Open Source and Transparent</h3>
        <p className="text-gray-400">
          Transparency is key to building trust in software. As an open-source GitHub organization, all of our projects are available for inspection, 
          modification, and collaboration. This allows developers around the world to contribute to the codebase, fix bugs, add features, and improve the tools we all use. 
          Whether you're interested in learning, contributing, or simply using the projects, you'll always have full access to the code and our development process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
      >
        <LineChart className="mb-4 h-12 w-12 text-cyan-400" />
        <h3 className="mb-2 text-xl font-bold">Collaborative and Community-Driven</h3>
        <p className="text-gray-400">
          At the core of our organization is a strong, passionate community. By being part of our open-source movement, you’re not just using software, 
          you’re joining a group of like-minded individuals who are committed to collaboration and shared growth. We encourage contributions from everyone, 
          no matter your skill level. Your ideas, feedback, and code can shape the future of our projects. Together, we can create something incredible.
        </p>
      </motion.div>
    </div>
  </div>
</section>


      <section id="github-stats" className="relative z-10 border-t border-white/10 bg-black py-24">
  <div className="container px-4">
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        GitHub Stats
      </h2>
      <p className="mt-4 text-gray-400">Real-time GitHub statistics</p>
    </div>

    <div className="mt-12 grid grid-cols-2 gap-5 text-center">
      <div className="stat-card">
        <h3 className="text-2xl font-bold">{githubStats.repos}</h3>
        <p>Repositories</p>
      </div>
      <div className="stat-card">
        <h3 className="text-2xl font-bold">{githubStats.stars}</h3>
        <p>Stars</p>
      </div>
    </div>
  </div>
</section>


<section className="relative z-10 border-t border-white/10 bg-black py-24">
  <div className="container px-4">
    <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-950/50 to-violet-950/50 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        Why Choose Us?
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-gray-400">
        We are committed to providing high-quality, open-source solutions to the community. Our mission is to create software that empowers developers and fosters collaboration. Join our growing community and contribute to exciting projects that benefit everyone.
      </p>
      <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-4 text-left">
        <li className="flex items-center space-x-3">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          <span>Collaborative, open-source projects</span>
        </li>
        <li className="flex items-center space-x-3">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          <span>Join a global community of developers</span>
        </li>
        <li className="flex items-center space-x-3">
          <CheckCircle2 className="h-5 w-5 text-cyan-400" />
          <span>Free and accessible to all</span>
        </li>
      </ul>
      <a href="https://discord.gg/qPHhXmVUm2" target="_blank" rel="noopener noreferrer">
      <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600 mt-8">
      Connect with us
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </a>
    </div>
  </div>
</section>


      <footer className="border-t border-white/10 bg-black py-8">
        <div className="container flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Wallet className="h-6 w-6 text-cyan-400" />
            <span className="font-bold">Lucentix</span>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Made by CuzImStupi4 & Lucentix with ❤️
          </p>
          <div className="flex space-x-6"></div>
        </div>
      </footer>
    </div>
  );
}
