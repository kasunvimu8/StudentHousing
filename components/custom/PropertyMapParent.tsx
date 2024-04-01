import React from "react";
import { getAllProperties } from "@/actions/properties";
import PropertyMap from "./PropertyMap";

const PropertyMapParent = async () => {
  const data = await getAllProperties();
  const properties = JSON.parse(JSON.stringify(data));

  return <PropertyMap properties={properties} />;
};

export default PropertyMapParent;
