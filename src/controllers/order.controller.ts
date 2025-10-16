import { createOrderService, updatePaymentService } from "../services/order.service";
import { ApiResponse } from "../utils/ApiResponse";
import AsyncHandler from "../utils/AsyncHandler";
import { BadRequestError } from "../utils/ApiError";

export const createOrder= AsyncHandler(async(req,res)=>{
    const orderData = req.body;
    const newOrder = await createOrderService(orderData);
    const response = new ApiResponse({
        success:true,
        message:"Order created successfully",
        data:newOrder,
        statusCode:201
    });
    return response.send(res);
});

export const updatePayment = AsyncHandler(async(req, res) => {
    const { visaNumber, paymentData } = req.body;
    
    if (!visaNumber) {
        throw new BadRequestError("Visa number is required");
    }
    
    if (!paymentData) {
        throw new BadRequestError("Payment data is required");
    }

    const requiredFields = ['packageName', 'mobileNumber', 'paymentMode', 'packageFee', 'totalAmount', 'sim'];
    for (const field of requiredFields) {
        if (!paymentData[field]) {
            throw new BadRequestError(`${field} is required in payment data`);
        }
    }

    if (paymentData.sim === 'psim' && (!paymentData.delivery || !paymentData.delivery.mainLocation)) {
        throw new BadRequestError("Delivery details with mainLocation are required for physical SIM");
    }

    const updatedOrder = await updatePaymentService(visaNumber, paymentData);
    
    const response = new ApiResponse({
        success: true,
        message: "Payment updated successfully",
        data: updatedOrder,
        statusCode: 200
    });
    
    return response.send(res);
});
