import { Document, model, Schema } from "mongoose";
import { PackageDetails, PaymentDetails, simDetails, UserDetails } from "../types/detail.types";

export interface IOrder extends Document {
    user:UserDetails;
     package:PackageDetails;
        sim:simDetails;
        payment?:PaymentDetails
}

const orderSchema = new Schema<IOrder>({
    user:{
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passportNumber: { type: String, required: true },
        nationality: { type: String, required: true },
        visaType: { type: String, required: true },
        visaNumber: { type: String, required: true },
        issueDate: { type: String, required: true },
        expiryDate: { type: String, required: true }
    },

    package:{
        packageName: { type: String, required: true },
        sms: { type: String },
        data: { type: String },
        min: { type: String },
        price: { type: Number, required: true },
        validity: { type: String}
    },
    sim:{
        simType:{type:String, enum:["esim","psim"], required:true},
        number:{type:String, required:true}
    },
    payment:{
        type: {
            orderId: { type: String, required: true },
            packageName: { type: String},
            mobileNumber: { type: String },
            dateTime: { type: String },
            paymentMode: { type: String },
            packageFee: { type: Number },
            vat: { type: Number },
            promoCode: { type: String },
            totalAmount: { type: Number },
            sim:{type:String,enum:["esim","psim"]},
            delivery: {
                type: {
                    mainLocation: { type: String, required: true },
                    subLocation: { type: String }
                },
                required: false
            }
        },
        required: false
    }
},{
    timestamps:true
});

export const Order =  model<IOrder>('Order', orderSchema);