"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

const DISCORD_INVITE = "https://discord.gg/qPHhXmVUm2"; // Ersetze mit deinem Invite-Link

export default function DiscordPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = DISCORD_INVITE;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MessageCircle className="h-20 w-20 text-cyan-400 mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-bold">Join our Discord</h1>
        <p className="text-gray-400">You will be redirected shortly...</p>

        <div className="h-4"></div>

        <Link href={DISCORD_INVITE} passHref>
          <Button className="bg-gradient-to-r from-cyan-400 to-violet-500 text-lg text-black hover:from-cyan-500 hover:to-violet-600">
            Join Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
