import { z } from "zod";

export interface CreateOrderRequestDTO {
  orderDate: string;
  status: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface OrderResponseDTO {
  id: number;
  orderDate: Date;
  status: string;
  items: { productId: number; quantity: number }[];
  totalPrice: number;
}

export const CreateOrdertValidator = {
  validate(input: any): CreateOrderRequestDTO {
    const schema = z.object({
      orderDate: z.string().nonempty("Nome do produto obrigatório"),
      status: z.enum(["RECEBIDO", "PREPARACAO", "PRONTO", "FINALIZADO"]),
      items: z
        .array(
          z.object({
            productId: z.number(),
            quantity: z.number(),
          })
        )
        .nonempty("Necessário incluir itens"),
    });

    return schema.parse(input);
  },
};
