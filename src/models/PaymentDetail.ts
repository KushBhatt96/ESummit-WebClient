export interface PaymentDetail {
  paymentDetailId: number;
  cardholderName: string;
  cardType: CardType;
  number: number;
  expiration: string;
  cVV: string;
  zipCode: string;
  appUserId: string;
}

type CardType = "Visa" | "Mastercard" | "Amex";
