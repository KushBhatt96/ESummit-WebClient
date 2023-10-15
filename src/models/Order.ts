import { Address } from "./Address";

export interface Order {
  orderId: number;
  orderDate: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  expectedDeliveryDate: string;
  status: string;
  address: Address;
  appUserId: string;
}
