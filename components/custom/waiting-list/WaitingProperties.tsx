import { propertyTypes } from "@/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Property } from "@/types";
import React from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const WaitingProperties = ({
  properties,
  selectedProperty,
  setSelectedProperty,
}: {
  properties: Property[];
  selectedProperty: Property;
  setSelectedProperty: React.Dispatch<React.SetStateAction<Property>>;
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {properties.length > 0 ? (
        <>
          {properties.map((item) => {
            const aprtmentTpe =
              item.property_type === "all"
                ? "All Types"
                : propertyTypes.find((type) => type.id === item.property_type)
                    ?.description;

            return (
              <button
                key={item._id}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:section-background-color",
                  selectedProperty._id === item._id && "bg-gray-100"
                )}
                onClick={() => setSelectedProperty(item)}
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">
                        Property Id : {item.property_id}
                      </div>
                      <span
                        className={cn(
                          "flex h-2 w-2 rounded-full ",
                          item.status === "available"
                            ? "bg-green-600"
                            : "bg-yellow-300"
                        )}
                      />
                      <span className="text-xs capitalize">{item.status}</span>
                    </div>
                    <div className="ml-auto text-xs">
                      <BsBoxArrowInUpRight
                        className="h-4 w-4"
                        onClick={() =>
                          window.open(
                            `${window.location.origin}/property/view/${item._id}`,
                            "_blank"
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="w-full grid grid-cols-2 gap-2 py-2">
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Apartment Type
                      </div>
                      <div className="text-sm primary-font-color">
                        {aprtmentTpe}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        Rent
                      </div>
                      <div className="text-sm primary-font-color">
                        {item.warm_rent} €
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        From Date
                      </div>
                      <div className="text-sm primary-font-color">
                        {formatDateTime(item.from).simpleDate}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="primary-light-font-color text-xs">
                        To Date
                      </div>
                      <div className="text-sm primary-font-color">
                        {item.to
                          ? formatDateTime(item.to).simpleDate
                          : "Unlimited"}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </>
      ) : (
        <div className="text-sm font-normal text-center">
          No properties found
        </div>
      )}
    </div>
  );
};

export default WaitingProperties;
