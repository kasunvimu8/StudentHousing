import React from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import { PropertyEquipmentType } from "@/types";
import { equipmentsConfig } from "@/constants";

const PropertyEquipment = async () => {
  return (
    <div className="pt-2">
      <SectionTitle title="Equipments and Facilities" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 grid-flow-row gap-4 md:gap-5 py-5">
        {equipmentsConfig.map((data: PropertyEquipmentType) => {
          return (
              <div className="text-sm primary-light-font-color" key={data.id}>
                {data.title}
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyEquipment;
