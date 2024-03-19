import { getProperties } from "@/actions/properties";
import { getReservations } from "@/actions/reservations";
import React from "react";

const PropertyList = async () => {
  const properties = await getProperties();
  console.log(" ----------",properties)
  return <div>PropertyList</div>;
};

export default PropertyList;
