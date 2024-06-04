"use client";

import { signUp } from "@/actions/authentications";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SignupFormSchema } from "@/lib/validators";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";

export function SignUpForm() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    user_id: "",
    // enrollment_id: "",
    name: "",
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [enrollmentId, setEnrollmentId] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setPending(true);
      const credentials = SignupFormSchema.parse({
        email,
        password,
        user_id: id,
        // enrollment_id: enrollmentId,
        name,
      });
      const res = await signUp(credentials);
      if (res) {
        toast({
          title: `User Registration : ${
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
          email: newErrors.email?.[0] || "",
          password: newErrors.password?.[0] || "",
          user_id: newErrors.user_id?.[0] || "",
          // enrollment_id: newErrors.enrollment_id?.[0] || "",
          name: newErrors.name?.[0] || "",
        });
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
        <h2 className="text-4xl font-bold mb-2">Let's Find Your Place!</h2>
        <p className="text-lg">
          Create your profile and explore affordable housing options.
        </p>
        <Link href="/info">
          <div className="flex items-center cursor-pointer pt-1">
            <p className="text-lg mr-2">For more information </p>
            <FaArrowRight />
          </div>
        </Link>
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
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm">
              Enter your credentials below to create your account
            </p>
          </div>

          <div className="grid gap-2 p-2">
            <div className="grid gap-1 pb-2">
              <Label className="p-1" htmlFor="name">
                Name (First name and Last name)
              </Label>
              <Input
                id="name"
                placeholder="Elena Petrova"
                type="text"
                autoComplete="new-name"
                value={name}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setErrors((erros) => ({ ...erros, name: "" }));
                  setName(e.currentTarget.value);
                }}
                disabled={pending}
              />
              {errors.name && (
                <p className="hightlight-font-color text-xs">{errors.name}</p>
              )}

              <Label className="p-1" htmlFor="user_id">
                User Id (Enrollment Number)
              </Label>
              <Input
                id="id"
                placeholder="1234567"
                type="text"
                autoComplete="new-id"
                value={id}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setErrors((erros) => ({ ...erros, user_id: "" }));
                  setId(e.currentTarget.value);
                }}
                disabled={pending}
              />
              {errors.user_id && (
                <p className="hightlight-font-color text-xs">
                  {errors.user_id}
                </p>
              )}

              {/* <Label className="p-1" htmlFor="enrollment_id">
                Enrollment Number
              </Label>
              <Input
                id="enrollment_id"
                placeholder="1234567"
                type="text"
                autoComplete="new-enrollement-id"
                value={enrollmentId}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setErrors((erros) => ({ ...erros, enrollment_id: "" }));
                  setEnrollmentId(e.currentTarget.value);
                }}
                disabled={pending}
              />
              {errors.enrollment_id && (
                <p className="hightlight-font-color text-xs">
                  {errors.enrollment_id}
                </p>
              )} */}

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
                  setErrors((erros) => ({ ...erros, email: "" }));
                  setEmail(e.currentTarget.value);
                }}
                disabled={pending}
              />
              {errors.email && (
                <p className="hightlight-font-color text-xs">{errors.email}</p>
              )}

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
              {errors.password && (
                <p className="hightlight-font-color text-xs">
                  {errors.password}
                </p>
              )}

              <div className="flex items-center pt-4">
                <Checkbox
                  id="terms"
                  checked={check}
                  onCheckedChange={() => setCheck((check) => !check)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm that the information provided is accurate
                </label>
              </div>
            </div>
            <Button
              disabled={pending || !check}
              onClick={() => handleSubmit()}
              type="submit"
              className="primary-background-color text-white disabled:opacity-30"
            >
              {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
