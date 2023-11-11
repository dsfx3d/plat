import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {MongooseModule} from "@nestjs/mongoose";
import {SpotsModule} from "./modules/spots/spots.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    SpotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
