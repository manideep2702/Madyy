"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CustomAlert from "@/components/ui/custom-alert";

export type AlertVariant = "success" | "error" | "warning" | "info";

export interface ShowAlertOptions {
  title?: string;
  description?: string;
  variant?: AlertVariant;
  // Auto dismiss timeout in ms. Set 0/undefined for default.
  durationMs?: number;
}

type AlertItem = Required<ShowAlertOptions> & { id: number };

const AlertContext = createContext<{
  show: (opts: ShowAlertOptions) => void;
} | null>(null);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (ctx) return ctx;
  // Safe fallback to avoid runtime crash if provider isn't mounted yet
  return {
    show: (opts: ShowAlertOptions) => {
      const msg = `${opts.title ?? ""}${opts.description ? `: ${opts.description}` : ""}`.trim();
      try { if (msg) window.alert(msg); } catch {}
    },
  };
}

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<AlertItem[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const show = useCallback((opts: ShowAlertOptions) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    const item: AlertItem = {
      id,
      title: opts.title ?? "",
      description: opts.description ?? "",
      variant: opts.variant ?? "info",
      durationMs: typeof opts.durationMs === "number" ? opts.durationMs : 3000,
    };
    setItems((prev) => [...prev, item]);
    if (item.durationMs && item.durationMs > 0) {
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, item.durationMs);
    }
  }, []);

  const value = useMemo(() => ({ show }), [show]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {/* Render container only on client to avoid hydration mismatches */}
      {mounted ? (
        <div
          suppressHydrationWarning
          className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[92vw] max-w-md flex-col-reverse gap-3 sm:w-auto"
        >
          {items.map((i) => (
            <div className="pointer-events-auto" key={i.id}>
              <CustomAlert variant={i.variant} title={i.title} description={i.description} />
            </div>
          ))}
        </div>
      ) : null}
    </AlertContext.Provider>
  );
}
