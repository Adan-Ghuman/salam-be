import { simType } from "./common.types";

export interface UserDetails {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    passportNumber: string;
    nationality: string;
    visaType: string;
    visaNumber: string;
    issueDate: string;
    expiryDate: string;
}

export interface PackageDetails {
    packageName: string;
    sms?: string;
    data?: string;
    min?: string;
    price: number;
    validity: string;
}

export interface simDetails {
    simType:simType;
    number: string;
}

export interface orderSummary {
    visa:UserDetails,
    package:PackageDetails,
    sim:simDetails
}

export interface DeliveryDetails {
    mainLocation: string;
    subLocation?: string;
}

export interface PaymentDetails {
    orderId: string;
    packageName: string;
    mobileNumber: string;
    dateTime: string;
    paymentMode: string;
    packageFee: number;
    vat: number;
    promoCode?: string;
    totalAmount: number;
    sim: simDetails; 
    delivery?: DeliveryDetails; 
}

