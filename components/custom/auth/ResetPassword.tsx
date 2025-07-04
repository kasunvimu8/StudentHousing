"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { PasswordResetSchema } from "@/lib/validators";
import { z } from "zod";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { resetPassword } from "@/actions/authentications";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm({
  token,
  user_id,
}: {
  token: string;
  user_id: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [pending, setPending] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async () => {
    try {
      setPending(true);

      const emailData = PasswordResetSchema.parse({
        password,
        confirmPassword,
      });
      const res = await resetPassword({ token, user_id, ...emailData });
      if (res) {
        toast({
          title: `Password Update : ${
            res.type === "ok" ? "Success" : "Failed"
          }`,
          description: res.msg,
          variant: res.type === "ok" ? "ok" : "error",
        });
        if (res.type === "ok") {
          router.push("/login");
        }
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors = e.flatten().fieldErrors;
        setErrors({
          password: newErrors.password?.[0] || "",
          confirmPassword: newErrors.confirmPassword?.[0] || "",
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-auto flex items-center justify-end">
      <Link
        href="/login"
        className="absolute text-sm right-4 top-4 md:right-8 md:top-8 hover:bg-slate-50 z-10 p-2 rounded-lg"
      >
        <p className="text-sm">Login</p>
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
      <div className="relative z-10 p-8 bg-white rounded-xl shadow-lg max-w-md w-full m-8 mt-[80px]">
        <div className="text-2xl font-light mb-2 text-center">
          Welcome to Student Housing in Burgahausen
        </div>

        <div className="text-center space-y-2 pt-5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-sm">
            Recover your account by resetting your password.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow p-4 md:p-8 relative">
          <div className="w-full max-w-md space-y-6">
            <div className="grid gap-2 p-2">
              <div className="grid gap-1 pb-2">
                <Label className="p-1" htmlFor="password">
                  New Password
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
                {errors.password && (
                  <p className="failure-color text-xs">{errors.password}</p>
                )}

                <Label className="p-1" htmlFor="password">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    placeholder=""
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-confirm-password"
                    value={confirmPassword}
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      setConfirmPassword(e.currentTarget.value);
                    }}
                    disabled={pending}
                    className="pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {showConfirmPassword ? (
                      <PiEyeSlashBold
                        onClick={() => setShowConfirmPassword(false)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <PiEyeBold
                        onClick={() => setShowConfirmPassword(true)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="failure-color text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
              <Button
                disabled={pending}
                onClick={() => handleSubmit()}
                type="submit"
                className="primary-background-color text-white disabled:opacity-30"
              >
                {pending && (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Reset Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
