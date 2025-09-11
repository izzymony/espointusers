import { Suspense } from "react";
import AccountActivationClient from "./AccountActivationClient";

export default function AccountActivationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountActivationClient />
    </Suspense>
  );
}
