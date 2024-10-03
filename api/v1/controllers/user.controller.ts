import { Request, Response } from 'express'
import md5 from 'md5';
import User from '../models/user.model'
import { generateRandomString } from '../../../helpers/generate';

//[POST] /api/v1/users/register
export const register = async (req: Request, res: Response) => {
  var { fullName, email, password } = req.body;
  password = md5(password);

  const existEmail = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!existEmail) {
    const user = new User({
      fullName: fullName,
      email: email,
      password: password,
      token: generateRandomString(30),
    });

    await user.save();

    const token = user.token;
    res.cookie("token", token);
    //Trả cookie về cho FE

    res.json({
      code: 200,
      message: "Đăng ký thành công",
      token: token,
    });
  } else {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
  }
}

export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email
    const password: string = req.body.password;

    const user = await User.findOne({
      email: email,
      deleted: false,
    });
  
    if (!user) {
      res.json({
        code: 400,
        message: "Email không tồn",
      });
      return;
    }
  
    if (md5(password) !== user.password) {
      res.json({
        code: 400,
        message: "Mật khẩu không đúng",
      });
      return;
    }
    
    //Trả cookie về cho FE
    const token = user.token;
    res.cookie("token", token);
  
    res.json({
      code: 200,
      message: "Đăng nhập thành công",
      token: token,
    });
}

export const detail = async (req: Request, res: Response) => {
   res.json({
        code: 200,
        message: "Thành công",
        info: req.user
     })
}