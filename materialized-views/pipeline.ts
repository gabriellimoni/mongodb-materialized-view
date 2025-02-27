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
