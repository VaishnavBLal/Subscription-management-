export type Role = "ADMIN" | "STAFF" | "CUSTOMER";
export const Role = {
  ADMIN: "ADMIN" as const,
  STAFF: "STAFF" as const,
  CUSTOMER: "CUSTOMER" as const,
};

export type ProductType = "SERVICE" | "SOFTWARE" | "HARDWARE";
export const ProductType = {
  SERVICE: "SERVICE" as const,
  SOFTWARE: "SOFTWARE" as const,
  HARDWARE: "HARDWARE" as const,
};

export type BillingFrequency = "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
export const BillingFrequency = {
  DAILY: "DAILY" as const,
  WEEKLY: "WEEKLY" as const,
  MONTHLY: "MONTHLY" as const,
  YEARLY: "YEARLY" as const,
};

export type SubscriptionStatus =
  | "DRAFT"
  | "QUOTATION"
  | "CONFIRMED"
  | "ACTIVE"
  | "PAUSED"
  | "CLOSED";
export const SubscriptionStatus = {
  DRAFT: "DRAFT" as const,
  QUOTATION: "QUOTATION" as const,
  CONFIRMED: "CONFIRMED" as const,
  ACTIVE: "ACTIVE" as const,
  PAUSED: "PAUSED" as const,
  CLOSED: "CLOSED" as const,
};

export type DiscountType = "FIXED" | "PERCENTAGE";
export const DiscountType = {
  FIXED: "FIXED" as const,
  PERCENTAGE: "PERCENTAGE" as const,
};

export type DiscountScope = "PRODUCT" | "SUBSCRIPTION";
export const DiscountScope = {
  PRODUCT: "PRODUCT" as const,
  SUBSCRIPTION: "SUBSCRIPTION" as const,
};

export type InvoiceStatus = "DRAFT" | "CONFIRMED" | "PAID" | "CANCELLED";
export const InvoiceStatus = {
  DRAFT: "DRAFT" as const,
  CONFIRMED: "CONFIRMED" as const,
  PAID: "PAID" as const,
  CANCELLED: "CANCELLED" as const,
};

export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID" | "OVERDUE";
export const PaymentStatus = {
  UNPAID: "UNPAID" as const,
  PARTIAL: "PARTIAL" as const,
  PAID: "PAID" as const,
  OVERDUE: "OVERDUE" as const,
};

export type PaymentMethod =
  | "CREDIT_CARD"
  | "BANK_TRANSFER"
  | "PAYPAL"
  | "CASH"
  | "CHEQUE";
export const PaymentMethod = {
  CREDIT_CARD: "CREDIT_CARD" as const,
  BANK_TRANSFER: "BANK_TRANSFER" as const,
  PAYPAL: "PAYPAL" as const,
  CASH: "CASH" as const,
  CHEQUE: "CHEQUE" as const,
};
