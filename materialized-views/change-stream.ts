import type { ObjectId } from "mongodb";
import { getMongoClient } from "../mongo";
import { pipelineWithMerge } from "./pipeline";

const client = await getMongoClient();

const pipelineMatchingDoc = (docId: ObjectId) => [
  {
    $match: {
      _id: docId,
    },
  },
  ...pipelineWithMerge,
];

client
  .db("demo_db")
  .collection("orders")
  .watch()
  .addListener("change", async (event) => {
    if (event.operationType == "update" || event.operationType === "insert") {
      await client
        .db("demo_db")
        .collection("orders")
        .aggregate(pipelineMatchingDoc(event.documentKey._id))
        .toArray();
      console.log(event.operationType, "document", event.documentKey._id);
    }
  });
