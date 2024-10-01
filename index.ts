import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import * as database from './config/database'
import Tasks from "./models/task.model"

dotenv.config()

database.connect() // kết nối với database

const app: Express = express();
const port: number | string = process.env.PORT || 3000

app.get('/tasks', async (req: Request, res: Response) => {
    const tasks = await Tasks.find({
        deleted: false,
    })

    res.json({
        code: 200,
        tasks: tasks
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})