import { Request, Response } from 'express'
import Task from "../models/task.model";
import paginationHelper from '../../../helpers/pagination';
import searchHelper from '../../../helpers/search';

//[GET] /api/v1/tasks
export const index = async (req: Request, res: Response) => {
    //Find
    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
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
        limitItem: 2,
        skip: 0
    }

    let objectPagination = paginationHelper(initPagination, req.query, countTasks)
    //End Pagination
    //Search
    let objectSearch = searchHelper(req.query)

    if(req.query.keyword) {
        find.title = objectSearch.regex
    }
    //End Search
    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip ?? 0)

    res.json({
        code: 200,
        tasks: tasks
    })
}
//[GET] /api/v1/tasks/detail/:id
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

//[PATCH] /api/v1/tasks/change-status/:id
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status

        await Task.updateOne({
            _id: id
        },{
            status: status
        })
    
        res.json({
            code: 200,//success
            message: "Cập nhật trạng thái thành công"
        })
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Không tồn tại"
        })
    }
}

//[PATCH] /api/v1/tasks/change-multi
export const changeMulti = async (req: Request, res: Response) => {
    enum Key {
        STATUS = "status",
        DELETE = "delete",
    }

    try {
        const ids: string[] = req.body.ids;
        const key: string = req.body.key;
        const value: string = req.body.value

        switch (key) {
            case Key.STATUS:
                await Task.updateMany({
                    _id: { $in: ids}
                },{
                    status: value
                })

                res.json({
                    code: 200,//success
                    message: "Cập nhật trạng thái thành công"
                })
                
                break;
            case Key.DELETE:
                await Task.updateMany({
                    _id: { $in: ids}
                },{
                    deleted: true,
                    deleteAt: Date.now()
                })
                
                res.json({
                    code: 200,//success
                    message: "Xóa thành công"
                })

                break;

            default:
                res.json({
                    code: 400,//fail
                    message: "Không tồn tại"
                })

                break;
        }
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Không tồn tại"
        })
    }
}

//[POST] /api/v1/tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        const task = new Task(req.body)
        const data = await task.save()

        res.json({
            code: 200,
            message: "Tạo thành công!",
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}

//[PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id

        await Task.updateOne({
            _id: id
        }, req.body)

        res.json({
            code: 200,
            message: "Cập nhật thành công!",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}

//[DELETE] /api/v1/tasks/delete/:id
export const deleteTask = async (req: Request, res: Response) => {//Ts: phải khác tên key trong js
    try {
        const id: string = req.params.id

        await Task.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteAt: Date.now()
        })

        res.json({
            code: 200,
            message: "Xóa thành công!",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi"
        })
    }
}