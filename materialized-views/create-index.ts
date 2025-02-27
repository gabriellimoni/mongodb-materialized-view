import { getMongoClient } from "../mongo";

const client = await getMongoClient();

await client.db("demo_db").collection("_mv_orders").createIndex({
  totalInCents: -1,
});

console.log("Created totalInCents index");

process.exit();
