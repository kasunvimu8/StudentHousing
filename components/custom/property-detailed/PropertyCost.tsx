import SectionTitle from "@/components/shared/SectionTitle";
import TooltipComponent from "@/components/ui/tooltip/tooltip";
import { propertyToolTips } from "@/constants";
import { Property } from "@/types";
import React from "react";
import { LuEuro, LuInfo } from "react-icons/lu";

const PropertyCost = ({ property }: { property: Property }) => {
  return (
    <div className="pt-4">
      <SectionTitle title="Cost" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        <div className="col-span-1">
          <div className="grid grid-rows-3 gap-4">
            <div className="grid grid-cols-2">
              <div className="text-sm primary-light-font-color">Cold Rent</div>
              <div className="text-base flex items-center">
                <span className="self-center">
                  {property?.cold_rent || "-"}
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="text-sm primary-light-font-color">
                Incidental Costs
              </div>
              <div className="text-base flex items-center">
                <span className="self-center">
                  {property?.incidential_cost || "-"}
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                <span>Warm Rent</span>
                <TooltipComponent content={propertyToolTips.warm}>
                  <LuInfo className="ml-2 text-lg self-center" />
                </TooltipComponent>
              </div>
              <div className="text-base flex items-center">
                <span className="self-center">
                  {property?.warm_rent || "-"}
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-2 gap-3">
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                <span>One Time Cost</span>
                <TooltipComponent content={propertyToolTips.onetimeCost}>
                  <LuInfo className="ml-2 text-lg self-center" />
                </TooltipComponent>
              </div>
              <div className="text-base flex items-center">
                <span className="self-center">
                  {property?.one_time_cost || "-"}
                </span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center text-sm primary-light-font-color">
                <span>Deposit</span>
                <TooltipComponent content={propertyToolTips.deposit}>
                  <LuInfo className="ml-2 text-lg self-center" />
                </TooltipComponent>
              </div>
              <div className="text-base flex items-center">
                <span className="self-center">{property?.deposit || "-"}</span>
                <LuEuro className="ml-1 text-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCost;
