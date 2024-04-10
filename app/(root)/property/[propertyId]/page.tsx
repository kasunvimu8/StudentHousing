import React from "react";
import { getProperty } from "@/actions/properties";

const PropertyDeatailPage = async ({
  params,
}: {
  params: { propertyId: string };
}) => {
  const data = await getProperty(params.propertyId)

  return <div>Property page {params.propertyId}</div>;
};

export default PropertyDeatailPage;
