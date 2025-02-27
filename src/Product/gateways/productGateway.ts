import { DBConnection } from "../../interfaces/DBConnection";
import { Category } from "../entities/category";
import { Product } from "../entities/product";
import {
  CreateProductRequestDTO,
  UpdateProductRequestDTO,
} from "../interfaces/dtos";
import { ProductRepository } from "../interfaces/repositories";

export class ProductGateway implements ProductRepository {
  private readonly PRODUCT_TABLE_NAME = "products";
  private readonly CATEGORY_TABLE_NAME = "categories";

  constructor(private dbConnection: DBConnection<any>) {}

  async create(productData: CreateProductRequestDTO): Promise<Product | null> {
    const result = await this.dbConnection.save(
      this.PRODUCT_TABLE_NAME,
      productData
    );
    return Product.create(
      result?.id,
      result?.name,
      result?.price,
      result?.description,
      result?.image,
      result?.category_id
    );
  }

  async update(productData: UpdateProductRequestDTO): Promise<Product | null> {
    const result = await this.dbConnection.update(
      this.PRODUCT_TABLE_NAME,
      { id: productData.id },
      productData
    );
    return result ? await this.findById(productData.id) : null;
  }

  async findById(productId: number): Promise<Product | null> {
    const result = await this.dbConnection.findOne(this.PRODUCT_TABLE_NAME, {
      id: productId,
    });
    return Product.create(
      result?.id,
      result?.name,
      result?.price,
      result?.description,
      result?.image,
      result?.category_id
    );
  }

  async listByCategory(categoryId: number) {
    const results = await this.dbConnection.findBy(this.PRODUCT_TABLE_NAME, {
      category_id: categoryId,
    });
    return results
      .map((result) =>
        Product.create(
          result.id,
          result.name,
          result.price,
          result.description,
          result.image,
          result.category_id
        )
      )
      .filter((product): product is Product => product !== null);
  }

  async remove(productId: number): Promise<number | null | undefined> {
    const result = await this.dbConnection.delete(this.PRODUCT_TABLE_NAME, {
      id: productId,
    });

    return result.affected;
  }

  async findByName(name: string): Promise<Product | null> {
    const result = await this.dbConnection.findOne(this.PRODUCT_TABLE_NAME, {
      name,
    });
    return Product.create(
      result?.id,
      result?.name,
      result?.price,
      result?.description,
      result?.image,
      result?.category_id
    );
  }

  async findByCategoryId(categoryId: number): Promise<Category | null> {
    const result = await this.dbConnection.findOne(this.CATEGORY_TABLE_NAME, {
      id: categoryId,
    });
    return Category.create(result.id, result.name, result.description);
  }
}
