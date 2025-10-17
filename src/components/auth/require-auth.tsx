"use client";

import React from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  // Authentication disabled: always render children without checks
  return <>{children}</>;
}
