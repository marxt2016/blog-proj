import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "No such user registered" });

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch) return res.status(400).json({ message: "Invalid login data" });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "2h" });

    res.json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Generic server error for sign in" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User alreday registered" });

    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
    res.json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Generic server error for sign up" });
  }
};
