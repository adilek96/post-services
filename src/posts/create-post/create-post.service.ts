import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Post, Category, Subcategory, Media } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(
  title: string,
  content: string,
  categories: string[],
  subcategories: string[],
  media: { url: string; type: string }[] = [],  // Медиа по умолчанию пустой массив
): Promise<Post> {
  // Создание или поиск категорий
  const categoryPromises = categories.map(async (name) => {
    return this.prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  });
  const categoriesDb = await Promise.all(categoryPromises);

  // Создание или поиск подкатегорий
  const subcategoryPromises = subcategories.map(async (name) => {
    return this.prisma.subcategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  });
  const subcategoriesDb = await Promise.all(subcategoryPromises);

  // Создание поста
  const post = await this.prisma.post.create({
    data: {
      title,
      content,
      categories: { connect: categoriesDb.map((c) => ({ id: c.id })) },
      subcategories: {
        connect: subcategoriesDb.map((sc) => ({ id: sc.id })),
      },
      media: media.length
        ? {
            create: media.map((m) => ({
              url: m.url,
              type: m.type,
            })),
          }
        : undefined, // Если медиа не передано, не создаем медиа
    },
  });

  return post;
}
}