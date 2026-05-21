import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

import Message from "@/models/Message";
import ChatRoom from "@/models/ChatRoom";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      roomId,
      senderId,
      text,
    } = body;

    // save message
    const message = await Message.create({
      roomId,
      senderId,
      senderName: body.senderName || "",
      senderRole: body.senderRole || "user",
      text,
    });

    // update room latest msg
    await ChatRoom.findByIdAndUpdate(roomId, {
      lastMessage: text,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message,
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
