import React from "react";

const page = ({ params }: { params: { propertyId: string } }) => {
  return <div>Edit Property Page {params.propertyId}</div>;
};

export default page;
