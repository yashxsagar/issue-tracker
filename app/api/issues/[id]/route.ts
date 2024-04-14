import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "@/app/validationSchemas";
import { any, z } from "zod";
import delay from "delay";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
export async function PATCH(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let issue = {} as Issue | null;
  let body = {} as z.infer<typeof createIssueSchema>;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message:
          "You are not authorized to updated Issues. Please review the Autnetication Header and Cookies",
      },
      { status: 401, statusText: "Unauthorized" }
    );
  }
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

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  let issue = {} as Issue | null;
  // let body = undefined;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        message:
          "You are not authorized to delete issues. Please review the Autnetication Header and Cookies",
      },
      { status: 401, statusText: "Unauthorized" }
    );
  }
  await delay(1000); //This is done in order to improve the User Experience for the delete action
  if (isNaN(Number(id))) {
    return NextResponse.json(
      { error: `No such Issue Object with the Id: ${id} found!` },
      { status: 404, statusText: "Resource not found" }
    );
  }
  try {
    issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  } catch (error: any) {
    return NextResponse.json(
      { error: `No such Issue Object with the Id: ${id} found!` },
      { status: 404, statusText: "Resource not found" }
    );
  }
  if (typeof issue?.id == "undefined") {
    return NextResponse.json(
      { error: `No such Issue Object with the Id: ${id} found!` },
      { status: 404, statusText: "Resource not found" }
    );
  }

  const deletedIssue = await prisma.issue.delete({
    where: { id: issue?.id },
  });
  return NextResponse.json(
    { message: "Issue deleted successfully", deletedIssue: deletedIssue },
    { status: 200, statusText: "Deletion Successful" }
  );

  // Analysis of the request object body in order to determine that it's null/empty or not -->
  // Currently fetching a bunch of errors in PostMan and axios.delete() call via the DeleteIssueButton.tsx
  // if (request.body) {
  //   try {
  //     body = await request.json();
  //   } catch (error: any) {
  //     if (body == undefined || body == null) {
  //       return NextResponse.json(
  //         {
  //           error: `Please don't provide a body in the DEL request for issue: ${id}`,
  //         },
  //         { status: 400, statusText: "Invalid Request Object" }
  //       );
  //     }
  //     return NextResponse.json(
  //       {
  //         error: `Please don't provide a body in the DEL request for issue: ${id}`,
  //       },
  //       { status: 400, statusText: "Invalid Request Object" }
  //     );
  //   }
  //   if (Object.getOwnPropertyNames(body).length !== 0) {
  //     return NextResponse.json(
  //       { error: "The DEL request body should not contain any data" },
  //       { status: 400, statusText: "Invalid Request" }
  //     );
  //   }
  // }
}
