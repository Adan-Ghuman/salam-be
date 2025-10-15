import { verifyUserAndGetOrderService } from "../services/user.service";
import { BadRequestError, NotFoundError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";

export const verifyUser = AsyncHandler(async(req,res)=>{
    const {visaNumber} = req.body;
    if(!visaNumber) throw new BadRequestError("Visa number is required");

    const orderSummary = await verifyUserAndGetOrderService(visaNumber);

    if(!orderSummary) throw new NotFoundError("No order found for the provided visa number");

    const response= new ApiResponse({
        success:true,
        message:"User verified successfully",
        data:orderSummary,
        statusCode:200
    });
    return response.send(res);
});