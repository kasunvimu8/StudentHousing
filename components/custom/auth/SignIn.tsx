"use client";

import { signIn } from "@/actions/authentications";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImSpinner8 } from "react-icons/im";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { getUserType } from "@/actions/profiles";
import { adminType } from "@/constants";
import { FaArrowRight } from "react-icons/fa";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async () => {
    setPending(true);
    const res = await signIn({ email, password });
    const userType = await getUserType();
    const isAdmin = userType === adminType;

    if (res) {
      if (res.type === "ok") {
        if (isAdmin) {
          router.push("/dashboard");
        } else {
          router.push(decodeURIComponent(redirect));
          // router.push("/");
        }
      }

      toast({
        title: `Login : ${res.type === "ok" ? "Success" : "Failed"}`,
        description: res.msg,
      });
    }
    setPending(false);
  };

  const forgetPassword = () => {
    router.push("/forget-password");
  };

  return (
    <div className="relative min-h-screen overflow-auto flex items-center justify-end">
      <Link
        href="/register"
        className="absolute right-4 top-4 md:right-8 md:top-8 hover:bg-slate-50 z-10 p-2 rounded-lg"
      >
        <p className="text-sm">Register</p>
      </Link>
      <Image
        src="/images/logo.png"
        width={200}
        height={60}
        alt="Student Housing Logo"
        className="absolute top-4 left-4 md:top-8 md:left-8 p-1 z-10"
      />

      {/* background image */}
      <Image
        src="/images/background.jpg"
        alt="Background"
        fill={true}
        quality={100}
        className="z-[-1] rounded-lg object-cover"
      />

      {/* Login Container aligned to the right */}
      <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg max-w-md w-full m-8 mt-[80px]">
        <div className="text-2xl font-light mb-2 text-center">
          Welcome to Student Housing in Burgahausen
        </div>

        <div className="text-center space-y-2 pt-5">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm">Enter your credentials below to login</p>
        </div>

        <div className="grid gap-2 p-2">
          <div className="grid gap-2 pb-2">
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
              }}
              disabled={pending}
            />
            <Label className="p-1" htmlFor="password">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder=""
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setPassword(e.currentTarget.value);
                }}
                disabled={pending}
                className="pr-10"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {showPassword ? (
                  <PiEyeSlashBold
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <PiEyeBold
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex font-normal text-xs justify-end pb-2">
              <button
                onClick={() => forgetPassword()}
                className="cursor-pointer"
              >
                Forget Password ?
              </button>
            </div>
          </div>
          <Button
            disabled={pending}
            onClick={() => handleSubmit()}
            className="primary-background-color text-white"
          >
            {pending && <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
        <Link href="/info">
          <div className="flex items-center justify-end cursor-pointer pt-1">
            <div className="text-xs font-normal mr-2">
              To the information page
            </div>
            <FaArrowRight className="w-3 h-3" />
          </div>
        </Link>
      </div>
    </div>
  );
}
