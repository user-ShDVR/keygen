import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Key } from '@prisma/client';
import { CheckKeyDto } from './checkKey.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from './guard/generation-guard';

@Controller()
@ApiTags('KeyGen')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiHeader({
    name: 'x-api-key',
    description: 'Ключ для генерации',
    required: true,
  })
  @Get('generate')
  @UseGuards(ApiKeyGuard)
  async generateKey(): Promise<Key> {
    return this.appService.generateKey();
  }

  @Post('check')
  async checkKey(@Body() checkKey: CheckKeyDto): Promise<{ valid: boolean, createdAt?: Date, updatedAt?: Date }> {
    const isValid = await this.appService.checkKey(checkKey.key);
    return { ...isValid };
  }
}
