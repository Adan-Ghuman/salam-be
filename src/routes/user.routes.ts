import { Router } from "express";
import {verifyUser} from "../controllers/user.controller";

const router = Router();

router.post("/verify",verifyUser);

export default router;