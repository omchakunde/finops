import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { defaultTestimonials } from "@/lib/defaultHomepageContent";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();

    if ((await Testimonial.countDocuments()) === 0) {
      await Testimonial.insertMany(defaultTestimonials);
    }

    const testimonials = await Testimonial.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      testimonials,
    });
  } catch (error: any) {
    console.log("GET TESTIMONIALS ERROR:", error);

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

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.name || !body.content) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and testimonial content are required",
        },
        {
          status: 400,
        }
      );
    }

    const testimonial = await Testimonial.create({
      name: body.name,
      role: body.role || "",
      content: body.content,
      rating: Math.min(5, Math.max(1, Number(body.rating) || 5)),
      displayOrder: Number(body.displayOrder) || 0,
    });

    return NextResponse.json({
      success: true,
      testimonial,
    });
  } catch (error: any) {
    console.log("CREATE TESTIMONIAL ERROR:", error);

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
