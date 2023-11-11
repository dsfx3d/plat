import {Module} from "@nestjs/common";
import {SpotsController} from "./controllers/spots.controller";
import {MongooseModule, SchemaFactory} from "@nestjs/mongoose";
import {Spot} from "./schemas/spot.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Spot.name, schema: SchemaFactory.createForClass(Spot)},
    ]),
  ],
  controllers: [SpotsController],
})
export class SpotsModule {}
