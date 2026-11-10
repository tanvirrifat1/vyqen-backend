import { model, Schema } from "mongoose";
import { IInquiry } from "./contactus.interface";

const inquirySchema = new Schema<IInquiry>(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'resolved'],
            default: 'new',
        },
    },
    { timestamps: true }
);

export const inquiry = model<IInquiry>('Contactus', inquirySchema);