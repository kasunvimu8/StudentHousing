import React from "react";
import PageTitle from "@/components/shared/PageTitle";
import { getUniquesPropertyIds } from "@/actions/properties";
import PropertyCreate from "@/components/custom/property-create/PropertyCreate";

const page = async () => {
  const data = await getUniquesPropertyIds();
  const properties = JSON.parse(JSON.stringify(data));

  const clonePropertyDataOptions = properties.map(
    (property: { _id: string; property_id: string }) => ({
      id: property._id,
      label: property.property_id,
      value: property.property_id,
    })
  );

  return (
    <div className="h-full w-full">
      <PropertyCreate clonePropertyDataOptions={clonePropertyDataOptions}>
        <div className="col-span-2 md:col-span-1">
          <PageTitle title="Create Property" />
        </div>
      </PropertyCreate>
    </div>
  );
};

export default page;
