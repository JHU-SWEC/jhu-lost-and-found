import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user: IUser = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id.toString(), user.name),
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString(), user.name),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
