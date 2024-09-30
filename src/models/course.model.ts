import { Document, model, Model, Schema, Types } from "mongoose"
import { ICategory } from "./category.model";

export interface ICourse extends Document{
    name: string,
    categories: Types.ObjectId[] | ICategory[],
    subCategories: Types.ObjectId[]
}

const courseSchema = new Schema({
    name: { type: String, trim: true },
    categories: [{ type: Types.ObjectId, ref: 'Category' }],
    subCategories: [{ type: Types.ObjectId, ref: 'SubCategory' }],
});

export const Course: Model<ICourse> = model<ICourse>('Course', courseSchema);