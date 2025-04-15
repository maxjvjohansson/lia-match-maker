"use client";

import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Laddar återställningsformulär...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
