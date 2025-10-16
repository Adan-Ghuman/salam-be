import { verifyUserRepository } from "../repositories/user.repository";

export const verifyUserAndGetOrderService = async(visaNumber:string)=>{
console.log("visa number....", visaNumber);
    const orderSummary = await verifyUserRepository(visaNumber);
    return orderSummary;
}