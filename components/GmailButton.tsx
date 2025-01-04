"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";

interface GmailButtonProps {
  text: string;
}

export default function GmailButton({ text }: GmailButtonProps) {
  return (
    <button
      onClick={async () => await signIn("google")}
      className="flex gap-5 shadow-md px-8 py-2 rounded-lg"
    >
      <Image src="/google-icon.svg" width={20} height={20} alt="google-icon" />
      {text}
    </button>
  );
}
