import { OrderItem } from "./orderItem";

export class Order {
  private _id: number;
  private _orderDate: Date;
  private _status: string;
  private _items: OrderItem[];
  private _totalPrice: number;

  private constructor(
    id: number,
    orderDate: Date,
    status: string,
    items: OrderItem[],
    totalPrice: number
  ) {
    this._id = id;
    this._orderDate = orderDate;
    this._status = status;
    this._items = items;
    this._totalPrice = totalPrice;
  }

  static create(
    id?: number,
    orderDate?: Date,
    status?: string,
    items?: OrderItem[],
    totalPrice?: number
  ): Order | null {
    if (!id || !orderDate || !status || !items || !totalPrice) {
      return null;
    }
    return new Order(id, orderDate, status, items, totalPrice);
  }

  get id(): number {
    return this._id;
  }
  get orderDate(): Date {
    return this._orderDate;
  }
  get status(): string {
    return this._status;
  }
  get items(): OrderItem[] {
    return this._items;
  }
  get totalPrice(): number {
    return this._totalPrice;
  }
}
