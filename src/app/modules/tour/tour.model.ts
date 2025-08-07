import { model, Schema } from "mongoose";
import { ITour, ITourTypes } from "./tour.interface";

export const TourTypesSchema = new Schema<ITourTypes>({
    name:{type:String, required:true, unique:true}

},{
    timestamps:true
})

export const TourTypes = model<ITourTypes>("TourTypes", TourTypesSchema)


export const TourSchema = new Schema<ITour>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    division: {
      type: Schema.Types.ObjectId,
      ref: "Division",
    },
    tourTypes: {
      type: Schema.Types.ObjectId,
      ref: "TourTypes"
    },
  },
  {
    timestamps: true,
  }
);