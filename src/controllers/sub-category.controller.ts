import { Controller, Get, Post, Put } from "@overnightjs/core";
import { Types } from "mongoose";
import responseMiddleware from "../utils/response.middleware";
import subCategoryService from "../services/sub-category.service";

@Controller('sub-category')
export class SubCategoryController {
    
    @Get('')
    async getCategories(req, res){
        try {
            const data = await subCategoryService.getSubCategories()
            return responseMiddleware(res, true, '', data)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Get('category/:id')
    async getSubCategoriesOfCategory(req, res){
        try {
            let {id} = req.params
            if(!id){
                throw Error("Invalid Request")
            }
            id = new Types.ObjectId(id)
            const data = await subCategoryService.getSubCategories(id)
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
            await subCategoryService.updateSubCategory(_id, name)
            return responseMiddleware(res, true, 'SubCategory Updated Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Put('')
    async addCategory(req, res){
        try {
            let {name, category} = req.body?.data || {}
            if(!name?.length || !category){
                throw Error("Invalid Request")
            }
            category = new Types.ObjectId(category)
            await subCategoryService.addSubCategory(name, category)
            return responseMiddleware(res, true, 'SubCategory Added Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

}