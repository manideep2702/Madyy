"use client";

import React from "react";
import { AlertProvider } from "@/components/ui/alert-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AlertProvider>{children}</AlertProvider>;
}

