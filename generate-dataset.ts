import Chance from "chance";
import type { Order } from "./interfaces";
import { getMongoClient } from "./mongo";
const chance = new Chance();

/**
 * Generates 500k orders
 */
const data: Order[] = Array.from(new Array(0.5 * 1000 * 1000)).map(() => {
  const isCanceled = chance.bool();
  const isPaid = !isCanceled && chance.bool();

  const itemsNumber = chance.integer({
    max: 20,
    min: 1,
  });
  const items: Order["items"] = Array.from(new Array(itemsNumber)).map(
    (_, idx) => ({
      itemId: String(idx),
      productId: chance.string({
        numeric: true,
        length: 5,
      }),
      valueInCents: chance.integer({
        min: 1000,
        max: 50000,
      }),
    })
  );

  return {
    canceledAt: isCanceled ? chance.date() : undefined,
    paidAt: isPaid ? chance.date() : undefined,
    items,
    userId: chance.string({
      numeric: true,
      length: 5,
    }),
  };
});

const client = await getMongoClient();
await client.db("demo_db").collection("orders").insertMany(data);

console.log("data generated");
