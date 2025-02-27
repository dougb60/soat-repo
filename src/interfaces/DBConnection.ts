export interface DBConnection<P> {
  findAll(tableName: string): Promise<any[]>;
  findOne(
    tableName: string,
    criteria?: { [K in keyof P]?: P[K] }
  ): Promise<any | null>;
  findBy(tableName: string, criteria: Record<string, any>): Promise<any[]>;
  save(tableName: string, entity: any): Promise<any>;
  update(tableName: string, criteria: any, partialEntity: any): Promise<any>;
  delete(tableName: string, criteria: any): Promise<any>;
}
