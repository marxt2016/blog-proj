import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({
        error: {
          message: "No such user registered",
          code: 400,
        },
      });

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordMatch)
      return res.status(400).json({
        error: {
          message: "Invalid login data",
          code: 400,
        },
      });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "2h" });

    res.json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: "Generic server error for sign in",
        code: 500,
      },
    });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        error: {
          message: "User alreday registered",
          code: 400,
        },
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        error: {
          message: "Passwords don't match!",
          code: 400,
        },
      });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "1h" });
    res.json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: "Generic server error for sign up",
        code: 500,
      },
    });
  }
};

export const getuser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
