import { getProperty, updateProperty } from "@/actions/properties";
import UpdatePropertyDetail from "@/components/custom/property-update/UpdatePropertyDetail";
import NoDataNotFoundPage from "@/components/shared/NotFoundPage";
import PageTitle from "@/components/shared/PageTitle";
import { Property } from "@/types";
import React from "react";

const page = async ({ params }: { params: { propertyId: string } }) => {
  const property: Property = await getProperty(params.propertyId);

  const imagesURL =
    property?.images?.length > 0
      ? property.images
          .filter((img: string) => !!img)
          .map((image: string) => `${process.env.BASE_URL}/api/file/${image}`)
      : [];

  const documentsURL =
    property?.documents?.length > 0
      ? property.documents
          .filter((doc: string) => !!doc)
          .map((doc: string) => `${process.env.BASE_URL}/api/file/${doc}`)
      : [];

  return (
    <div className="h-full w-full">
      {property && property._id ? (
        <div className="h-full w-full">
          <div className="flex flex-start">
            <PageTitle title={`Update Property - ${property?.property_id}`} />
          </div>
          <div className="py-5">
            <UpdatePropertyDetail
              property={property}
              updatePropertyAction={updateProperty}
              imagesURL={imagesURL}
              documentsURL={documentsURL}
            />
          </div>
        </div>
      ) : (
        <NoDataNotFoundPage />
      )}
    </div>
  );
};

export default page;
