import { inject, injectable } from "inversify";
import { IProductRepository } from "../ports/repositories/productRepository";
import { Product } from "../../domain/entities/product";
import { ReturnType } from "../interfaces/apiInterfaces";
import { ICategoryRepository } from "../ports/repositories/categoryRepository";

@injectable()
export class ProductService {
  constructor(
    @inject("ProductRepository") private productRepository: IProductRepository,
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async createProduct(product: {
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
  }): Promise<ReturnType<Product | { message: string }>> {
    try {
      const categoryExists = await this.categoryRepository.findCategory(
        product.categoryId
      );

      if (!categoryExists)
        return {
          status: 404,
          response: { message: "A categoria do produto não foi cadastrada!" },
        };

      const newProduct = await this.productRepository.createProduct(product);

      if (newProduct)
        return {
          status: 200,
          response: { ...newProduct, categoryId: product.categoryId },
        };

      return { status: 500, response: { message: "Erro ao inserir produto!" } };
    } catch (error) {
      return { status: 500, response: { message: error as string } };
    }
  }

  async updateProduct(product: {
    id: number;
    name?: string;
    price?: number;
    description?: string;
    image?: string;
    categoryId?: number;
  }): Promise<ReturnType<Omit<Product, "categoryId"> | { message: string }>> {
    try {
      const exists = await this.productRepository.findProduct(product.id);

      if (!exists) {
        return {
          status: 404,
          response: { message: "Produto não encontrado!" },
        };
      }
      const updated = await this.productRepository.updateProduct(product);

      if (updated) {
        const updatedReturn = await this.productRepository.findProduct(
          updated.id
        );
        return { status: 200, response: updatedReturn! };
      }

      return { status: 500, response: { message: "Erro ao editar produto!" } };
    } catch (error) {
      return { status: 500, response: { message: error as string } };
    }
  }

  async removeProduct(
    productId: number
  ): Promise<ReturnType<number | { message: string }>> {
    try {
      const exists = await this.productRepository.findProduct(productId);

      if (!exists)
        return {
          status: 404,
          response: { message: "Produto não encontrado!" },
        };

      const deletedProduct = await this.productRepository.removeProduct(
        productId
      );

      if (deletedProduct) return { status: 200, response: productId };

      return { status: 500, response: { message: "Erro ao excluir produto" } };
    } catch (error) {
      return { status: 500, response: { message: error as string } };
    }
  }

  async listProductByCategory(
    categoryId: number
  ): Promise<ReturnType<Omit<Product, "categoryId">[] | { message: string }>> {
    try {
      const categoryExists = await this.categoryRepository.findCategory(
        categoryId
      );

      if (!categoryExists)
        return { status: 404, response: { message: "Categoria não exste!" } };

      const products = await this.productRepository.listProductByCategory(
        categoryId
      );

      if (products) return { status: 200, response: products };

      return {
        status: 404,
        response: { message: "Nenhum produto encontrado!" },
      };
    } catch (error) {
      return {
        status: 500,
        response: { message: (error as string) ?? "Erro ao listar produtos" },
      };
    }
  }
}
