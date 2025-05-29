"use client";

import { registerLicense } from "@syncfusion/ej2-base";
import { showToastError } from "@/@/utils/helpers";

export default function SyncfusionLicenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const licenseKey = process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY ?? "";

  if (!licenseKey) {
    // console.error("Syncfusion license key is missing! Please add it to .env");
    showToastError("Syncfusion license key is missing! Please add it to .env");
  } else {
    console.log("Registering Syncfusion license...");
    registerLicense(licenseKey);
  }

  return <>{children}</>;
}
