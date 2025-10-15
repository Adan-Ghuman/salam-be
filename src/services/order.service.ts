import { createOrder, updateOrderPayment } from "../repositories/order.repository";
import { Order as IOrder} from "../types/order.types";
import { PaymentDetails } from "../types/detail.types";
import { ApiError, NotFoundError } from "../utils/ApiError";

export const createOrderService = async(
    orderData:IOrder
):Promise<IOrder>=>{
    try {
        const order = await createOrder(orderData);
        return order;
    } catch (error:any) {
        throw new ApiError(500, "Error creating order", "ORDER_CREATION_ERROR", error.message);
    }
};

export const updatePaymentService = async(
    visaNumber: string,
    paymentData: PaymentDetails
): Promise<IOrder> => {
    try {
        // Add timestamp to payment
        paymentData.dateTime = new Date().toISOString();

        const updatedOrder = await updateOrderPayment(visaNumber, paymentData);
        
        if (!updatedOrder) {
            throw new NotFoundError("No order found for the provided visa number");
        }

        return updatedOrder;
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new ApiError(500, "Error updating payment", "PAYMENT_UPDATE_ERROR", error.message);
    }
};
