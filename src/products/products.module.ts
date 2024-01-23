import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, DatabaseService],
})
export class ProductsModule {}
