import { Router } from "express";
import { container } from "../config/iocContainer";
import { ProductController } from "../../driver/controllers/productController";
import cors from "cors";

const productRoutes = Router();

productRoutes.use(cors({ origin: "*" }));

const productController = container.get(ProductController);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: Big Mac
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 59.99
 *               description:
 *                 type: string
 *                 description: Descrição do produto
 *                 example: 1 x pão; 2 x hamburgueres; 1 x queijo
 *               image:
 *                 type: string
 *                 description: URL da imagem do produto
 *                 example: https://example.com/imagem.jpg
 *               categoryId:
 *                 type: number
 *                 description: ID da categoria do produto
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Big Mac 2"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 59.99
 *                     description:
 *                       type: string
 *                       example: "1 x pão; 2 x hamburgueres; 1 x queijo"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/imagem.jpg"
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                     id:
 *                       type: number
 *                       example: 3
 *                     categoryId:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */

productRoutes.post(
  "/product/create",
  productController.createProduct.bind(productController)
);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 description: ID do produto
 *                 example: 1
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *                 example: Big Mac
 *               price:
 *                 type: number
 *                 description: Preço do produto
 *                 example: 59.99
 *               description:
 *                 type: string
 *                 description: Descrição do produto
 *                 example: 1 x pão; 2 x hamburgueres; 1 x queijo
 *               image:
 *                 type: string
 *                 description: URL da imagem do produto
 *                 example: https://example.com/imagem.jpg
 *               categoryId:
 *                 type: number
 *                 description: ID da categoria do produto
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Big Mac 2"
 *                     price:
 *                       type: number
 *                       format: float
 *                       example: 59.99
 *                     description:
 *                       type: string
 *                       example: "1 x pão; 2 x hamburgueres; 1 x queijo"
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: "https://example.com/imagem.jpg"
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: number
 *                           example: 1
 *                     id:
 *                       type: number
 *                       example: 3
 *                     categoryId:
 *                       type: number
 *                       example: 1
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.put(
  "/product",
  productController.updateProduct.bind(productController)
);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do produto a ser removido
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *         description: Produto removido com sucesso
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.delete(
  "/product/:id",
  productController.removeProduct.bind(productController)
);

/**
 * @swagger
 * /product/list-by-category/{categoryId}:
 *   get:
 *     summary: Lista produtos por categoria
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID da categoria
 *         schema:
 *           type: number
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de produtos na categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Big mac
 *                   price:
 *                     type: number
 *                     example: 59.99
 *                   description:
 *                     type: string
 *                     example: 1 x pão; 2 x hamburgueres; 1 x queijo
 *                   image:
 *                     type: string
 *                     example: https://example.com/imagem.jpg
 *                   categoryId:
 *                     type: number
 *                     example: 1
 *       400:
 *         description: Erro de validação
 *       500:
 *         description: Erro interno do servidor
 */
productRoutes.get(
  "/product/list-by-category/:categoryId",
  productController.listProductByCategory.bind(productController)
);

export { productRoutes };
