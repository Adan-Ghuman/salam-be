import { PackageDetails, PaymentDetails, simDetails, UserDetails } from "./detail.types";

export interface Order{
    user:UserDetails;
    package:PackageDetails;
    sim:simDetails;
    payment?:PaymentDetails
}