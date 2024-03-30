import { getProperties, getProperyCount } from "@/actions/properties";
import React from "react";

import { numberOfPropertiesInPage } from "@/constants";
import PropertyPagination from "./PropertyPagination";
import PropertyItem from "./PropertyItem";
import { Property } from "@/types";

const PropertyList = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  let totalProperties: number = 0;
  let properties: any = [];

  const data = getProperties(numberOfPropertiesInPage, page);
  const count = getProperyCount();
  const [total, propertiesData] = await Promise.all([count, data]);

  properties = JSON.parse(JSON.stringify(propertiesData));
  totalProperties = total;
  return (
    <>
      <h1> Property List Page</h1>
      <PropertyPagination
        totalPages={Math.ceil(totalProperties / numberOfPropertiesInPage)}
      >
        {properties.length > 0 &&
          properties.map((property: Property) => {
            return <PropertyItem key={property._id} property={property} />;
          })}
      </PropertyPagination>
    </>
  );
};

export default PropertyList;
