import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({//Thiết lập schema
  fullName: String,
  email: String,
  password: String,
  token: String,  
  phone: String,
  avatar: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date
}, {timestamps: true});//Hàm mongoose nếu giá trị là true thì nó sẽ tự động lưu lại [ngày tạo] và khi uppdate nó cg tự động lưu [ngày updata]

const User = mongoose.model("User", usersSchema, "users"); //Kết nối tới collection có tên products

export default User;