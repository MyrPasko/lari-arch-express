import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log('[Prisma service] Connection to DB is successful');
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(`[Prisma service] Connection error: ${e.message}`);
      }
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
