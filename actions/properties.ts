"use server";

import { availableStatus } from "@/constants";
import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";
import {
  FilterParamTypes,
  SortOption,
  Property as PropertyData,
  PropertyDeafultType,
} from "@/types";
import { getReservationExist, getReservationStatus } from "./reservations";
import { revalidatePath } from "next/cache";

function getFilterOptions(options: FilterParamTypes) {
  let filterCriterions: any = [];

  Object.keys(options).forEach((key) => {
    const optionKey = options[key as keyof FilterParamTypes];
    if (optionKey) {
      if (key === "city" && optionKey !== "all") {
        filterCriterions.push({ city: optionKey });
      } else if (key === "property_type" && optionKey !== "all") {
        filterCriterions.push({ property_type: optionKey });
      } else if (key === "from" && optionKey && optionKey !== "all") {
        filterCriterions.push({
          from: {
            $gte: new Date(optionKey),
          },
        });
      } else if (key === "rooms" && optionKey !== "all") {
        const value = optionKey ? parseFloat(optionKey) : 0;
        filterCriterions.push({ rooms: { $gte: value } });
      } else if (key === "size") {
        const values = optionKey?.split(",");
        if (values?.length === 2) {
          filterCriterions.push({
            size: { $gte: parseInt(values[0]), $lte: parseInt(values[1]) },
          });
        }
      } else if (key === "rent") {
        const values = optionKey?.split(",");
        if (values?.length === 2) {
          filterCriterions.push({
            rent: { $gte: parseInt(values[0]), $lte: parseInt(values[1]) },
          });
        }
      } else if (key === "property_id" && optionKey) {
        filterCriterions.push({
          property_id: {
            $regex: optionKey,
            $options: "i",
          },
        });
      } else if (key === "room_id" && optionKey) {
        filterCriterions.push({
          room_id: {
            $regex: optionKey,
            $options: "i",
          },
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
    console.log("Failed to fetch properties count", error);
    return 0;
  }
}

export async function getProperties(
  numberOfDocsInPage: number,
  currentPage: number,
  sortOption: SortOption,
  filterParams: FilterParamTypes,
  statusType: string
) {
  try {
    await connectToDatabase();

    const filterOptions: SortOption[] = getFilterOptions(filterParams);
    const statusFilter = statusType === "all" ? [] : [{ status: statusType }];
    let matchOptions =
      filterOptions.length > 0
        ? [...statusFilter, ...filterOptions]
        : statusFilter;
    let query: any = [
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
    ];

    if (numberOfDocsInPage >= 1) {
      query.push({ $skip: numberOfDocsInPage * (currentPage - 1) });
      query.push({ $limit: numberOfDocsInPage });
    }

    const properties = await Property.aggregate(query);
    return properties;
  } catch (error) {
    console.log("Failed to fetch properties.", error);
    return [];
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
        _id: 1,
      }
    );
  } catch (error) {
    console.log("Failed to fetch all properties.", error);
    return [];
  }
}

export async function getProperty(propertyId: string) {
  try {
    await connectToDatabase();

    const data = await Property.find({ _id: propertyId });
    const property = data.length > 0 ? JSON.parse(JSON.stringify(data[0])) : {};

    return property;
  } catch (error) {
    console.log("Failed to fetch property", error);
    return undefined;
  }
}

export async function deleteProperty(_id: string) {
  try {
    await connectToDatabase();

    const isReservationExist = await getReservationExist(_id);
    if (isReservationExist) {
      return {
        msg: "Reservaton exists! Please remove the property-related reservation before deleting the property.",
        type: "error",
      };
    } else {
      await Property.deleteOne({ _id: _id });
      revalidatePath("/", "layout");

      return {
        msg: "Property Deleted Successfully !",
        type: "ok",
      };
    }
  } catch (error) {
    console.log("Failed to delete a property.", error);
    return {
      msg: "Internal Server Error. Cannot delete property!",
      type: "error",
    };
  }
}

export async function updateProperty(property: PropertyData) {
  try {
    await connectToDatabase();

    const reservationStatus = await getReservationStatus(property._id);
    if (reservationStatus === "rented") {
      return {
        msg: "Cannot update property details for a rented property!",
        type: "error",
      };
    } else {
      await Property.updateOne({ _id: property._id }, { $set: property });
      revalidatePath("/", "layout");

      return {
        msg: "Property Updated Successfully !",
        type: "ok",
      };
    }
  } catch (error) {
    console.log("Failed to update property.", error);
    return {
      msg: "Internal Server Error. Cannot update property details property!",
      type: "error",
    };
  }
}

export async function createPropertyAction(property: PropertyDeafultType) {
  try {
    await connectToDatabase();

    await Property.create({ ...property });
    revalidatePath("/", "layout");
    return {
      msg: "Property Created Successfully !",
      type: "ok",
    };
  } catch (error) {
    console.log("Failed to create property.", error);
    return {
      msg: "Internal Server Error. Cannot create property!",
      type: "error",
    };
  }
}

export async function getUniquesPropertyIds() {
  try {
    await connectToDatabase();

    return await Property.aggregate([
      {
        $group: {
          _id: "$property_id",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$doc",
        },
      },
      {
        $project: {
          _id: 1,
          property_id: 1,
        },
      },
    ]);
  } catch (error) {
    console.log("Failed to fetch all properties.", error);
    return [];
  }
}
