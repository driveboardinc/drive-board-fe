import type React from "react";
export default function DriverDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-6 px-4 md:px-6 lg:px-8 xl:px-[256px] py-6">{children}</main>
    </div>
  );
}
