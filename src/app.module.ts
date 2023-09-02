import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { RatingModule } from './rating/rating.module';
import { ApplicationModule } from './application/application.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    UserModule,
    ReviewModule,
    RatingModule,
    ApplicationModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
