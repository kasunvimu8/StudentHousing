import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuArrowRight } from "react-icons/lu";
import DatePicker from "@/components/ui/NewCalender";
import { Mobile, RegisterErrors } from "@/types";
import { genders } from "@/constants";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
import { CountriesDropdown } from "@/components/ui/dropdown/CountriesDropdown";
import { getAllcountries } from "@/lib/countries";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { formOneSchema } from "@/lib/validators";
import { z } from "zod";

type StepOne = {
  firstName: string;
  lastName: string;
  dob: Date | undefined;
  step: number;
  errors: RegisterErrors;
  pending: boolean;
  gender: string;
  country: string;
  phone: Mobile;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<Mobile>>;
  setErrors: React.Dispatch<React.SetStateAction<RegisterErrors>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setdob: React.Dispatch<React.SetStateAction<Date | undefined>>;
};

const StepOne = ({
  firstName,
  lastName,
  dob,
  gender,
  country,
  step,
  errors,
  pending,
  phone,
  setFirstName,
  setLastName,
  setErrors,
  setStep,
  setdob,
  setGender,
  setCountry,
  setPhone,
}: StepOne) => {
  // assuming that the student is less than 50 year old
  // assuming the student is alteast older than 14 years
  const today = new Date();
  const fromDate = new Date(
    today.getFullYear() - 50,
    today.getMonth(),
    today.getDate()
  );
  const toDate = today;
  const allCountries = getAllcountries();

  const nextStep = () => {
    try {
      formOneSchema.parse({
        first_name: firstName,
        last_name: lastName,
        dob,
        gender,
        country,
        phone,
      });

      setStep(step + 1);
    } catch (e) {
      if (e instanceof z.ZodError) {
        const newErrors = e.flatten().fieldErrors;
        setErrors({
          ...errors,
          last_name: newErrors.last_name?.[0] || "",
          first_name: newErrors.first_name?.[0] || "",
          dob: newErrors.dob?.[0] || "",
          gender: newErrors.gender?.[0] || "",
          country: newErrors.country?.[0] || "",
          phone: newErrors.phone?.[0] || "",
        });
      }
    }
  };

  return (
    <div className="grid gap-2 p-2 space-y-1">
      <div className="grid gap-1 pb-2">
        <Label className="p-1" htmlFor="name">
          First Name
        </Label>
        <Input
          id="first_name"
          placeholder="Enter your first name"
          type="text"
          autoComplete="new-first-name"
          value={firstName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: RegisterErrors) => ({
              ...erros,
              first_name: "",
            }));
            setFirstName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.first_name && (
          <p className="failure-color text-xs">{errors.first_name}</p>
        )}
        <Label className="p-1" htmlFor="name">
          Last Name
        </Label>
        <Input
          id="last_name"
          placeholder="Enter your last name"
          type="text"
          autoComplete="new-last-name"
          value={lastName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setErrors((erros: RegisterErrors) => ({
              ...erros,
              last_name: "",
            }));
            setLastName(e.currentTarget.value);
          }}
          disabled={pending}
        />
        {errors.last_name && (
          <p className="failure-color text-xs">{errors.last_name}</p>
        )}

        <Label className="p-1" htmlFor="name">
          Date of Birth
        </Label>
        <DatePicker
          value={dob ? new Date(dob) : undefined}
          onChange={(value: string) => {
            setErrors((erros: RegisterErrors) => ({ ...erros, dob: "" }));
            setdob(new Date(value));
          }}
          selectionType="year"
          fromDate={fromDate}
          toDate={toDate}
        />
        {errors.dob && <p className="failure-color text-xs">{errors.dob}</p>}

        <Label className="p-1" htmlFor="gender">
          Gender
        </Label>
        <Select
          value={gender || ""}
          options={genders}
          placeHoder="Select Gender"
          optionsLabel="Select Your Gender"
          showAllItem={false}
          handleSelect={(value: string) => {
            setErrors((erros: RegisterErrors) => ({ ...erros, gender: "" }));
            setGender(value);
          }}
        />
        {errors.gender && (
          <p className="failure-color text-xs">{errors.gender}</p>
        )}

        <Label className="p-1" htmlFor="country">
          Country
        </Label>
        <CountriesDropdown
          value={country || ""}
          options={allCountries}
          placeHoder="Select Country"
          optionsLabel="Select Your Country"
          showAllItem={false}
          handleSelect={(value: string) => {
            setErrors((erros: RegisterErrors) => ({ ...erros, country: "" }));
            setCountry(value);
          }}
        />
        {errors.country && (
          <p className="failure-color text-xs">{errors.country}</p>
        )}

        <Label className="p-1" htmlFor="phone">
          Contact Number
        </Label>
        <PhoneInput
          country={phone.countryCode}
          value={phone.number}
          onChange={(phone, country: CountryData) => {
            setErrors((erros: RegisterErrors) => ({ ...erros, phone: "" }));
            setPhone({
              countryCode: country.countryCode,
              number: phone,
            });
          }}
          enableSearch={true}
          searchPlaceholder="Search"
          containerClass="phone-input-container"
          inputClass="!w-[250px]"
        />
        {errors.phone && (
          <p className="failure-color text-xs">{errors.phone}</p>
        )}

        <div className="flex justify-end pt-2">
          <Button
            disabled={pending}
            onClick={() => nextStep()}
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
