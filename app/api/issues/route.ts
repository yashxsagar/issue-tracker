// An API end-point for users to create issues using
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createIssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  let body = {} as z.infer<typeof createIssueSchema>;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message:
          "You are not authorized to create a new Issue. Please review the Autnetication Header and Cookies",
      },
      { status: 401, statusText: "Unauthorized" }
    );
  }
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid Issue Object with proper shape and contents",
      },
      { status: 400, statusText: "Invalid Object" }
    );
  }
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      // { error: validation.error.errors },
      { error: validation.error.format },
      { status: 400, statusText: "Invalid Request" }
    );
  }
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
      status: body?.status,
    },
  });
  return NextResponse.json(
    {
      message: "Issue Object created successfully!",
      issue: newIssue,
    },
    { status: 201 }
  );
}
