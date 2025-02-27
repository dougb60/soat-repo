import { Category } from "../../../domain/entities/category";

export interface ICategoryRepository {
  findCategory(id: number): Promise<Category | null>;
}
