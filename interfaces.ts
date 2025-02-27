export interface Order {
  userId: string;
  items: {
    itemId: string;
    productId: string;
    valueInCents: number;
  }[];
  paidAt: Date;
  canceledAt: Date;
}
