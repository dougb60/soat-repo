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
- **Preparação e entrega do pedido**

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

*(Adicionar diagrama ou tabela de dados se necessário)*
