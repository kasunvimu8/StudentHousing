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

export async function getProperyCount(filterParams: FilterParamTypes) {
  try {
    await connectToDatabase();
    const statusFilter = { status: availableStatus };
    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    let matchOptions =
      filterOptions.length > 0
        ? [statusFilter, ...filterOptions]
        : [statusFilter];

    return await Property.countDocuments({ $and: matchOptions });
  } catch (error) {
    throw new Error("Failed to fetch properties count");
  }
}

export async function getProperties(
  numberOfDocsInPage: number,
  currentPage: number,
  sort: string | undefined,
  filterParams: FilterParamTypes
) {
  try {
    await connectToDatabase();

    const sortOption: SortOption =
      sort === "lowest"
        ? { rent: 1 }
        : sort === "highest"
        ? { rent: -1 }
        : { created_at: -1 };
    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    const statusFilter = { status: availableStatus };
    let matchOptions =
      filterOptions.length > 0
        ? [statusFilter, ...filterOptions]
        : [statusFilter];

    const properties = await Property.aggregate([
      {
        $addFields: {
          rent: {
            $cond: [{ $gt: ["$warm_rent", 0] }, "$warm_rent", "$cold_rent"],
          },
        },
      },
      {
        $match: {
          $and: matchOptions,
        },
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

export async function getAllProperties(filterParams: FilterParamTypes) {
  try {
    await connectToDatabase();
    const statusFilter = { status: availableStatus };
    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    let matchOptions =
      filterOptions.length > 0
        ? [statusFilter, ...filterOptions]
        : [statusFilter];

    return await Property.find({ $and: matchOptions });
  } catch (error) {
    throw new Error("Failed to fetch all properties.");
  }
}
