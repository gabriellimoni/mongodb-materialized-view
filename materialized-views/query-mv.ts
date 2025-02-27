import { getMongoClient } from "../mongo";
import { mvPipeline } from "./pipeline";

const client = await getMongoClient();

console.time("Query com MV");

const result = await client
  .db("demo_db")
  .collection("_mv_orders")
  .aggregate(mvPipeline)
  .toArray();

console.timeEnd("Query com MV");
console.log(result.length);

process.exit();
