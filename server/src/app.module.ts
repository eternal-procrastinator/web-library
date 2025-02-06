import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import * as sqlite3 from "sqlite3";
import { join } from "path";

import { BookModule } from "@/modules/book/book.module";
import { AuthModule } from "@/modules/auth/auth.module";
import { authMiddleware } from "@/modules/common/middlewares/auth.middleware";

interface GraphQLContext {
  req: Request;
  res: Response;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      driver: ApolloDriver,
      context: ({ req, res }: GraphQLContext) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    BookModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes("*");
  }
}
