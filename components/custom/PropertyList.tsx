import React from "react";
import { numberOfPropertiesInPage } from "@/constants";
import PropertyPagination from "./PropertyPagination";
import PropertyItem from "./PropertyItem";
import { Property } from "@/types";
import { getProperties, getProperyCount } from "@/actions/properties";

const PropertyList = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  let totalProperties: number = 0;
  let properties: Property[] = [];

  const data = getProperties(numberOfPropertiesInPage, page);
  const count = getProperyCount();
  const [total, propertiesData] = await Promise.all([count, data]);

  properties = JSON.parse(JSON.stringify(propertiesData));
  totalProperties = total;

  return (
    <React.Fragment>
      <PropertyPagination
        totalPages={Math.ceil(totalProperties / numberOfPropertiesInPage)}
        currentPage={page}
      >
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 2xl:grid-cols-4">
            {properties.length > 0 &&
              properties.map((property: Property) => {
                return (
                  <li key={property._id} className="flex justify-center">
                    <PropertyItem key={property._id} property={property} />
                  </li>
                );
              })}
          </ul>
        </div>
      </PropertyPagination>
    </React.Fragment>
  );
};

export default PropertyList;
