import dbConnect from "@/lib/db";
import Article from "@/lib/models/article";
import articleSchema from "@/lib/validation/articleSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    /* Using Zod validation instead of mongoose Schame validaion */ 
    const parsed = articleSchema.safeParse(body); 
    // i am using safeParse() it will return either success: true(return data)/false(return error) 

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors, /* make an array of erros and sends response */
          status: 400,
        },
        { status: 400 }
      );
    }

    const article = await Article.create(parsed.data);

    return NextResponse.json({
      success: true,
      data: article,
      message: "Article created successfully",
      status: 201,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create article",
      status: 500,
      error,
    }, { status: 500 });
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
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch articles",
      status: 500,
      error,
    }, { status: 500 });
  }
}
