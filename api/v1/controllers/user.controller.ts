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