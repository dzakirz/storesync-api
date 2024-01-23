import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getProducts(): Promise<Product[]> {
    return await this.databaseService.product.findMany();
  }
}
