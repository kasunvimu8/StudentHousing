import React from "react";
import { getProperty } from "@/actions/properties";
import PropertyImage from "@/components/custom/property-detailed/PropertyImage";
import { Property } from "@/types";
import PropertySummary from "@/components/custom/property-detailed/PropertySummary";
import PropertyDetail from "@/components/custom/property-detailed/PropertyDetail";
import SectionTitle from "@/components/shared/SectionTitle";
import PropertyLocation from "@/components/custom/property-detailed/PropertyLocation";

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
      <PropertyLocation />

      <div className="mb-5 h-[100px]">Map</div>
      <div className="mb-5 h-[100px]">Detailed Information</div>
      <div className="mb-5 h-[100px]">Cost</div>
      <div className="mb-5 h-[100px]">Equipment</div>
      <div className="mb-5 h-[100px]">Contract Documents</div>
    </div>
  );
};

export default PropertyDeatailPage;
