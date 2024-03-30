"use server";

import { connectToDatabase } from "@/database";
import Property from "@/database/models/property.model";

export async function getProperyCount() {
  await connectToDatabase();

  return await Property.countDocuments();
}

export async function getProperties(
  numberOfDocsInPage: number,
  currentPage: number
) {
  await connectToDatabase();

  const properties = await Property.find({})
    .skip(numberOfDocsInPage * (currentPage - 1))
    .limit(numberOfDocsInPage);
  return properties;
}
