import { Types } from "mongoose"
import { Course } from "../models/course.model"
import { formatRegex } from "../utils/function.utils"
import { Category } from "../models/category.model"
import { SubCategory } from "../models/sub-category.model"

class CourseService {
    async getCourses(){
        const data = await Course.find().sort({name: 1}).populate('categories subCategories').lean()
        return data
    }

    async validateCategoryData(
        categories: Types.ObjectId[],
        subCategories: Types.ObjectId[],
    ){
        const existingCategories: Set<string> = new Set((await Category.distinct('_id', {
            _id: {$in: categories}
        })).map(id => id.toString()))
        const existingSubCategories: Set<string> = new Set((await SubCategory.distinct('_id', {
            _id: {$in: subCategories}
        })).map(id => id.toString()))

        const errors = []
        if(categories.find(id => existingCategories.has(id.toString()))){
            errors.push("Invalid Categories Found")
        }

        if(subCategories.find(id => existingSubCategories.has(id.toString()))){
            errors.push("Invalid SubCategories Found")
        }
        
        if(errors.length){
            throw Error(errors.join('\n'))
        }
    }

    async addCourse(
        name: string,
        categories: Types.ObjectId[],
        subCategories: Types.ObjectId[],
    ){
        const existingDoc = await Course.findOne({
            name: formatRegex(name)
        })
        if(existingDoc){
            throw Error(`Course with ${name} exists`)
        }
        await this.validateCategoryData(categories, subCategories)
        await Course.create({
            name,
            categories,
            subCategories
        })
    }

    async updateCourse(
        id: Types.ObjectId,
        name: string,
        categories: Types.ObjectId[],
        subCategories: Types.ObjectId[],
    ){
        const existingDoc = await Course.findOne({
            name: formatRegex(name),
            _id: {$ne: id}
        })
        if(existingDoc){
            throw Error(`Course with ${name} exists`)
        }
        await this.validateCategoryData(categories, subCategories)
        await Course.findByIdAndUpdate(id, {
            name,
            categories,
            subCategories
        })
    }
}

const courseService = new CourseService()
export default courseService