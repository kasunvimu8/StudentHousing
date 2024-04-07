import React from "react";
import dynamic from "next/dynamic";
import { getProperty } from "@/actions/properties";
import PropertyImage from "@/components/custom/property-detailed/PropertyImage";
import { Property } from "@/types";
import PropertySummary from "@/components/custom/property-detailed/PropertySummary";
import PropertyDetail from "@/components/custom/property-detailed/PropertyDetail";
import { Skeleton } from "@/components/ui/Skelton";
import PropertyCost from "@/components/custom/property-detailed/propertyCost";
import PropertyEquipment from "@/components/custom/property-detailed/PropertyEquipment";

const PropertyLocation = dynamic(
  () => import("@/components/custom/property-detailed/PropertyLocation"),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="h-[300px] sm:h-[350px] py-5 rounded-lg section-light-background-color" />
    ),
  }
);

const PropertyDeatailPage = async ({
  params,
}: {
  params: { propertyId: string };
}) => {
  const property: Property = await getProperty(params.propertyId);

  return (
    <div className="w-full h-full">
      <div className="p-2 rounded-lg mb-2 bg-white">
        <h1 className="text-xl md:text-2xl font-semibold text-center">
          {property?.title}
        </h1>
        <h3 className="text-sm md:text-base font-normal text-center">
          {property?.address}
        </h3>
      </div>
      <PropertyImage images={property.images} />
      <PropertySummary property={property} />
      <PropertyDetail property={property} />
      <PropertyLocation
        longitude={property?.longitude}
        latitude={property?.latitude}
      />
      <PropertyCost property={property} />
      <PropertyEquipment />

      <div className="mb-5 h-[100px]">Contract Documents</div>
      <div className="mb-5 h-[100px]">Additional Information</div>
    </div>
  );
};

export default PropertyDeatailPage;
