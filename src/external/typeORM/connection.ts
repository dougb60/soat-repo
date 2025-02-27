import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { AppDataSource } from "./config";
import { DBConnection } from "../../interfaces/DBConnection";
import { DatabaseError } from "../../utils/errors";

export class TypeORMConnection implements DBConnection<any> {
  private getRepo(tableName: string): Repository<any> {
    return AppDataSource.getRepository(tableName);
  }

  async findAll(tableName: string) {
    try {
      const repo = this.getRepo(tableName);
      return repo.find();
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }

  findOne(tableName: string, criteria?: { [x: string]: any } | undefined) {
    try {
      const repo = this.getRepo(tableName);
      return repo.findOneBy({ where: criteria });
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }

  async findBy(tableName: string, criteria: Record<string, any>) {
    try {
      const repo = this.getRepo(tableName);
      const query = repo.createQueryBuilder(tableName);

      Object.keys(criteria).forEach((field) => {
        query.andWhere(`${field} = :${field}`, { [field]: criteria[field] });
      });

      return query.getMany();
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }

  async save(tableName: string, entity: any) {
    try {
      const repo = this.getRepo(tableName);
      return repo.save(entity);
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }

  async update(tableName: string, criteria: any, partialEntity: any) {
    try {
      const repo = this.getRepo(tableName);
      return await repo.update(criteria, partialEntity);
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }

  async delete(tableName: string, criteria: any) {
    try {
      const repo = this.getRepo(tableName);
      return await repo.delete(criteria);
    } catch (error) {
      throw new DatabaseError("Failed to fetch data from the database", error);
    }
  }
}
