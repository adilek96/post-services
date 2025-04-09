import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostType } from '../types/post.type';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class GetPostService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redisService: Redis,
  ) {}

  async getPostById(id: number): Promise<PostType | null> {
    const cacheKey = `post:${id}`;

    // Попробуем получить из кэша
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
        updatedAt: new Date(parsed.updatedAt),
      };
    }

    // Если нет в кэше — получаем из БД
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        categories: true,
        subcategories: true,
        media: true,
      },
    });

    // Если пост найден — кэшируем
    if (post) {
      await this.redisService.set(
        cacheKey,
        JSON.stringify(post),
        'EX',
        60 * 60, // 1 час
      );
    }

    return post as unknown as PostType;
  }
}
