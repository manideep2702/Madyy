"use client";

import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/ui/gradient-button";
import RequireAuth from "@/components/auth/require-auth";

export default function CalendarPage() {
  const router = useRouter();

  return (
    <RequireAuth>
      <div className="min-h-[60vh] w-full flex items-start justify-center px-6 pt-24 pb-16">
        <div className="flex w-full max-w-5xl flex-col items-center gap-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Calendar</h1>
          <p className="text-muted-foreground max-w-prose">
            Choose a calendar to explore Samithi events and annadanam schedules.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <GradientButton onClick={() => router.push("/calendar/temple")}>
              Ayyappa Temple Calander
            </GradientButton>
            <GradientButton variant="variant" onClick={() => router.push("/calendar/annadanam")}>
              Annadanam Calendar
            </GradientButton>
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}
