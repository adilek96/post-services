import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PostType } from '../types/post.type';

@Injectable()
export class DeletePostService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redisService: Redis, // Внедряем Redis
  ) {}

  async deletePost(id: number): Promise<boolean> {
    // Включаем категории и подкатегории при поиске поста
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        categories: true,
        subcategories: true,
      },
    });

    if (!post) {
      throw new Error(`Post with ID ${id} not found`);
    }

    // Удалить связанные медиа
    await this.prisma.media.deleteMany({
      where: {
        postId: id,
      },
    });

    // Теперь можно удалить сам пост
    await this.prisma.post.delete({ where: { id } });

    // Инвалидируем кэш для конкретного поста
    await this.redisService.del(`post:${id}`);

   

    // Получаем все ключи, начинающиеся с 'posts:'
const keys = await this.redisService.keys('posts:*');

// Удаляем все эти ключи
keys.forEach(async (key) => {
  await this.redisService.del(key);
  console.log(`Удален ключ: ${key}`);
});

    return true;
  }
}
