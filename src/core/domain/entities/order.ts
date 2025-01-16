import { OrderStatusEnum } from "../enums/order";

export class Order {
  constructor(
    public id: number,
    public items: number[],
    public orderDate: Date,
    public status: OrderStatusEnum
  ) {}
}
