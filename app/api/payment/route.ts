import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {

    // ✅ Create instance INSIDE function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const options = {
      amount: 50000,
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);

  } catch (error) {
    console.error("PAYMENT ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Payment failed" },
      { status: 500 }
    );
  }
}