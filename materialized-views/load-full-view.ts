import { getMongoClient } from "../mongo";
import { pipelineWithMerge } from "./pipeline";

const client = await getMongoClient();

await client
  .db("demo_db")
  .collection("orders")
  .aggregate(pipelineWithMerge)
  .toArray();

console.log("Created materialized view");

process.exit();
