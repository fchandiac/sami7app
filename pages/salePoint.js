import SalePoint from "@/components/salePoint/SalePoint";
import { SalePointProvider } from "@/components/salePoint/salePointProvider";
import React from "react";

export default function salePoint() {
  return (
    <>
      <SalePointProvider>
        <SalePoint />
      </SalePointProvider>
    </>
  );
}
