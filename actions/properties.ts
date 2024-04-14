"use server";

import { availableStatus } from "@/constants";
import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";
import { FilterParamTypes, SortOption } from "@/types";

function getFilterOptions(options: FilterParamTypes) {
  let filterCriterions: any = [];

  Object.keys(options).forEach((key) => {
    if (key === "city" && options[key] !== "all") {
      filterCriterions.push({ city: options[key] });
    } else if (key === "property_type" && options[key] !== "all") {
      filterCriterions.push({ property_type: options[key] });
    } else if (key === "from" && options[key] && options[key] !== "all") {
      filterCriterions.push({
        from: {
          $gte: new Date(options[key]),
        },
      });
    } else if (key === "rooms" && options[key] !== "all") {
      const value = options?.[key] ? parseFloat(options?.[key]) : 0;
      filterCriterions.push({ rooms: { $gte: value } });
    } else if (key === "size") {
      const values = options?.[key]?.split(",");
      if (values?.length === 2) {
        filterCriterions.push({
          size: { $gte: parseInt(values[0]), $lte: parseInt(values[1]) },
        });
      }
    } else if (key === "rent") {
      const values = options?.[key]?.split(",");
      if (values?.length === 2) {
        filterCriterions.push({
          rent: { $gte: parseInt(values[0]), $lte: parseInt(values[1]) },
        });
      }
    }
  });
  return filterCriterions;
}

export async function getProperyCount(
  filterParams: FilterParamTypes,
  statusType?: string
) {
  try {
    await connectToDatabase();
    const statusFilter =
      statusType === "available" ? [{ status: availableStatus }] : [];
    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    let matchOptions =
      filterOptions.length > 0
        ? [...statusFilter, ...filterOptions]
        : statusFilter;
    return await Property.countDocuments(
      matchOptions.length > 0 ? { $and: matchOptions } : {}
    );
  } catch (error) {
    console.log(error);
    // throw new Error("Failed   to fetch properties count");
  }
}

export async function getProperties(
  numberOfDocsInPage: number,
  currentPage: number,
  sortOption: SortOption,
  filterParams: FilterParamTypes,
  statusType?: string
) {
  try {
    await connectToDatabase();

    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    const statusFilter =
      statusType === "available" ? [{ status: availableStatus }] : [];
    let matchOptions =
      filterOptions.length > 0
        ? [...statusFilter, ...filterOptions]
        : statusFilter;

    const properties = await Property.aggregate([
      {
        $addFields: {
          rent: {
            $cond: [{ $gt: ["$warm_rent", 0] }, "$warm_rent", "$cold_rent"],
          },
        },
      },
      {
        $match: matchOptions.length > 0 ? { $and: matchOptions } : {},
      },
      { $sort: sortOption },
      { $skip: numberOfDocsInPage * (currentPage - 1) },
      { $limit: numberOfDocsInPage },
    ]);

    return properties;
  } catch (error) {
    throw new Error("Failed to fetch properties.");
  }
}

export async function getAllAvailableProperties(
  filterParams: FilterParamTypes
) {
  try {
    await connectToDatabase();
    const statusFilter = { status: availableStatus };
    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    let matchOptions =
      filterOptions.length > 0
        ? [statusFilter, ...filterOptions]
        : [statusFilter];

    return await Property.find(
      { $and: matchOptions },
      {
        longitude: 1,
        latitude: 1,
        title: 1,
        address: 1,
        property_id: 1,
      }
    );
  } catch (error) {
    throw new Error("Failed to fetch all properties.");
  }
}

export async function getProperty(propertyId: string) {
  try {
    await connectToDatabase();

    const data = await Property.find({ property_id: propertyId });
    const property = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};

    return property;
  } catch (error) {
    throw new Error("Failed to fetch all properties.");
  }
}
