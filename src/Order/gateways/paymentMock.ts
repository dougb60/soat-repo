import axios from "axios";
import { BusinessError } from "../../utils/errors";
import { MockPaymentRepository } from "../interfaces/repositories";

export class PaymentGateway implements MockPaymentRepository {
  private webhookUrl: string;

  constructor(webhookURL: string) {
    this.webhookUrl = webhookURL;
  }

  async processPayment(
    orderId: number,
    paymentStatus: "APPROVED" | "REJECTED",
    orderStatus: "RECEBIDO" | "PREPARACAO" | "PRONTO" | "FINALIZADO"
  ): Promise<void> {
    try {
      setTimeout(async () => {
        await axios.post(this.webhookUrl, {
          orderId,
          paymentStatus,
          orderStatus,
        });
      }, 2000);
    } catch (error) {
      throw new BusinessError("Erro ao processar pagamento", 400);
    }
  }
}
