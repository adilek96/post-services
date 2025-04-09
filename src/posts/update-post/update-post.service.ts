import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PostType } from '../types/post.type';

@Injectable()
export class UpdatePostService {
  constructor(
    private prisma: PrismaService,
    @InjectRedis() private readonly redisService: Redis, // Внедряем Redis
  ) {}

  async updatePost(id: number, data: any): Promise<PostType> {
    // Обновляем сам пост
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
      include: {
        categories: true,  // Включаем категории
        subcategories: true, // Включаем подкатегории
      },
    });

    // Обновляем категории
    if (data.categories) {
      const categoryRecords = await Promise.all(
        data.categories.map((name: string) =>
          this.prisma.category.upsert({
            where: { name },
            update: {},
            create: { name },
          })
        )
      );

      await this.prisma.post.update({
        where: { id },
        data: {
          categories: {
            set: [], // очищаем текущие
            connect: categoryRecords.map((c) => ({ id: c.id })),
          },
        },
      });
    }

    // Обновляем подкатегории
    if (data.subcategories) {
      const subcategoryRecords = await Promise.all(
        data.subcategories.map((name: string) =>
          this.prisma.subcategory.upsert({
            where: { name },
            update: {},
            create: { name },
          })
        )
      );

      await this.prisma.post.update({
        where: { id },
        data: {
          subcategories: {
            set: [], // очищаем текущие
            connect: subcategoryRecords.map((s) => ({ id: s.id })),
          },
        },
      });
    }

    // Обновляем медиа
    if (data.media) {
      await this.prisma.media.deleteMany({
        where: { postId: id },
      });

      await this.prisma.media.createMany({
        data: data.media.map((m) => ({
          url: m.url,
          type: m.type,
          postId: id,
        })),
      });
    }

    await this.redisService.del(`post:${id}`);
    // Получаем все ключи, начинающиеся с 'posts:'
  const keys = await this.redisService.keys('posts:*');

// Удаляем все эти ключи
keys.forEach(async (key) => {
  await this.redisService.del(key);
});
    

    return updatedPost as PostType;
  }
}
