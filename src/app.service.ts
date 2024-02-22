import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Key } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async generateKey(): Promise<Key> {
    const keyValue = Math.random().toString(36).substring(2, 15);
    const key = await this.prisma.key.create({
      data: {
        value: 'jey' + keyValue,
        valid: true,
      },
    });
    return key;
  }

  async checkKey(value: string): Promise<{ valid: boolean, createdAt?: Date, updatedAt?: Date }> {
    const key = await this.prisma.key.findUnique({
      where: { value },
    });
  
    if (key && key.valid) {
      const updatedKey = await this.prisma.key.update({
        where: { id: key.id },
        data: { valid: false },
        select: { createdAt: true, updatedAt: true },
      });
      return { valid: true, createdAt: updatedKey.createdAt, updatedAt: updatedKey.updatedAt };
    } else if (key) {
      return { valid: key.valid, updatedAt: key.updatedAt };
    } else {
      return { valid: false };
    }
  
  }
}

