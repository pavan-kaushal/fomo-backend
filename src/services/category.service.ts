import { Types } from "mongoose"
import { Category } from "../models/category.model"
import { formatRegex } from "../utils/function.utils"
import { SubCategory } from "../models/sub-category.model"

class CategoryService {
    async getCategories(){
        const data = await Category.find({}).lean()
        return data
    }

    async addCategory(
        name: string,
    ){
        const existingDoc = await Category.findOne({
            name: formatRegex(name)
        })
        if(existingDoc){
            throw Error(`Catgeory with ${name} exists`)
        }
        await Category.create({
            name,
        })
    }

    async updateCategory(
        id: Types.ObjectId,
        name: string,
    ){
        const categoryDoc = await Category.findById(id)
        if(!categoryDoc){
            throw Error("Category is Invalid")
        }
        const existingDoc = await Category.findOne({
            name: formatRegex(name),
            _id: {$ne: id}
        })
        if(existingDoc){
            throw Error(`Category with ${name} exists`)
        }
        await Category.findByIdAndUpdate(id, {
            name,
        })
    }

    async getSubCategoryCount(){
        const data = await SubCategory.aggregate([
            {
                $sort: {
                    _id: 1
                }
            }, {
                $group: {
                    _id: "$category",
                    subCategories: {
                        $push: "$$ROOT"
                    }
                }
            }, {
                $sort: {
                    _id: 1
                }
            }, {
                $lookup: {
                    from: 'categories',
                    as: 'category',
                    localField: '_id',
                    foreignField: '_id'
                }
            }, {
                $unwind: {
                    path: "$category"
                }
            }, {
                $project: {
                    _id: 0
                }
            }
        ])
        return data
    }
}

const categoryService = new CategoryService()
export default categoryService