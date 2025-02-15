"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const services = [
  { name: "GitHub API", url: "https://api.github.com" },
  { name: "Discord API", url: "https://discordstatus.com/api/v2/status.json" },
  { name: "FiveM", url: "https://servers-frontend.fivem.net/api/servers/stream" },
];

interface ServiceStatus {
  name: string;
  url: string;
  status: string;
  responseTime: string;
}

export default function Home() {
  const [statuses, setStatuses] = useState<ServiceStatus[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const results = await Promise.all(
        services.map(async (service) => {
          const start = performance.now();
          try {
            await axios.get(service.url, { timeout: 5000 }); // 5 Sekunden Timeout
            const responseTime = (performance.now() - start).toFixed(2);
            return { ...service, status: "Online", responseTime: `${responseTime}ms` };
          } catch (error) {
            return { ...service, status: "Offline", responseTime: "N/A" };
          }
        })
      );
      setStatuses(results);
    };

    fetchStatuses();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-6">
          <h1 className="flex items-center space-x-2 font-bold text-2xl">
            Service Watchdog
          </h1>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center pt-1">
        <div className="absolute inset-0 overflow-hidden">
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
            stroke="#22d3ee"
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
            stroke="#8b5cf6"
            strokeWidth="1"
          />
        </div>

        <div className="container relative z-[3] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto max-w-3xl space-y-8"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Service Status
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl">
              Check the status of your favorite services in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/20 bg-black py-24">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statuses.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-lg transition-colors hover:border-cyan-400/50"
              >
                <h2 className="text-xl font-semibold">{service.name}</h2>
                <p>
                  Status:{" "}
                  <span
                    className={
                      service.status === "Online"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {service.status}
                  </span>
                </p>
                <p>Response Time: {service.responseTime}</p>
                <div className="flex justify-center mt-6">
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600 px-8 py-3 rounded-xl flex items-center">
                      View the Service <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
