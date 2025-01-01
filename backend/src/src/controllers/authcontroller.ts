import { Request, Response } from 'express';
import { loginService } from '../services/auth';
import User from '../models/user';
export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginService(email, password);

    res.json({ message: 'Login successful', token });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
export const signUpController=async (req:Request,res:Response)=>{
  try {
    const {name,email, password } = req.body;
    
    // const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ name, email, password });

    res.status(201).json({ message: 'User created successfully', user });


  } catch (error:any) {
    res.json({ message: "error.message" });
  }
}

