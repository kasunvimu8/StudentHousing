import { connectToDatabase } from "@/database";
import Test from "@/database/models/property.model";

export async function getProperties() {
  await connectToDatabase();
  
  const test = await Test.find({});
  console.log(test);

}
