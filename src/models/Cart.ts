import { CartItem } from "./CartItem";

export interface Cart {
  cartId: number;
  createdAt: string;
  lastUpdated: string;
  cartTotal: number;
  customerId: number;
  cartItems: CartItem[];
}
