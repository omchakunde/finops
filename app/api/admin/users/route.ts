import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";

import { connectDB } from "@/lib/mongodb";
import { sendEmail } from "@/lib/email";
import User from "@/models/User";

async function verifyAdmin(userId: string, sessionToken: string, deviceId: string) {
  if (!userId || !sessionToken || !deviceId) return null;

  const admin = await User.findById(userId);

  if (
    !admin ||
    admin.role !== "admin" ||
    !admin.isLoggedIn ||
    admin.sessionToken !== sessionToken ||
    admin.activeDevice !== deviceId
  ) {
    return null;
  }

  return admin;
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const admin = await verifyAdmin(
      searchParams.get("userId") || "",
      searchParams.get("sessionToken") || "",
      searchParams.get("deviceId") || ""
    );

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Only an active admin can view admin members",
        },
        { status: 401 }
      );
    }

    // Consolidated fields selection including the new invitation tracking properties
    const admins = await User.find({ role: "admin" })
      .select("_id name email role passwordSetupRequired inviteSentAt createdAt updatedAt")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      admins,
    });
  } catch (error: any) {
    console.log("GET ADMIN USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to load admin members",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();

    const admin = await verifyAdmin(
      body.userId || "",
      body.sessionToken || "",
      body.deviceId || ""
    );

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Only an active admin can create another admin",
        },
        { status: 401 }
      );
    }

    // Checking only for name and email now, as password will be set via invitation link
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "A user with this email already exists",
        },
        { status: 400 }
      );
    }

    // Generate secure registration tokens and a heavy setup fallback placeholder password
    const setupToken = randomBytes(32).toString("hex");
    const setupTokenHash = createHash("sha256").update(setupToken).digest("hex");
    const placeholderPassword = await bcrypt.hash(randomBytes(24).toString("hex"), 10);
    const setupLink = `${new URL(req.url).origin}/admin/set-password?token=${setupToken}`;

    const newAdmin = await User.create({
      name,
      email,
      password: placeholderPassword,
      role: "admin",
      sessionToken: "",
      activeDevice: "",
      isLoggedIn: false,
      passwordSetupRequired: true,
      passwordSetupToken: setupTokenHash,
      passwordSetupExpires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Valid for 24 hours
      invitedBy: String(admin._id),
      inviteSentAt: new Date(),
    });

    // Send out invitation email via the helper utility
    const emailResult = await sendEmail({
      to: email,
      subject: "Set your FinOps admin password",
      text: `Hello ${name}, set your FinOps admin password using this link: ${setupLink}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2>You have been invited as a FinOps admin</h2>
          <p>Hello ${name},</p>
          <p>${admin.name || "An existing admin"} added you as an admin member. Use the button below to create your password.</p>
          <p>
            <a href="${setupLink}" style="display:inline-block;background:#06b6d4;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:700">
              Set Admin Password
            </a>
          </p>
          <p>This link expires in 24 hours.</p>
          <p>If the button does not work, open this link:<br />${setupLink}</p>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: emailResult.ok
          ? "Admin invitation sent successfully"
          : "Admin created, but email could not be sent. Check email settings.",
        emailSent: emailResult.ok,
        // Expose setupLink directly to help developers if their mail dispatcher fails during local builds
        setupLink: emailResult.ok ? undefined : setupLink,
        admin: {
          _id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          role: newAdmin.role,
          passwordSetupRequired: newAdmin.passwordSetupRequired,
          inviteSentAt: newAdmin.inviteSentAt,
          createdAt: newAdmin.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("CREATE ADMIN USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create admin member",
      },
      { status: 500 }
    );
  }
}