import { Controller, Get, Post, Put } from "@overnightjs/core";
import { Types } from "mongoose";
import courseService from "../services/course.service";
import responseMiddleware from "../utils/response.middleware";

@Controller('course')
export class CourseController {
    @Get('')
    async getCourses(req, res){
        try {
            const data = await courseService.getCourses()
            return responseMiddleware(res, true, '', data)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }

    }

    @Post('')
    async updateCourse(req, res){
        try {
            let {_id, name, categories, subCategories} = req.body?.data || {}
            if(!_id || !name?.length || !categories?.length || !subCategories?.length){
                throw Error("Invalid Request")
            }
            categories = categories.map(id => new Types.ObjectId(id))
            subCategories = subCategories.map(id => new Types.ObjectId(id))
            _id = new Types.ObjectId(_id)
            await courseService.updateCourse(_id, name, categories, subCategories)
            return responseMiddleware(res, true, 'Course Updated Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }

    @Put('')
    async addCourse(req, res){
        try {
            let {name, categories, subCategories} = req.body?.data || {}
            if(!name?.length || !categories?.length || !subCategories?.length){
                throw Error("Invalid Request")
            }
            categories = categories.map(id => new Types.ObjectId(id))
            subCategories = subCategories.map(id => new Types.ObjectId(id))
            await courseService.addCourse(name, categories, subCategories)
            return responseMiddleware(res, true, 'Course Updated Successfully', null)
        } catch (error) {
            return responseMiddleware(res, false, '', error)
        }
    }
}