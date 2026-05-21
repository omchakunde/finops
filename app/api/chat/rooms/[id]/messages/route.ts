import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ChatRoom from "@/models/ChatRoom";
import Message from "@/models/Message";

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    const messages = await Message.find({
      roomId: params.id,
    }).sort({
      createdAt: 1,
    });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error: any) {
    console.log("GET CHAT MESSAGES ERROR:", error);

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

export async function POST(
  req: Request,
  { params }: any
) {
  try {
    await connectDB();

    const body = await req.json();

    if (!body.text?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required",
        },
        {
          status: 400,
        }
      );
    }

    const message = await Message.create({
      roomId: params.id,
      senderId: body.senderId || "guest",
      senderName: body.senderName || "Guest",
      senderRole: body.senderRole || "user",
      text: body.text.trim(),
    });

    const room = await ChatRoom.findById(params.id);

    if (room) {
      room.lastMessage = body.text.trim();
      room.updatedAt = new Date();

      if (
        body.senderId &&
        !room.participants.map(String).includes(String(body.senderId))
      ) {
        room.participants.push(body.senderId);
      }

      await room.save();
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error: any) {
    console.log("SEND CHAT MESSAGE ERROR:", error);

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
