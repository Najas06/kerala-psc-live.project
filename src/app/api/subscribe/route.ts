import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscriber from "@/lib/models/subscribe";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { success: false, message: "Already subscribed" },
        { status: 409 }
      );
    }

    const newSubscriber = await Subscriber.create({ email });
    return NextResponse.json({
      success: true,
      subscriber: newSubscriber,
      message: "Subscribed successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const subscribers = await Subscriber.find().sort({ createdAt: -1 }).limit(100);
    const count = await Subscriber.countDocuments();
    return NextResponse.json({
      success: true,
      data: subscribers,
      count,
      message: "Subscribed successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Server error",
      status: 500,
    });
  }
}
