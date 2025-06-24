import dbConnect from "@/lib/db";
import Job from "@/lib/models/job";
import jobSchema from "@/lib/validation/jobSchema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    /* Using Zod validation instead of mongoose Schame validaion */ 
    const parsed = jobSchema.safeParse(body); 
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

    const job = await Job.create(parsed.data);

    return NextResponse.json({
      success: true,
      data: job,
      message: "Job created successfully",
      status: 201,
    }, { status : 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create job",
      status: 500,
    }, { status : 500 });
  }
}


/* TTFB - time to first byte is 1sec */
export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find();
    const count = await Job.countDocuments();
    const latestJobs = await Job.find().sort({ createdAt: -1 }).limit(8);
    const tenthLevel = await Job.find({ education: "10th pass" }).sort({
      createdAt: -1,
    });
    const twelfthLevel = await Job.find({ education: "12th pass" }).sort({
      createdAt: -1,
    });
    const degreeLevel = await Job.find({ education: "Degree" }).sort({
      createdAt: -1,
    });
    const postGraduateLevel = await Job.find({
      education: "Post Graduation",
    }).sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      data: jobs,
      count,
      message: "Jobs fetched successfully",
      status: 200,
      latestJobs,
      tenthLevel,
      twelfthLevel,
      degreeLevel,
      postGraduateLevel,
    }, { status : 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch jobs",
      status: 500,
    }, { status : 500 });
  }
}

