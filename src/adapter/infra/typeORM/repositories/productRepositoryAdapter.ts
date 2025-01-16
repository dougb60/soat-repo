import { Repository } from "typeorm";
import { IProductRepository } from "../../../../core/applications/ports/repositories/productRepository";
import { Product } from "../../../../core/domain/entities/product";
import { AppDataSource } from "../config";
import { ProductEntity } from "../entities/product";
import { injectable } from "inversify";
import { OrderEntity } from "../entities/order";

@injectable()
export class ProductRepositoryAdapter implements IProductRepository {
  private repository: Repository<ProductEntity>;
  private categoryRepository: Repository<OrderEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductEntity);
  }

  async createProduct(product: {
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
  }): Promise<Omit<Product, "categoryId"> | null> {
    try {
      const newProduct = this.repository.create({
        ...product,
        category: { id: product.categoryId },
      });
      const createdProduct = await this.repository.save(newProduct);

      return createdProduct || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async updateProduct(product: {
    id: number;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    categoryId?: number;
  }): Promise<Omit<Product, "categoryId"> | null> {
    try {
      const updated = await this.repository.save({
        ...product,
        category: { id: product.categoryId },
      });

      return updated || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async removeProduct(producId: number): Promise<boolean> {
    try {
      const deleted = await this.repository.delete({ id: producId });

      if (deleted.affected && deleted.affected >= 1) return true;

      return false;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async listProductByCategory(
    categoryId: number
  ): Promise<Omit<Product, "categoryId">[] | null> {
    try {
      const products = await this.repository.find({
        where: { category: { id: categoryId } },
      });

      if (products.length > 0) return products;

      return null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }

  async findProduct(
    productId: number
  ): Promise<Omit<Product, "categoryId"> | null> {
    try {
      const product = await this.repository.findOne({
        where: { id: productId },
        relations: ["category"],
      });

      return product || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }
}
