import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import * as database from './config/database';
import mainV1Routes from "./api/v1/routes/index.route";
declare global {
    namespace Express {
      interface Request {
        user?: any;  // Thay 'any' bằng kiểu chính xác nếu bạn biết rõ kiểu của 'user'
      }
    }
} //Mở rộng request của express
  
dotenv.config()

database.connect() // kết nối với database

const app: Express = express();
const port: number | string = process.env.PORT || 3000

// var corsOptions = {
//     origin: 'http://example.com',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }    
// app.use(cors(corsOptions));
app.use(cors()) // enable cors

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mainV1Routes(app)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})