import { Types } from "mongoose"
import { SubCategory } from "../models/sub-category.model"
import { formatRegex } from "../utils/function.utils"
import { Category } from "../models/category.model"

class SubCategoryService {
    async getSubCategories(category?: Types.ObjectId){
        const data = await SubCategory.find({
            ...(category ? {category} : {})
        }).lean()
        return data
    }

    async validateCategory(id: Types.ObjectId){
        const doc = await Category.findById(id)
        if(doc){
            throw Error("Invalid Category")
        }
    }

    async addSubCategory(
        name: string,
        category: Types.ObjectId
    ){
        await this.validateCategory(category)
        const existingDoc = await SubCategory.findOne({
            category,
            name: formatRegex(name)
        })
        if(existingDoc){
            throw Error(`SubCatgeory with ${name} exists`)
        }
        await SubCategory.create({
            category,
            name,
        })
    }

    async updateSubCategory(
        id: Types.ObjectId,
        name: string,
    ){
        const subCategoryDoc = await SubCategory.findById(id).lean()
        if(!subCategoryDoc){
            throw Error("SubCategory is invalid")
        }
        const existingDoc = await SubCategory.findOne({
            category: subCategoryDoc._id,
            name: formatRegex(name),
            _id: {$ne: id}
        })
        if(existingDoc){
            throw Error(`SubCategory with ${name} exists`)
        }
        await SubCategory.findByIdAndUpdate(id, {
            name,
        })
    }
}

const subCategoryService = new SubCategoryService()
export default subCategoryService