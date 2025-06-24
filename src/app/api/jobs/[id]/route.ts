import dbConnect from "@/lib/db";
import Job from "@/lib/models/job";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();

    const job = await Job.findById(params.id);

    if (!job) {
      return NextResponse.json(
        { 
          success: false,
          message: "Job not found"
        },{ status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
      message: "Job fetched successfully",
      status: 200,
    }, { status : 200 });
  } catch (error) {
    console.error("Fetch Job Error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "Failed to fetch job",
        status: 500 
      },{ status: 500 }
    );
  }
}
