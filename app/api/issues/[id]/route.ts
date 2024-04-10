import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let issue = {} as Issue | null;
  let body = {} as z.infer<typeof createIssueSchema>;
  try {
    issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
    // const body = await request.json();
  } catch (error: any) {
    return NextResponse.json(
      { error: `No such Issue object with the id: ${id} found` },
      {
        statusText: "Resource not found!",
        status: 404,
      }
    );
  }
  if (typeof issue?.id == "undefined") {
    return NextResponse.json(
      { error: `No such Issue object with the id: ${id} found` },
      { status: 404, statusText: "Resource not found!" }
    );
  }
  try {
    body = await request.json();
  } catch (error: any) {
    return NextResponse.json(
      {
        error:
          "Please provide a valid Issue object with proper shape and contents",
      },
      { status: 400, statusText: "Invalid Object" }
    );
  }
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400, statusText: "Inavalid Request" }
    );
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue?.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(
    {
      message: "Issue updated susccessfully",
      updatedIssue: updatedIssue,
    },
    { status: 202, statusText: "Object updated susccessfully" }
  );
}
