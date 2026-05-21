import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Course from "@/models/Course";

// GET SINGLE COURSE
export async function GET(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    const course =
      await Course.findById(
        params.id
      );

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);

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

// UPDATE COURSE
export async function PUT(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedCourse =
      await Course.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      course: updatedCourse,
    });
  } catch (error) {
    console.log(error);

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

// DELETE COURSE
export async function DELETE(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    await Course.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

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