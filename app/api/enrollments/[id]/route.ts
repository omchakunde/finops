import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Enrollment from "@/models/Enrollment";

export async function PUT(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedEnrollment =
      await Enrollment.findByIdAndUpdate(
        params.id,
        {
          batchName: body.batchName || "",
          status: body.status || "enrolled",
          batchAssignedAt: body.batchName ? new Date() : null,
        },
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      enrollment: updatedEnrollment,
    });
  } catch (error: any) {
    console.log("UPDATE ENROLLMENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
