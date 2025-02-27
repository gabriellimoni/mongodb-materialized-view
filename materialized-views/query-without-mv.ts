import { getMongoClient } from "../mongo";
import { pipeline } from "./pipeline";

const client = await getMongoClient();

console.time("Query sem MV");

const result = await client
  .db("demo_db")
  .collection("orders")
  .aggregate(pipeline)
  .toArray();

console.timeEnd("Query sem MV");
console.log(result.length);

process.exit();
