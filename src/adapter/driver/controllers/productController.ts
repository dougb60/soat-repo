import { inject, injectable } from "inversify";
import { ProductService } from "../../../core/applications/services/productService";
import { z } from "zod";
import { Request, Response } from "express";

@injectable()
export class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) {}

  private createProductSchema = z.object({
    name: z.string().nonempty("Nome do produto obrigatório"),
    price: z.number().nonnegative("Valor não deve ser negativo"),
    description: z.string().nonempty("Descrição do produto obrigatório"),
    image: z.string().nonempty("URL da imagem obrigatória"),
    categoryId: z.number(),
  });

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const validatedBody = this.createProductSchema.parse(req.body);
      const { categoryId, description, image, name, price } = validatedBody;

      const product = await this.productService.createProduct({
        categoryId,
        description,
        image,
        name,
        price,
      });

      res.status(product.status).json({ response: product.response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({ response: `Error => ${error}` });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id, categoryId, description, image, name, price } = req.body;

      if (!id) {
        res.status(400).json({ message: "Id do item Obrigatório!" });
        return;
      }
      const updatedProduct = await this.productService.updateProduct({
        categoryId,
        description,
        id,
        image,
        name,
        price,
      });

      res
        .status(updatedProduct.status)
        .json({ message: updatedProduct.response });
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({ response: `Error => ${error}` });
    }
  }

  async removeProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        res.status(400).json({ message: "CPF precisa ser informado!" });
        return;
      }

      const removed = await this.productService.removeProduct(parseInt(id, 10));

      res.status(removed.status).json({ response: removed.response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }

      res.status(500).json({ response: `Error => ${error}` });
    }
  }

  async listProductByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      if (typeof categoryId !== "string") {
        res.status(400).json({ message: "CPF precisa ser informado!" });
        return;
      }

      const products = await this.productService.listProductByCategory(
        parseInt(categoryId, 10)
      );

      res.status(products.status).json({ response: products.response });
    } catch (error) {}
  }
}
