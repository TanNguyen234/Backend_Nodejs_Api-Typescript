import { Request, Response } from 'express'
import Task from "../models/task.model";
import paginationHelper from '../../../helpers/pagination';


export const index = async (req: Request, res: Response) => {
    //Find
    interface Find {
        deleted: boolean,
        status?: string,
    }

    const find: Find = {
        deleted: false,
    }

    if(req.query.status) {
        find.status = req.query.status.toString()
    }
    //End Find
    //Sort
    interface Sort {
        [key: string]: any;//Đánh dấu chỉ mục là chuỗi trước khi gán vào
    }
    const sort: Sort = {}

    if(req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey.toLocaleString();
        sort[sortKey] = req.query.sortValue;
    }
    //End Sort
    //Pagination
    const countTasks: number = await Task.countDocuments(find); // Hàm count trong mongoose để tổng số sản phẩm
    let initPagination = {
        currentPage: 1,
        limitItem: 2
    }

    let objectPagination = paginationHelper(initPagination, req.query, countTasks)
    //End Pagination
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip)

    res.json({
        code: 200,
        tasks: tasks
    })
}

export const detail = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const task = await Task.findOne({
        _id: id,
        deleted: false,
    })

    res.json({
        code: 200,
        task: task
    })
}