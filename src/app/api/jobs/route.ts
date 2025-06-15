import dbConnect from "@/lib/db";
import Job from "@/lib/models/job";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const job = await Job.create(body);
    return NextResponse.json({
      success: true,
      data: job,
      message: "Job created successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create job",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find();
    const count = await Job.countDocuments();
    return NextResponse.json({
      success: true,
      data: jobs,
      count,
      message: "Jobs fetched successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch jobs",
      status: 500,
    });
  }
}
