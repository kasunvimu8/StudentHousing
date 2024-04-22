"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Input } from "@/components/ui/input";
import { PropertySectionProps } from "@/types";
import React from "react";
import { LuEuro } from "react-icons/lu";

const CostSection: React.FC<PropertySectionProps> = ({
  propertyState,
  updateLocalState,
}) => {
  return (
    <div className="pt-3">
      <SectionTitle title="Cost" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        <div className="col-span-1">
          <div className="grid grid-rows-3 gap-3 md:gap-5">
            <div className="grid grid-cols-2">
              <div className="text-sm primary-light-font-color">Cold Rent</div>
              <div className="text-sm flex items-center">
                <span className="self-center">
                  <Input
                    value={propertyState?.cold_rent || ""}
                    type="number"
                    className="bg-white max-w-[250px]"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      updateLocalState("cold_rent", e.currentTarget.value);
                    }}
                  />
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-sm primary-light-font-color">
                Incidental Costs
              </div>
              <div className="text-sm flex items-center">
                <span className="self-center">
                  <Input
                    value={propertyState?.incidential_cost || ""}
                    type="number"
                    className="bg-white max-w-[250px]"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      updateLocalState(
                        "incidential_cost",
                        e.currentTarget.value
                      );
                    }}
                  />
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                Warm Rent <span className="hightlight-font-color pl-1">*</span>
              </div>
              <div className="text-sm flex items-center">
                <span className="self-center">
                  <Input
                    value={propertyState?.warm_rent || ""}
                    type="number"
                    className="bg-white max-w-[250px]"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      updateLocalState("warm_rent", parseInt(e.currentTarget.value));
                    }}
                  />
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2 gap-3 md:gap-5">
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                <span className="text-sm">One Time Cost</span>
              </div>
              <div className="text-sm flex items-center">
                <span className="self-center">
                  <Input
                    value={propertyState?.one_time_cost || ""}
                    type="number"
                    className="bg-white max-w-[250px]"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      updateLocalState("one_time_cost", e.currentTarget.value);
                    }}
                  />
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                <span>Deposit</span>
              </div>
              <div className="text-sm flex items-center">
                <span className="self-center">
                  <Input
                    value={propertyState?.deposit || ""}
                    type="number"
                    className="bg-white max-w-[250px]"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                      updateLocalState("deposit", e.currentTarget.value);
                    }}
                  />
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostSection;
