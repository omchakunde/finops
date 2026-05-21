import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Course from "@/models/Course";

// ======================
// GET ALL COURSES
// ======================

export async function GET() {
  try {
    // CONNECT DATABASE
    await connectDB();

    // FETCH COURSES
    const courses = await Course.find().sort({
      createdAt: -1,
    });

    // SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error: any) {
    console.log("GET COURSES ERROR:", error);

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

// ======================
// CREATE COURSE
// ======================

export async function POST(req: Request) {
  try {
    // CONNECT DATABASE
    await connectDB();

    // GET BODY DATA
    const body = await req.json();

    // CREATE COURSE
    const course = await Course.create(body);

    // SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error: any) {
    console.log("CREATE COURSE ERROR:", error);

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