import { Types } from 'mongoose';

export type IOrderItem = {
  product: Types.ObjectId;
  unitPrice: number;
  quantity: number;
  subtotal: number;
};
export type ICustomer = {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  email?: string | null;
  orderNotes?: string | null;
};
export type OrderStatus =
  | 'Pending Confirmation'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';
export type PaymentMethod = 'Cash on Delivery';
//   | 'Mobile Banking (bKash/Nagad/Rocket)'
//   | 'Bank Transfer';

export type PaymentStatus = 'Unpaid' | 'Paid' | 'Refunded';
export interface IOrder {
  orderNumber: string; // e.g. RBT-2026-X8P9412
  customer: ICustomer;
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  whatsappQueryUrl?: string;
  clientIp?: string;
}
