
import { Router } from "express";
import {createOrder, updatePayment} from "../controllers/order.controller";
const router = Router();

router.post("/", createOrder);
router.patch("/payment", updatePayment);

export default router;