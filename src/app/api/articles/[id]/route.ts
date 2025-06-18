import dbConnect from "@/lib/db";
import Article from "@/lib/models/article";
import { NextResponse } from "next/server";
interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();
    const article = await Article.findById(params.id);
    return NextResponse.json({
      success: true,
      data: article,
      message: "Article fetched successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch article",
      status: 500,
      error
    });
  }
}
