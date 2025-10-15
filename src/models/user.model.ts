import { model, Schema } from "mongoose";
import { UserDetails } from "../types/detail.types";

export const userSchema = new Schema<UserDetails>({
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passportNumber: { type: String, required: true, unique: true },
    nationality: { type: String, required: true },
    visaType: { type: String, required: true },
    visaNumber: { type: String, required: true, unique: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String, required: true }
},{
    timestamps:true
});

const User = model<UserDetails>('User', userSchema);
export default User;