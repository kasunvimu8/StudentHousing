"use client";

import React, { ReactNode } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { Input } from "@/components/ui/input";
import { ProfileUpdateErrors, userDetailsCompProps } from "@/types";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
import { genders } from "@/constants";
import { CountriesDropdown } from "@/components/ui/dropdown/CountriesDropdown";
import { getAllcountries } from "@/lib/countries";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "@/components/ui/NewCalender";
import { cn } from "@/lib/utils";

const HeaderItemLayout = ({
  children,
  title,
  containerClass,
  shortItem,
}: {
  title: string;
  children: ReactNode;
  containerClass?: string;
  shortItem?: boolean;
}) => {
  return (
    <div className={cn("col-span-6", containerClass)}>
      <div className="grid grid-cols-12 gap-2">
        <div
          className={cn(
            "text-sm font-normal primary-light-font-color col-span-12 flex items-center",
            shortItem ? "md:col-span-4" : "md:col-span-2"
          )}
        >
          {title}
        </div>
        <div
          className={cn(
            "text-sm font-normal col-span-12",
            shortItem ? "md:col-span-8" : "md:col-span-10"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const DetailsSection: React.FC<userDetailsCompProps> = ({
  userState,
  errors,
  updateLocalState,
  setErrors,
  isAdmin,
}) => {
  const allCountries = getAllcountries();
  const today = new Date();
  const fromDate = new Date(
    today.getFullYear() - 50,
    today.getMonth(),
    today.getDate()
  );
  const toDate = today;
  return (
    <div className="pt-2">
      <SectionTitle title="Profile Details" />
      <div className="w-full grid grid-cols-6 gap-2 py-6">
        <HeaderItemLayout title="Email">
          <Input value={userState.user_email} className="bg-white" disabled />
        </HeaderItemLayout>
        <HeaderItemLayout title="Enrollment Number">
          <Input value={userState.user_id} className="bg-white" disabled />
        </HeaderItemLayout>
        <HeaderItemLayout title="Passport ID">
          <Input value={userState.passport} className="bg-white" disabled />
        </HeaderItemLayout>
        <HeaderItemLayout title="First Name">
          <Input
            value={userState.first_name}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                first_name: "",
              }));
              updateLocalState("first_name", e.currentTarget.value);
            }}
          />
          {errors.first_name && (
            <p className="failure-color text-xs pt-1">{errors.first_name}</p>
          )}
        </HeaderItemLayout>
        <HeaderItemLayout title="Last Name">
          <Input
            value={userState.last_name}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                last_name: "",
              }));
              updateLocalState("last_name", e.currentTarget.value);
            }}
          />
          {errors.last_name && (
            <p className="failure-color text-xs pt-1">{errors.last_name}</p>
          )}
        </HeaderItemLayout>
        <HeaderItemLayout title="Address">
          <Input
            value={userState.address}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("address", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <HeaderItemLayout
          title="Date of Birth"
          containerClass="md:col-span-3"
          shortItem={true}
        >
          <DatePicker
            value={userState.dob ? new Date(userState.dob) : undefined}
            onChange={(value: string) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                dob: "",
              }));
              updateLocalState("dob", new Date(value));
            }}
            selectionType="year"
            fromDate={fromDate}
            toDate={toDate}
            className="w-[250px]"
          />
          {errors.dob && (
            <p className="failure-color text-xs pt-1">{errors.dob}</p>
          )}
        </HeaderItemLayout>
        <HeaderItemLayout
          title="Gender"
          containerClass="md:col-span-3"
          shortItem={true}
        >
          <Select
            value={userState.gender || ""}
            options={genders}
            optionsLabel="Select Property Status"
            showAllItem={false}
            handleSelect={(value) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                gender: "",
              }));
              updateLocalState("gender", value);
            }}
          />
          {errors.gender && (
            <p className="failure-color text-xs pt-1">{errors.gender}</p>
          )}
        </HeaderItemLayout>
        <HeaderItemLayout
          title="Country"
          containerClass="md:col-span-3"
          shortItem={true}
        >
          <CountriesDropdown
            value={userState.country || ""}
            options={allCountries}
            placeHoder="Select Country"
            optionsLabel="Select Your Country"
            showAllItem={false}
            handleSelect={(value: string) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                country: "",
              }));
              updateLocalState("country", value);
            }}
          />
          {errors.country && (
            <p className="failure-color text-xs pt-1">{errors.country}</p>
          )}
        </HeaderItemLayout>
        <HeaderItemLayout
          title="Mobile"
          containerClass="md:col-span-3"
          shortItem={true}
        >
          <PhoneInput
            inputClass="!w-[250px]"
            buttonClass="py-2"
            country={userState.phone?.countryCode}
            value={userState.phone?.number}
            onChange={(phone, country: CountryData) => {
              setErrors((erros: ProfileUpdateErrors) => ({
                ...erros,
                phone: "",
              }));
              updateLocalState("phone", {
                countryCode: country.countryCode,
                number: phone,
              });
            }}
            enableSearch={true}
            searchPlaceholder="Search"
            containerClass="phone-input-container"
          />
          {errors.phone && (
            <p className="failure-color text-xs pt-1">{errors.phone}</p>
          )}
        </HeaderItemLayout>
      </div>

      <div className="py-2">
        <SectionTitle title="Reservation Limits" />
      </div>
      <div className="w-full grid grid-cols-6 gap-2 py-6">
        <HeaderItemLayout title="Quota">
          <Input
            value={userState.total_quota}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("total_quota", e.currentTarget.value);
            }}
            type="number"
            disabled={!isAdmin}
          />
        </HeaderItemLayout>
        <HeaderItemLayout title="Used Reservations">
          <Input
            value={userState.used_quota}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("used_quota", e.currentTarget.value);
            }}
            type="number"
            disabled={!isAdmin}
          />
        </HeaderItemLayout>
      </div>
    </div>
  );
};

export default DetailsSection;
