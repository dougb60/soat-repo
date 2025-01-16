export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public description: string,
    public image: string,
    public categoryId: number
  ) {}
}
