import { Controller, Get } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly appService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.appService.getProducts();
  }
}
