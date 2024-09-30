import { Controller, Get, Post, Put } from "@overnightjs/core";
import { Types } from "mongoose";
import categoryService from "../services/category.service";
import responseMiddleware from "../utils/response.middleware";

@Controller('category')
export class CategoryController {
    @Get('')
    async getCategories(req, res){
        try {
            const data = await categoryService.getCategories()
            return responseMiddleware(res, true, '', data)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Post('')
    async updateCategory(req, res){
        try {
            let {_id, name} = req.body?.data || {}
            if(!_id || !name?.length){
                throw Error("Invalid Request")
            }
            _id = new Types.ObjectId(_id)
            await categoryService.updateCategory(_id, name)
            return responseMiddleware(res, true, 'Category Updated Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Put('')
    async addCategory(req, res){
        try {
            let {name} = req.body?.data || {}
            if(!name?.length){
                throw Error("Invalid Request")
            }
            await categoryService.addCategory(name)
            return responseMiddleware(res, true, 'Category Added Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Get('subCategoryCount')
    async getSubCategoryCount(req, res){
        try {
            const data = await categoryService.getSubCategoryCount()
            return responseMiddleware(res, true, '', data)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }
}