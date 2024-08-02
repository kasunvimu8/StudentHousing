import React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuArrowRight } from "react-icons/lu";

type Errors = {
  email: string;
  password: string;
  user_id: string;
  name: string;
};

type StepOne = {
  name: string;
  step: number;
  errors: Errors;
  pending: boolean;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const StepOne = ({
  name,
  step,
  errors,
  pending,
  setName,
  setErrors,
  setStep,
}: StepOne) => {
  return (
    <div className="grid gap-2 p-2 space-y-1">
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
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}

        <Label className="p-1" htmlFor="name">
          Date of Birth
        </Label>
        <Input
          id="name"
          placeholder="Elena Petrova"
          type="text"
          autoComplete="new-name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}

        <Label className="p-1" htmlFor="name">
          Sex
        </Label>
        <Input
          id="name"
          placeholder="Elena Petrova"
          type="text"
          autoComplete="new-name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}

        <Label className="p-1" htmlFor="name">
          Country
        </Label>
        <Input
          id="name"
          placeholder="Elena Petrova"
          type="text"
          autoComplete="new-name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}
        <Label className="p-1" htmlFor="name">
          Contact Number
        </Label>
        <Input
          id="name"
          placeholder="Elena Petrova"
          type="text"
          autoComplete="new-name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}

        <Label className="p-1" htmlFor="name">
          Contact Number
        </Label>
        <Input
          id="name"
          placeholder="Elena Petrova"
          type="text"
          autoComplete="new-name"
          value={name}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: Errors) => ({ ...erros, name: "" }));
            setName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.name && (
          <p className="hightlight-font-color text-xs">{errors.name}</p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            disabled={pending}
            onClick={() => setStep(step + 1)}
            type="submit"
            className="primary-background-color text-white"
          >
            Next
            <LuArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
