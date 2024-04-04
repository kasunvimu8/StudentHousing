import React from "react";
import { getAllProperties } from "@/actions/properties";
import PropertyMap from "./PropertyMap";
import { FilterParamTypes } from "@/types";

const PropertyMapParent = async ({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) => {
  const data = await getAllProperties(searchParams);
  const properties = JSON.parse(JSON.stringify(data));

  return <PropertyMap properties={properties} />;
};

export default PropertyMapParent;
