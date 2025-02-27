import { injectable } from "inversify";
import { Repository } from "typeorm";
import { ICategoryRepository } from "../../../../_core/applications/ports/repositories/categoryRepository";
import { Category } from "../../../../_core/domain/entities/category";
import { AppDataSource } from "../config";
import { CategoryEntity } from "../../../../external/typeORM/entities/category";

@injectable()
export class CategoryRepositoryAdapter implements ICategoryRepository {
  private repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(CategoryEntity);
  }

  async findCategory(id: number): Promise<Category | null> {
    try {
      const user = await this.repository.findOne({ where: { id } });

      return user || null;
    } catch (error) {
      throw new Error(`Database error => ${error}`);
    }
  }
}
