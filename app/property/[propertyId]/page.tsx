import React from "react";

const PropertyDeatailPage = ({
  params,
}: {
  params: { propertyId: string };
}) => {
  return <div>Property page {params.propertyId}</div>;
};

export default PropertyDeatailPage;
