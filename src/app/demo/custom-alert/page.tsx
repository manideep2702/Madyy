"use client";

import CustomAlert from "@/components/ui/custom-alert";

export default function Page() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Custom Alert Demo</h1>
      <p className="text-sm text-muted-foreground mb-8">
        The alert appears at the top-right corner. Click the X to dismiss.
      </p>
      <CustomAlert title="Welcome!" description="This is a sample success message." variant="success" />
    </main>
  );
}

