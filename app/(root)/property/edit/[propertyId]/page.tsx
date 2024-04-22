import { getProperty, updateProperty } from "@/actions/properties";
import UpdatePropertyDetail from "@/components/custom/property-update/UpdatePropertyDetail";
import PageTitle from "@/components/shared/PageTitle";
import { Property } from "@/types";
import React from "react";

const page = async ({ params }: { params: { propertyId: string } }) => {
  const property: Property = await getProperty(params.propertyId);
  return (
    <div className="h-full w-full">
      <div className="flex flex-start">
        <PageTitle title={`Update Property - ${property?.property_id}`} />
      </div>
      <div className="py-5">
        <UpdatePropertyDetail
          property={property}
          updatePropertyAction={updateProperty}
        />
      </div>
    </div>
  );
};

export default page;
