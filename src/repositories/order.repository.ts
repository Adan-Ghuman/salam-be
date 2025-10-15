import { Order } from "../models/order.model";
import { Order as IOrder} from "../types/order.types";
import { PaymentDetails } from "../types/detail.types";

export const createOrder = async(orderData:IOrder):Promise<IOrder>=>{
    const order = new Order(orderData);
    if(order.payment) order.payment.orderId = `${Math.floor(100000 + Math.random() * 900000)}`;
    await order.save();
    return order;
}

export const updateOrderPayment = async(
    visaNumber: string, 
    paymentData: PaymentDetails
): Promise<IOrder | null> => {

    if (!paymentData.orderId) {
        paymentData.orderId = `${Math.floor(100000 + Math.random() * 900000)}`;
    }

    const order = await Order.findOneAndUpdate(
        { "user.visaNumber": visaNumber },
        { 
            $set: { 
                payment: paymentData 
            } 
        },
        { new: true } 
    );

    return order;
}
