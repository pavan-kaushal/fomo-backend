import { Document, model, Model, Schema } from "mongoose"

export interface ICategory extends Document{
    name: string,
}

const categorySchema = new Schema({
    name: { type: Schema.Types.String, required: true, trim: true },
});

export const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);