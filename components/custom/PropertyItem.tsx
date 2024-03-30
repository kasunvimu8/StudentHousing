import { Property } from "@/types";
import React from "react";

const PropertyItem = ({ property }: { property: Property }) => {
  return <div>PropertyItem {property._id} </div>;
};

export default PropertyItem;
