import {Model} from "mongoose";
import {CreateSpotDto} from "../dto/CreateSpotDto";
import {Spot} from "../schemas/spot.schema";

export async function toSpot(
  spotsRepo: Model<Spot>,
  dto: CreateSpotDto,
): Promise<Spot> {
  return {
    name: dto.name,
    description: dto.description,
    number: (await spotsRepo.countDocuments()) + 1,
    secret: dto.secret,
    hint: dto.hint,
    location: {
      type: "Point",
      coords: [dto.longitude, dto.latitude],
    },
  };
}
