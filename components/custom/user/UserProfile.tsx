"use client";

import React, { ReactNode } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { Input } from "@/components/ui/input";
import { userDetailsCompProps } from "@/types";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
import { genders } from "@/constants";

const HeaderItemLayout = ({
  children,
  title,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="col-span-6">
      <div className="grid grid-cols-6 gap-2">
        <div className="text-sm font-normal primary-light-font-color col-span-6 md:col-span-1 flex items-center">
          {title}
        </div>
        <div className="text-sm font-normal col-span-6 md:col-span-5">
          {children}
        </div>
      </div>
    </div>
  );
};

const DetailsSection: React.FC<userDetailsCompProps> = ({
  userState,
  updateLocalState,
  isAdmin,
}) => {
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
        {/* <HeaderItemLayout title="Enrollment ID">
          <Input
            value={userState.enrollment_id}
            className="bg-white"
            disabled
          />
        </HeaderItemLayout> */}
        <HeaderItemLayout title="Name">
          <Input
            value={userState.user_name}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("user_name", e.currentTarget.value);
            }}
          />
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
        <HeaderItemLayout title="Country">
          <Input
            value={userState.country}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("country", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <HeaderItemLayout title="NIC or Passport ID">
          <Input
            value={userState.nationalId}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("nationalId", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <HeaderItemLayout title="Mobile">
          <Input
            value={userState.mobile}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("mobile", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <HeaderItemLayout title="Gender">
          <Select
            value={userState.gender || ""}
            options={genders}
            optionsLabel="Select Property Status"
            showAllItem={false}
            handleSelect={(value) => updateLocalState("gender", value)}
          />
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
