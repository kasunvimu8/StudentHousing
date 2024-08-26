import { cn } from "@/lib/utils";
import { Property } from "@/types";
import { formatDistanceToNow } from "date-fns";
import React, { useState } from "react";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const WaitingProperties = ({ properties }: { properties: Property[] }) => {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      {properties.map((item) => (
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
            <div className="text-xs font-medium">{item.title}</div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default WaitingProperties;
