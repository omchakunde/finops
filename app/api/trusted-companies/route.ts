import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { defaultTrustedCompanies } from "@/lib/defaultHomepageContent";
import TrustedCompany from "@/models/TrustedCompany";

export async function GET() {
  try {
    await connectDB();

    if ((await TrustedCompany.countDocuments()) === 0) {
      await TrustedCompany.insertMany(defaultTrustedCompanies);
    }

    const trustedCompanies = await TrustedCompany.find().sort({
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      trustedCompanies,
    });
  } catch (error: any) {
    console.log("GET TRUSTED COMPANIES ERROR:", error);

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

    if (!body.name || !body.logo) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and logo are required",
        },
        {
          status: 400,
        }
      );
    }

    const trustedCompany = await TrustedCompany.create({
      name: body.name,
      logo: body.logo,
      website: body.website || "",
      displayOrder: Number(body.displayOrder) || 0,
    });

    return NextResponse.json({
      success: true,
      trustedCompany,
    });
  } catch (error: any) {
    console.log("CREATE TRUSTED COMPANY ERROR:", error);

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
