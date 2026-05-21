import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, sessionToken, deviceId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (
      user &&
      user.sessionToken === sessionToken &&
      user.activeDevice === deviceId
    ) {
      user.sessionToken = "";
      user.activeDevice = "";
      user.isLoggedIn = false;
      user.lastLogoutAt = new Date(); // ✅ Updated to log tracking timestamp

      await user.save();
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}