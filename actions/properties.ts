"use server";

import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";

export async function getProperyCount() {
  try {
    await connectToDatabase();

    return await Property.countDocuments();
  } catch (error) {
    throw new Error("Failed to fetch properties count");
  }
}

export async function getProperties(
  numberOfDocsInPage: number,
  currentPage: number
) {
  try {
    await connectToDatabase();

    const properties = await Property.find({})
      .skip(numberOfDocsInPage * (currentPage - 1))
      .limit(numberOfDocsInPage);
    return properties;
  } catch (error) {
    throw new Error("Failed to fetch properties.");
  }
}

export async function getAllProperties() {
  try {
    await connectToDatabase();
    return await Property.find({});
  } catch (error) {
    throw new Error("Failed to fetch all properties.");
  }
}
