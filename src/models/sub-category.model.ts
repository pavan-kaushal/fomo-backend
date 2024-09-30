import { Document, model, Model, Schema, Types } from "mongoose"
import { ICategory } from "./category.model";

export interface ISubCategory extends Document{
    name: string,
    category: Types.ObjectId | ICategory
}

const subCategorySchema = new Schema({
    name: { type: Schema.Types.String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
});

export const SubCategory: Model<ISubCategory> = model<ISubCategory>('SubCategory', subCategorySchema);