"use client";

import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { PropertyEquipmentType } from "@/types";
import { equipmentsConfig } from "@/constants";
import { getIconFromKey } from "@/lib/icons";

const EquipmentSection = ({
  equipments,
  updateLocalState,
}: {
  equipments: string[];
  updateLocalState: (key: string, value: any) => void;
}) => {
  const isItemAvailable = (item: string) =>
    equipments?.find((equipment: string) => equipment === item);

  const updateState = (keyId: string) => {
    const exists = isItemAvailable(keyId);

    if (!exists) {
      // add the item
      updateLocalState("equipments", [...equipments, keyId]);
    } else {
      //remove the item
      updateLocalState(
        "equipments",
        equipments?.filter((equipment) => equipment !== keyId)
      );
    }
  };

  return (
    <div className="pt-5">
      <SectionTitle title="Equipments and Facilities" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-3 md:gap-5 py-6">
        {equipmentsConfig.map((data: PropertyEquipmentType) => {
          const Icon = getIconFromKey(data.icon);

          return (
            <div
              className={`text-sm  flex align-middle gap-2 cursor-pointer ${
                isItemAvailable(data.id)
                  ? "hightlight-font-color font-medium"
                  : "primary-disable-font-color"
              }`}
              key={data.id}
              onClick={(e) => updateState(data.id)}
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

export default EquipmentSection;
