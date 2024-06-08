import { SignInForm } from "@/components/custom/auth/SignIn";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default page;
