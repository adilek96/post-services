import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { GetAllPostsInput } from './dto/get-all-posts.input';
import { PostType } from '../types/post.type';

@Injectable()
export class GetAllPostsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectRedis() private readonly redisService: Redis, // Используем декоратор
  ) {}

  async getAllPosts(input?: GetAllPostsInput): Promise<PostType[]> {
    const {
      sort = 'desc',
      category,
      subcategory,
      page = 1,
      limit = 10,
    } = input || {};

    const skip = (page - 1) * limit;

    const cacheKey = `posts:${category || 'all'}:${subcategory || 'all'}:${page}:${limit}:${sort}`;
    

    const cachedPosts = await this.redisService.get(cacheKey);
    if (cachedPosts) {
      const parsedPosts = JSON.parse(cachedPosts);
    
      // Преобразуем строки дат обратно в Date
      const postsWithDates = parsedPosts.map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt),
      }));
    
      return postsWithDates;
    }

    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: sort,
      },
      where: {
        ...(category && {
          categories: {
            some: {
              name: category,
            },
          },
        }),
        ...(subcategory && {
          subcategories: {
            some: {
              name: subcategory,
            },
          },
        }),
      },
      include: {
        categories: true,
        subcategories: true,
        media: true,
      },
    });

    await this.redisService.set(cacheKey, JSON.stringify(posts), 'EX', 60 * 60); // 1 час

    return posts as PostType[];
  }
}
