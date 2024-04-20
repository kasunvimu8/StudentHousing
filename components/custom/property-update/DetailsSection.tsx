"use client";

import React, { ReactNode } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import * as configs from "@/constants";
import { Input } from "@/components/ui/input";
import { BaseComponent as Select } from "@/components/ui/dropdown/BaseComponent";
import { BaseComponent as Calender } from "@/components/ui/calendar/BaseComponent";
import { PropertySectionProps } from "@/types";

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

const OtherItemLayout = ({
  children,
  title,
  AdditionalElement,
}: {
  title: string;
  AdditionalElement?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="col-span-6 lg:col-span-3 xl:col-span-2 pt-2">
      <div className="grid grid-cols-4 gap-2">
        <div className="text-sm font-normal primary-light-font-color col-span-1 flex items-center md:col-span-1">
          {title}
          {AdditionalElement}
        </div>
        <div className="text-sm font-normal col-span-4 md:col-span-3">
          {children}
        </div>
      </div>
    </div>
  );
};

const DetailsSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  return (
    <div className="pt-3">
      <SectionTitle title="Details" />
      <div className="w-full grid grid-cols-6 gap-2 py-5">
        <HeaderItemLayout title="Property Title">
          <Input
            value={propertyState.title}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("title", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <HeaderItemLayout title="Property Address">
          <Input
            value={propertyState.address}
            className="bg-white"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("address", e.currentTarget.value);
            }}
          />
        </HeaderItemLayout>
        <OtherItemLayout title="Property ID">
          <Input
            value={propertyState.property_id}
            className="bg-white max-w-[250px]"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("property_id", e.currentTarget.value);
            }}
          />
        </OtherItemLayout>
        <OtherItemLayout title="Room ID">
          <Input
            value={propertyState.room_id}
            className="bg-white max-w-[250px]"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("room_id", e.currentTarget.value);
            }}
          />
        </OtherItemLayout>
        <OtherItemLayout title="Furnishing">
          <Select
            value={propertyState.type}
            options={configs.furnishing}
            optionsLabel="Select Property Types"
            showAllItem={false}
            handleSelect={(value) => updateLocalState("furnishing", value)}
          />
        </OtherItemLayout>
        <OtherItemLayout title="Status">
          <Select
            value={propertyState.status}
            options={configs.propertyStatuses}
            optionsLabel="Select Property Status"
            showAllItem={false}
            handleSelect={(value) => updateLocalState("status", value)}
          />
        </OtherItemLayout>
        <OtherItemLayout title="Property Type">
          <Select
            value={propertyState.property_type}
            options={configs.propertyTypes}
            optionsLabel="Select Property Type"
            showAllItem={false}
            handleSelect={(value) => updateLocalState("property_type", value)}
          />
        </OtherItemLayout>
        <OtherItemLayout title="From Date">
          <Calender
            date={propertyState.from}
            handleSelect={(value) => updateLocalState("from", value)}
          />
        </OtherItemLayout>
        <OtherItemLayout title="To Date">
          <Calender
            date={propertyState.to}
            handleSelect={(value) => updateLocalState("to", value)}
          />
        </OtherItemLayout>
        <OtherItemLayout
          title="Size"
          AdditionalElement={
            <span className="px-1">
              (m<sup>2</sup>)
            </span>
          }
        >
          <Input
            value={propertyState.size}
            type="number"
            className="bg-white max-w-[250px]"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("size", e.currentTarget.value);
            }}
          />
        </OtherItemLayout>

        <OtherItemLayout title="Rooms">
          <Input
            value={propertyState.rooms}
            type="number"
            className="bg-white max-w-[250px]"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("rooms", e.currentTarget.value);
            }}
          />
        </OtherItemLayout>
        <OtherItemLayout title="Floor">
          <Input
            value={propertyState.floor}
            className="bg-white max-w-[250px]"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              updateLocalState("floor", e.currentTarget.value);
            }}
          />
        </OtherItemLayout>
      </div>
    </div>
  );
};

export default DetailsSection;
