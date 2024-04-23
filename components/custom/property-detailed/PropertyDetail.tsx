import SectionTitle from "@/components/shared/SectionTitle";
import * as configs from "@/constants";
import { formatDateTime, getDropdownDescription } from "@/lib/utils";
import { Property, PropertyDetailsType } from "@/types";
import React from "react";

const PropertyDetail = ({ property }: { property: Property }) => {
  return (
    <div className="pt-4 md:pt-0 relative md:-top-5">
      <SectionTitle title="Details" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3 md:gap-5 py-5">
        {property &&
          configs.propertyDetailConfig.map((data: PropertyDetailsType) => {
            const isDate = data.inputType === "date";
            const isDropdown = data.inputType === "dropdown";
            const isArea = data.id === "size";

            const value = property[data.id as keyof typeof property];
            const displayValue = value
              ? isDate
                ? formatDateTime(new Date(String(value))).simpleDate
                : value
              : "-";

            return (
              <div className="col-span-1" key={data.id}>
                <div className="grid grid-cols-2">
                  <div className="text-sm font-normal primary-light-font-color">
                    {data.title}
                    {isArea && (
                      <span>
                        (m<sup>2</sup>)
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-normal">
                    {isDropdown
                      ? getDropdownDescription(data.optionId, String(value))
                      : displayValue}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PropertyDetail;
