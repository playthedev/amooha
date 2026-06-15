import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const orderLineSchema = new Schema(
  {
    slug: { type: String, required: true },
    variantId: { type: String, required: true },
    name: { type: String, required: true },
    variantLabel: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    unitPriceInr: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User", index: true },

    lines: { type: [orderLineSchema], required: true },

    /** Authoritative subtotal in BASE_CURRENCY (INR), recomputed server-side. */
    subtotalInr: { type: Number, required: true, min: 0 },

    /** Currency and amount actually sent to Razorpay for this order. */
    currency: { type: String, required: true },
    amountMinor: { type: Number, required: true, min: 0 },

    razorpayOrderId: { type: String, required: true, unique: true, index: true },
    razorpayPaymentId: { type: String, default: null },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
      required: true,
    },

    shipping: {
      fullName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      stateRegion: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export type OrderDocument = InferSchemaType<typeof orderSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Order: Model<OrderDocument> =
  (mongoose.models.Order as Model<OrderDocument>) ||
  mongoose.model<OrderDocument>("Order", orderSchema);
