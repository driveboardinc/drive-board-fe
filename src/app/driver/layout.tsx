import React, { ReactNode } from "react";
import DriverDashboardHeader from "@/components/driver/DriverDashboardHeader";

interface DriverDashboardLayoutProps {
  children: ReactNode; // Define the children prop
}

const DriverDashboardLayout: React.FC<DriverDashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <DriverDashboardHeader />
      <main className="space-y-6 px-4 md:px-6 lg:px-8 xl:px-[125px] py-6">{children}</main>
    </div>
  );
};

export default DriverDashboardLayout;
