"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ChangelogEntry {
  repo: string;
  version: string;
  date: string;
  notes: string;
  url: string;
}

export default function Changelog() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        const reposRes = await fetch("https://api.github.com/orgs/Lucentix/repos");
        const repos = await reposRes.json();

        if (!Array.isArray(repos)) return;

        const allChangelog: ChangelogEntry[] = []; // Changed to const

        for (const repo of repos) {
          const releasesRes = await fetch(`https://api.github.com/repos/Lucentix/${repo.name}/releases`);
          const releases = await releasesRes.json();

          if (Array.isArray(releases) && releases.length > 0) {
            allChangelog.push({
              repo: repo.name,
              version: releases[0].tag_name,
              date: new Date(releases[0].published_at).toLocaleDateString(),
              notes: releases[0].body || "No description provided.",
              url: releases[0].html_url,
            });
          } else {
            const commitsRes = await fetch(`https://api.github.com/repos/Lucentix/${repo.name}/commits`);
            const commits = await commitsRes.json();

            if (Array.isArray(commits) && commits.length > 0) {
              allChangelog.push({
                repo: repo.name,
                version: commits[0].sha.substring(0, 7),
                date: new Date(commits[0].commit.author.date).toLocaleDateString(),
                notes: commits[0].commit.message,
                url: commits[0].html_url,
              });
            }
          }
        }

        allChangelog.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setChangelog(allChangelog);
      } catch (error) {
        console.error("Error fetching changelog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchChangelog();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <span className="text-cyan-400">Changelogs</span>
          </Link>
        </div>
      </header>

      <div className="h-12"></div>

      <div className="min-h-screen bg-black text-white px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold">🚀 Changelog</h1>
          <p className="text-gray-400">Latest updates across all our projects.</p>
        </header>

        {loading ? (
          <p className="text-center text-gray-400">Loading changelog...</p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {changelog.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-white/10 rounded-xl p-6 bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{entry.repo} - {entry.version}</h2>
                  <span className="text-gray-400">{entry.date}</span>
                </div>
                <p className="text-gray-300 mt-2">{entry.notes}</p>
                <Link
                  href={entry.url}
                  className="mt-4 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
                >
                  View on GitHub <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
