export const pipeline = [
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

export const mvPipeline = [
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

const pipelineWithoutSomeStages = pipeline.filter(
  (p) =>
    !Object.keys(p).includes("$limit") &&
    !Object.keys(p).includes("$sort") &&
    !Object.keys(p).includes("$match")
);

export const pipelineWithMerge = [
  ...pipelineWithoutSomeStages,
  {
    $merge: {
      into: "_mv_orders",
      whenMatched: "replace",
      whenNotMatched: "insert",
    },
  },
];
