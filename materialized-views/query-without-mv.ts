import { getMongoClient } from "../mongo";

const pipeline = [
  {
    $addFields: {
      totalInCents: {
        $sum: "$items.valueInCents",
      },
    },
  },
  {
    $addFields: {
      status: {
        $switch: {
          branches: [
            {
              case: {
                $gt: ["$canceledAt", null],
              },
              then: "canceled",
            },
            {
              case: {
                $gt: ["$paidAt", null],
              },
              then: "paid",
            },
          ],
          default: "open",
        },
      },
    },
  },
  {
    $match: {
      status: "paid",
      totalInCents: { $gt: 500000 },
    },
  },
  {
    $sort: {
      totalInCents: -1,
    },
  },
  {
    $limit: 5,
  },
];

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
