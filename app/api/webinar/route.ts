import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getResendClient } from "@/lib/resend";
import Webinar from "@/models/Webinar";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const newEntry = await Webinar.create(body);
    const resend = getResendClient();

    if (resend && body.email) {
      await resend.emails.send({
        from: "FinOps <onboarding@resend.dev>",
        to: body.email,
        subject: "Webinar Booking Confirmed",
        html: `
          <h2>Booking Confirmed</h2>
          <p>You have successfully registered for:</p>
          <b>${body.webinarTitle}</b>
          <p>Date: ${body.date}</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      entry: newEntry,
    });
  } catch (err) {
    console.log("WEBINAR BOOKING ERROR:", err);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
