import React from "react";
import { numberOfPropertiesInPage } from "@/constants";
import PropertyItem from "./PropertyItem";
import { FilterParamTypes, Property, SortOption } from "@/types";
import { getProperties, getProperyCount } from "@/actions/properties";
import PaginationComponent from "@/components/ui/pagination/PaginationComponent";

const PropertyList = async ({
  searchParams,
}: {
  searchParams: FilterParamTypes;
}) => {
  let totalProperties: number = 0;
  let properties: Property[] = [];

  const sort = searchParams.sort;
  const page = searchParams?.page ? Number(searchParams.page) : 1;

  const sortOption: SortOption =
    sort === "lowest"
      ? { rent: 1 }
      : sort === "highest"
      ? { rent: -1 }
      : { created_at: -1 };

  const data = getProperties(
    numberOfPropertiesInPage,
    page,
    sortOption,
    searchParams,
    "available"
  );
  const count = getProperyCount(searchParams, "available");
  const [total, propertiesData] = await Promise.all([count, data]);

  properties = JSON.parse(JSON.stringify(propertiesData));
  totalProperties = total;

  return (
    <React.Fragment>
      <PaginationComponent
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
      </PaginationComponent>
    </React.Fragment>
  );
};

export default PropertyList;
