import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {Logger, ValidationPipe} from "@nestjs/common";
import {ExceptionFilter} from "./filters/ExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({transform: true, validateCustomDecorators: true}),
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
  Logger.log(`Plat service is running on: ${await app.getUrl()}`, "Bootstrap");
}
bootstrap();
