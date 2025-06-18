import dbConnect from "@/lib/db";
import Article from "@/lib/models/article";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const article = await Article.create(body);
    return NextResponse.json({
      success: true,
      data: article,
      message: "Article created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create article",
      status: 500,
      error,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const articles = await Article.find().sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      data: articles,
      message: "Articles fetched successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch articles",
      status: 500,
      error,
    });
  }
}
