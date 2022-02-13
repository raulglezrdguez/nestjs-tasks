import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from 'config.schema';

// const configuration = () => ({
//   DB_TYPE: 'postgres',
//   DB_HOST: 'localhost',
//   DB_PORT: 5432,
//   DB_USERNAME: 'postgres',
//   DB_PASSWORD: 'postgres',
//   DB_DATABASE: 'tasks',
// });
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema, // this dont work
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      // load: [configuration],
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModule> => ({
        type: configService.get('DB_TYPE'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
