import { Product } from "../../../domain/entities/product";

type CreateProductRepository = {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
};

export interface IProductRepository {
  createProduct(
    product: CreateProductRepository
  ): Promise<Omit<Product, "categoryId"> | null>;
  updateProduct(
    product: Partial<CreateProductRepository> & { id: number }
  ): Promise<Omit<Product, "categoryId"> | null>;
  removeProduct(producId: number): Promise<boolean>;
  listProductByCategory(
    categoryId: number
  ): Promise<Omit<Product, "categoryId">[] | null>;
  findProduct(productId: number): Promise<Omit<Product, "categoryId"> | null>;
}
