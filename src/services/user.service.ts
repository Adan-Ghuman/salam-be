import { verifyUserRepository } from "../repositories/user.repository";

export const verifyUserAndGetOrderService = async(visaNumber:string)=>{
    const orderSummary = await verifyUserRepository(visaNumber);
    return orderSummary;
}