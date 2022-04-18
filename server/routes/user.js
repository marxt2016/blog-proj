import express from "express";
import { signin, signup, getuser } from "../controllers/user.js ";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:id", getuser);

export default router;
