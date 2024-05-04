"use client";

import { signIn } from "@/actions/authentications";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";

export function SignInForm() {
  const [state, action] = useFormState(signIn, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="relative h-screen flex flex-col md:grid md:grid-cols-2">
      <Link
        href="/register"
        className="absolute right-4 top-4 md:right-8 md:top-8 hover:bg-slate-50 z-10 p-2 rounded-lg"
      >
        <p className="text-sm">Register</p>
      </Link>

      <div className="hidden md:flex text-white flex-col justify-center p-10 primary-background-color border-t-8 border-b-8 border-[white]">
        <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-lg">Please sign in to continue.</p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 relative">
        <Image
          src="/images/logo.svg"
          width={102}
          height={52}
          alt="Student Housing Logo"
          className="absolute top-4 left-4 md:top-8 md:left-8 p-1"
        />

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2 pt-16">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm">Enter your credentials below to log in</p>
          </div>

          <form action={action} autoComplete="off">
            <div className="grid gap-2 p-2">
              <div className="grid gap-2 pb-2">
                <Label className="p-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="new-email"
                  autoCorrect="off"
                  disabled={pending}
                />
                <Label className="p-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder=""
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={pending}
                />
              </div>
              <Button
                disabled={pending}
                type="submit"
                className="primary-background-color text-white"
              >
                {pending && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Log In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
