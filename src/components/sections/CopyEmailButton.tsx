"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function CopyEmailButton({
  email,
  variant = "outline",
  size = "lg",
}: {
  email: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email copied", { description: email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(`Couldn't copy. Email is ${email}`);
    }
  }

  return (
    <Button variant={variant} size={size} onClick={copy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? "Copied" : "Copy email"}
    </Button>
  );
}
