import { getMongoClient } from "../mongo";
import { pipeline } from "./pipeline";

const client = await getMongoClient();

const pipelineWithoutSomeStages = pipeline.filter(
  (p) =>
    !Object.keys(p).includes("$limit") &&
    !Object.keys(p).includes("$sort") &&
    !Object.keys(p).includes("$match")
);

const pipelineWithMerge = [
  ...pipelineWithoutSomeStages,
  {
    $merge: {
      into: "_mv_orders",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
];

await client
  .db("demo_db")
  .collection("orders")
  .aggregate(pipelineWithMerge)
  .toArray();

console.log("Created materialized view");

process.exit();
