# POS Tech - FIAP SOAT10 - Fase 1 - Apresentação

## Entregável 1

**Turma:**
- Jaqueline M.P.S. | RM359838  
- Douglas B. | RM360378  
- Skawinki | RM359870  
- Danilo S. | RM360100  

---

## Domain-Driven Design

### Glossário da Linguagem Ubíqua

#### Domínios:
- **Cliente:** Pessoa/empresa que realiza o pedido, identificada por nome, CPF, CNPJ, e-mail, telefone ou endereço.
- **Pedido:** Acompanha e gerencia o status dos pedidos (criação, modificação, cancelamento).
- **Produto:** Itens do menu divididos por categorias, com possibilidade de observações (ex.: remoção de ingredientes).
- **Pagamento/Caixa:** Gerencia métodos de pagamento e transações.
- **Cozinha:** Responsável pela preparação dos pedidos.

#### Subdomínios:
- **Menu:** Conjunto de produtos organizados por categoria.
- **Categorias:** 
  - **Entrada/Acompanhamento:** Ex.: Nuggets, batata frita.
  - **Lanches:** Ex.: X-burguer, X-tudo.
  - **Bebidas:** Ex.: Água, refrigerante.
  - **Sobremesas:** Ex.: Brownie, sorvete.
  - **Combo:** Combinações pré-selecionadas com preço reduzido.
  - **Promoções:** Promoções de lanches do dia.
  - **Complementos:** Molhos e itens extras.

- **Cadastro:** Informações do cliente para pedidos.
- **Status:** Monitoramento das etapas do pedido:
  - **Recebido:** Pedido na fila para preparação.
  - **Em preparação:** Pedido sendo preparado (não pode ser cancelado).
  - **Pronto:** Pedido finalizado e pronto para consumo.
  - **Finalizado:** Pedido retirado pelo cliente.
  - **Avaliação:** Opção para o cliente avaliar o atendimento (0 a 10).

---

## Domain Storytelling

- **Realização de pedido e pagamento**

![image](https://github.com/user-attachments/assets/cf2612ae-fc79-4afe-ac2c-1f287b486547)

- **Preparação e entrega do pedido**

![image](https://github.com/user-attachments/assets/9c38311a-e87a-45ee-bfa2-6a502cff6eef)

## Brainstorming

![image](https://github.com/user-attachments/assets/e3a33918-106b-4882-92a9-a0251c4c65cc)

![image](https://github.com/user-attachments/assets/1f5dc6e6-b97a-42a9-9843-b52f415f506c)

![image](https://github.com/user-attachments/assets/882424c2-249c-4e9e-809e-bf3e9ce82b68)

## Event Storming

![image](https://github.com/user-attachments/assets/5e106da2-479e-49c3-b9d2-4606817f9bd9)

- **[DDD] Realização do pedido e pagamento**

![image](https://github.com/user-attachments/assets/1a4cbf9e-3dc7-41bb-9e24-da2e89788354)

- **[DDD] Preparação e entrega do pedido**

![image](https://github.com/user-attachments/assets/d830b07d-f9ef-4b8b-816f-153cb77955cf)

---

## Entidades e Objetos de Valor

### Cliente (`users`)
| Propriedade | Tipo  | Descrição                        |
|-------------|-------|----------------------------------|
| id          | int   | Identificador único do cliente  |
| name        | string| Nome do cliente                 |
| cpf         | string| CPF do cliente                  |
| email       | string| E-mail do cliente               |

### Produto (`products`)
| Propriedade     | Tipo     | Descrição                               |
|-----------------|----------|-----------------------------------------|
| id              | int      | Identificador único do produto         |
| name            | string   | Nome do produto                        |
| price           | decimal  | Preço do produto                       |
| description     | string   | Descrição do produto                   |
| image           | string   | Caminho ou URL da foto do produto      |
| category_id     | int      | Identificador da categoria do produto  |

### Pedido (`orders`)
| Propriedade  | Tipo     | Descrição                        |
|--------------|----------|----------------------------------|
| id           | int      | Identificador único do pedido   |
| order_date   | datetime | Data e hora de criação do pedido|
| status       | string   | Status atual do pedido          |

### Itens do Pedido (`order_items`)
| Propriedade  | Tipo     | Descrição                               |
|--------------|----------|-----------------------------------------|
| id           | int      | Identificador único do item do pedido  |
| quantity     | int      | Quantidade do item no pedido           |
| price        | decimal  | Preço do item no momento da escolha    |
| order_id     | int      | ID do pedido associado                 |
| product_id   | int      | ID do produto associado                |

### Categoria de Produto (`categories`)
| Propriedade | Tipo   | Descrição                       |
|-------------|--------|---------------------------------|
| id          | int    | Identificador único da categoria|
| name        | string | Nome da categoria              |

---

## Modelagem de Dados

![image](https://github.com/user-attachments/assets/f8eed172-df6f-4adb-8ef2-f10ff684f12b)
