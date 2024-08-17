"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { forgetPasswordEmailSent } from "@/actions/authentications";
import { emailSchema } from "@/lib/validators";
import { z } from "zod";

export default function ForgetPasswordForm() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      setPending(true);

      const emailData = emailSchema.parse(email);
      const res = await forgetPasswordEmailSent(emailData);
      if (res) {
        toast({
          title: `Forget passsword Email Sent : ${
            res.type === "ok" ? "Success" : "Failed"
          }`,
          description: res.msg,
          variant: res.type === "ok" ? "ok" : "error",
        });
        if (res.type === "ok") {
          setIsSent(true);
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors = e?.errors?.map((e) => e.message);
        setError(newErrors?.[0] || "");
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col md:grid md:grid-cols-2">
      <Link
        href="/login"
        className="absolute text-sm right-4 top-4 md:right-8 md:top-8 hover:bg-slate-50 z-10 p-2 rounded-lg"
      >
        <p className="text-sm">Login</p>
      </Link>

      <div className="hidden md:flex text-white flex-col justify-center p-10 primary-background-color border-t-8 border-b-8 border-[white]">
        <h2 className="text-4xl font-bold mb-2">Recover Your Password</h2>
        <p className="text-lg">
          If you've forgotten your password, don't worry. Simply enter your
          email below, and we'll send you a link to create a new one.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 relative">
        <Image
          src="/images/logo.png"
          width={180}
          height={50}
          alt="Student Housing Logo"
          className="absolute top-4 left-4 md:top-8 md:left-8 p-1"
        />

        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2 pt-16">
            <h1 className="text-2xl font-semibold tracking-tight">
              Forget Password
            </h1>
            <p className="text-sm">
              Enter your email below to recieve password reset link
            </p>
          </div>

          <div className="grid gap-2 p-2">
            <div className="grid gap-1 pb-2">
              <Label className="p-1" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoComplete="new-email"
                value={email}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setEmail(e.currentTarget.value);
                  setError("");
                  setIsSent(false);
                }}
                disabled={pending}
              />

              {error && (
                <p className="hightlight-font-color text-xs p-1">{error}</p>
              )}
              {isSent && (
                <p className="text-xs hightlight-font-color p-1 pt-2">
                  A password recovery link has been sent to your email if there
                  is an account associated with the address you provided. Please
                  check your email to continue.
                </p>
              )}
            </div>

            {!isSent && (
              <Button
                disabled={pending}
                onClick={() => handleSubmit()}
                type="submit"
                className="primary-background-color text-white disabled:opacity-30"
              >
                {pending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Request Password Rest Link
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
