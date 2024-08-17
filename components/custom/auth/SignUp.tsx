"use client";

import { signUp } from "@/actions/authentications";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SignupFormSchema } from "@/lib/validators";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import StepOne from "@/components/custom/auth/register-cards/StepOne";
import StepTwo from "@/components/custom/auth/register-cards/StepTwo";
import { Mobile } from "@/types";

export function SignUpForm() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    user_id: "",
    // enrollment_id: "",
    name: "",
    dob: "",
    gender: "",
    country: "",
    phone: "",
    passport: "",
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setdob] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [passport, setPassport] = useState<string>("");
  const [phone, setPhone] = useState<Mobile>({
    countryCode: "de",
    number: "",
  });

  const [step, setStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [check, setCheck] = useState(false);
  const [dataProtectionCheck, setDataProtectionCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const credentials = SignupFormSchema.parse({
        email,
        password,
        user_id: id,
        name,
        gender,
        country,
        phone,
        passport,
        dob,
      });

      setPending(true);
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
          name: newErrors.name?.[0] || "",
          dob: newErrors.dob?.[0] || "",
          gender: newErrors.gender?.[0] || "",
          country: newErrors.gender?.[0] || "",
          phone: newErrors.gender?.[0] || "",
          passport: newErrors.passport?.[0] || "",
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
          src="/images/logo.png"
          width={180}
          height={50}
          alt="Student Housing Logo"
          className="absolute top-4 left-4 md:top-8 md:left-8 p-1"
        />
        <Card className="w-full max-w-md mt-[80px]">
          <CardContent className="w-full space-y-6">
            <div className="text-center space-y-2 pt-10">
              <h1 className="text-2xl font-semibold tracking-tight">
                Register
              </h1>
              <div className="flex justify-center font-bold text-sm ">
                Step {step} of 2
              </div>
              <p className="text-sm">
                Enter your credentials below to create your account
              </p>
            </div>

            {step === 1 ? (
              <StepOne
                name={name}
                dob={dob}
                step={step}
                phone={phone}
                errors={errors}
                pending={pending}
                gender={gender}
                country={country}
                setName={setName}
                setErrors={setErrors}
                setStep={setStep}
                setdob={setdob}
                setGender={setGender}
                setCountry={setCountry}
                setPhone={setPhone}
              />
            ) : (
              <StepTwo
                email={email}
                password={password}
                id={id}
                passport={passport}
                step={step}
                errors={errors}
                pending={pending}
                showPassword={showPassword}
                check={check}
                dataProtectionCheck={dataProtectionCheck}
                setEmail={setEmail}
                setId={setId}
                setPassword={setPassword}
                setErrors={setErrors}
                setStep={setStep}
                setShowPassword={setShowPassword}
                setDataProtectionCheck={setDataProtectionCheck}
                setCheck={setCheck}
                handleSubmit={handleSubmit}
                setPassport={setPassport}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
