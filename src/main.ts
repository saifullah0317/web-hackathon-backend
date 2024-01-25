/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  // app.enableCors({
  //   origin: true,
  //   // credentials: true,
  // });
  // app.enableCors({
  //   origin: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   // allowed headers
  //   allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'],
  //   // headers exposed to the client
  //   exposedHeaders: ['Authorization'],
  //   credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  // });
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
