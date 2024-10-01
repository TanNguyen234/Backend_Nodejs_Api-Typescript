//File thiết lập schema của product
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({//Thiết lập schema
  title: String,
  status: String,
  content: String,
  timeStart: Date,
  timeFinish: Date,
  createdBy: String,
  listUser: Array,
  taskParentId: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const Tasks = mongoose.model("Tasks", taskSchema, "tasks"); //Kết nối tới collection có tên products

export default Tasks;