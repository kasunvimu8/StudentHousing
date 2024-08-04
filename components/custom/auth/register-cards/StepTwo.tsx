"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { LuArrowLeft } from "react-icons/lu";
import { RegisterErrors } from "@/types";

type StepTwo = {
  email: string;
  password: string;
  id: string;
  passport: string;
  step: number;
  errors: RegisterErrors;
  pending: boolean;
  showPassword: boolean;
  check: boolean;
  dataProtectionCheck: boolean;
  setDataProtectionCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassport: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setErrors: React.Dispatch<React.SetStateAction<RegisterErrors>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
};

const StepTwo = ({
  email,
  password,
  id,
  passport,
  step,
  errors,
  pending,
  showPassword,
  check,
  dataProtectionCheck,
  setEmail,
  setId,
  setPassport,
  setPassword,
  setErrors,
  setStep,
  setShowPassword,
  setDataProtectionCheck,
  setCheck,
  handleSubmit,
}: StepTwo) => {
  return (
    <div className="grid gap-2 p-2 space-y-1">
      <div className="grid gap-1 pb-2">
        <Label className="p-1" htmlFor="user_id">
          Enrollment Number
        </Label>
        <Input
          id="id"
          placeholder="123456"
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
          <p className="hightlight-font-color text-xs">{errors.user_id}</p>
        )}

        <Label className="p-1" htmlFor="passport">
          Passport Id
        </Label>
        <Input
          id="passport"
          placeholder="123456"
          type="text"
          autoComplete="new-passport"
          value={passport}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: RegisterErrors) => ({ ...erros, passport: "" }));
            setPassport(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.passport && (
          <p className="hightlight-font-color text-xs">{errors.passport}</p>
        )}

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
          <p className="hightlight-font-color text-xs">{errors.password}</p>
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

        <div className="flex items-center pt-2">
          <Checkbox
            id="terms"
            checked={dataProtectionCheck}
            onCheckedChange={() => setDataProtectionCheck((check) => !check)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none ml-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I Agree to the data protection and legal consent policies
          </label>
        </div>
      </div>

      <div className="flex justify-start">
        <Button
          disabled={pending}
          onClick={() => setStep(step - 1)}
          type="submit"
          className="primary-background-color text-white"
        >
          <LuArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      </div>

      <div className="pt-2">
        <Button
          disabled={pending || !check || !dataProtectionCheck}
          onClick={() => handleSubmit()}
          type="submit"
          className="primary-background-color text-white disabled:opacity-30 w-full"
        >
          {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
