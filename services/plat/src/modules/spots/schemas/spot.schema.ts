import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
  collection: "spots",
  timestamps: true,
})
export class Spot {
  @Prop({required: true, type: String})
  name: string;

  @Prop({required: true, type: String})
  description: string;

  @Prop({required: true, type: Number})
  number: number;

  @Prop({required: true, type: String})
  secret: string;

  @Prop({type: String})
  hint: string;

  @Prop({
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coords: {
      type: [Number],
      required: true,
    },
  })
  location: {
    type: "Point";
    coords: [number, number];
  };
}

export const SpotSchema = SchemaFactory.createForClass(Spot);
