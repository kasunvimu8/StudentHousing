import React from "react";
import dynamic from "next/dynamic";
import { getProperty } from "@/actions/properties";
import PropertyImage from "@/components/custom/property-detailed/PropertyImage";
import { Property } from "@/types";
import PropertySummary from "@/components/custom/property-detailed/PropertySummary";
import PropertyDetail from "@/components/custom/property-detailed/PropertyDetail";
import { Skeleton } from "@/components/ui/Skelton";
import PropertyEquipment from "@/components/custom/property-detailed/PropertyEquipment";
import PropertyCost from "@/components/custom/property-detailed/PropertyCost";
import PropertyDocuments from "@/components/custom/property-detailed/PropertyDocuments";
import PropertyAdditionalInformation from "@/components/custom/property-detailed/PropertyAdditionalInformation";
import PropertyReserve from "@/components/custom/property-detailed/PropertyReseve";
import NoDataNotFoundPage from "@/components/shared/NotFoundPage";

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
      {property && property._id ? (
        <div className="w-full h-full">
          <div className="p-2 rounded-lg mb-2 bg-white">
            <h1 className="text-xl md:text-2xl font-semibold text-center">
              {property?.title} - {property?.property_id}
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
          <PropertyEquipment equipments={property.equipments} />
          <PropertyDocuments documents={property.documents} />
          <PropertyAdditionalInformation
            additional_information={property.additional_information}
          />
          <PropertyReserve />
        </div>
      ) : (
        <NoDataNotFoundPage />
      )}
    </div>
  );
};

export default PropertyDeatailPage;
