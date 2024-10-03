import { Request, Response } from 'express'
import Task from "../models/task.model";

export const index = async (req: Request, res: Response) => {
    interface find {
        deleted: boolean,
        status?: string,
    }

    const find: find = {
        deleted: false,
    }

    if(req.query.status) {
        find.status = req.query.status.toString()
    }

    const tasks = await Task.find(find)

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