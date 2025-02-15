"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // <-- Hier importiert
import { Button } from "@/components/ui/button";

export default function Team() {
  const [teamMembers] = useState([
    { name: "Lucentix", role: "Founder - Main Developer", img: "https://cdn.discordapp.com/avatars/1059077615580880967/a09beb7666b4270667ef76ef7536464f?size=1024", connectLink: "https://discord.com/users/1059077615580880967" }, 
    { name: "cuzimstupi4", role: "Core Team - 2nd Main Developer", img: "https://cdn.discordapp.com/avatars/517764829927440396/7c426a372ed836f25544ea96459bd780?size=1024", connectLink: "https://discord.com/users/517764829927440396" },
  ]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link className="flex items-center space-x-2 font-bold" href="/">
            <Users className="h-6 w-6 text-cyan-400" />
            <span>Our Team</span>
          </Link>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
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
              Meet Our Team
            </h1>
            <p className="mx-auto max-w-2xl text-muted text-gray-400 sm:text-xl">
              A group of passionate individuals working together to create amazing projects.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/10 bg-black py-24">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Talented Team
            </h2>
            <p className="mt-4 text-gray-400">
              The people who make it all happen.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:border-cyan-400/50"
              >
                <div className="relative mb-4 h-32 w-32 mx-auto rounded-full overflow-hidden">
                  <Image
                    src={member.img}
                    alt={`Profile picture of ${member.name}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
                <div className="mt-4 text-center">
                  <Link href={member.connectLink} passHref>
                    <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
                      Connect
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