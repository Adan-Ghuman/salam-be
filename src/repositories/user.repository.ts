import { Order } from "../models/order.model"
import { NotFoundError } from "../utils/ApiError";

export const verifyUserRepository = async(visaNumber:string)=>{
    const result = await Order.aggregate([
        {
            $match:{"user.visaNumber":visaNumber}
        },
        {
            $project:{
                _id:0,
                visa:"$user",
                package:1,
                sim:1,
            }
        }
    ]);

    if(result.length === 0) throw new NotFoundError("No user found with the provided visa number");

    return result[0];
}