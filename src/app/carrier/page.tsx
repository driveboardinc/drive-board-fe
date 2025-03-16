"use client";

import { withCarrierAuth } from "@/components/auth/hocs/withCarrierAuth";

function CarrierPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Carrier Dashboard</h1>
    </div>
  );
}

export default withCarrierAuth(CarrierPage);
