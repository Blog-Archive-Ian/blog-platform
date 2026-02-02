import { Module } from '@nestjs/common';

import { PostController } from './post.controller';
import { PostMapper } from './post.mapper';
import { PostService } from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PostMapper],
})
export class PostModule {}
