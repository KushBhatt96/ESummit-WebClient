import { Product } from "./Product";

export interface CartItem {
  cartItemId: number;
  productId: number;
  cartId: number;
  product: Product;
  quantity: number;
  totalPrice: number;
}
