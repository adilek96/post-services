// src/prisma/prisma.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  constructor() {
    super(); // Вы можете передать параметры, если это необходимо
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}