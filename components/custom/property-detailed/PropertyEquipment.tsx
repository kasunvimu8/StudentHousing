import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { PropertyEquipmentType } from "@/types";
import { equipmentsConfig } from "@/constants";
import { getIconFromKey } from "@/lib/icons";

const PropertyEquipment = async ({ equipments }: { equipments: string[] }) => {
  const isItemAvailable = (item: string) =>
    equipments?.find((equipment: string) => equipment === item);

  return (
    <div className="pt-5">
      <SectionTitle title="Equipments and Facilities" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-3 md:gap-5 py-6">
        {equipmentsConfig.map((data: PropertyEquipmentType) => {
          const Icon = getIconFromKey(data.icon);
          return (
            <div
              className={`text-sm  flex align-middle gap-2 ${
                isItemAvailable(data.id)
                  ? "hightlight-font-color font-medium"
                  : "primary-disable-font-color"
              }`}
              key={data.id}
            >
              <Icon className="text-xl self-center" />
              <div className="self-center">{data.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyEquipment;
