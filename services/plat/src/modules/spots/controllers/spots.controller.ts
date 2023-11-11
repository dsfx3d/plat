import {Body, Controller, Get, Post} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Spot} from "../schemas/spot.schema";
import {Model} from "mongoose";
import {CreateSpotDto} from "../dto/CreateSpotDto";
import {toSpot} from "../helpers/toSpot";

@Controller("spots")
export class SpotsController {
  constructor(
    @InjectModel(Spot.name) private readonly _spotsRepo: Model<Spot>,
  ) {}

  @Post()
  async createSpot(@Body() requestBody: CreateSpotDto) {
    const spot = await toSpot(this._spotsRepo, requestBody);
    return this._spotsRepo.create(spot);
  }

  @Get()
  getSpots() {
    return this._spotsRepo.find();
  }
}
