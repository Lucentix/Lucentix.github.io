"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const GITHUB_USERNAME = "Lucentix";

  useEffect(() => {
    async function fetchRepos() {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Fehler beim Laden der Repos:", error);
      }
    }
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <ArrowRight className="h-6 w-6 text-cyan-400" />
            <span>Projects</span>
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center pt-16">
        <div className="container px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-5xl font-bold"
          >
            Our GitHub Projects
          </motion.h1>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <h3 className="mb-2 text-xl font-bold">{repo.name}</h3>
                <p className="text-gray-400">{repo.description || "No description available."}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-400">{repo.language || "Unknown"}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                      View on GitHub
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
