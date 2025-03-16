"use client";

import { DriverDashboardContent } from "@/components/driver/DriverDashboardContent";
import { withDriverAuth } from "@/components/auth/hocs/withDriverAuth";

function DriverDashboardPage() {
  return <DriverDashboardContent />;
}

export default withDriverAuth(DriverDashboardPage);
