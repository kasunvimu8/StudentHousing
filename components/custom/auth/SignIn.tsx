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
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="relative h-screen flex flex-col md:grid md:grid-cols-2">
      <Link
        href="/register"
        className="absolute right-4 top-4 md:right-8 md:top-8 hover:bg-slate-50 z-10 p-2 rounded-lg"
      >
        <p className="text-sm">Register</p>
      </Link>

      <div className="hidden md:flex text-white flex-col justify-center p-10 primary-background-color border-t-8 border-b-8 border-[white]">
        <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-lg">Please login to continue.</p>
        <Link href="/info">
          <div className="flex items-center cursor-pointer pt-1">
            <p className="text-lg mr-2">For more information </p>
            <FaArrowRight />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 relative">
        <Image
          src="/images/logo.png"
          width={180}
          height={50}
          alt="Student Housing Logo"
          className="absolute top-4 left-4 md:top-8 md:left-8 p-1"
        />
        <Card className="w-full max-w-md">
          <CardContent className="w-full">
            <div className="text-center space-y-2 pt-10">
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
                {pending && (
                  <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
