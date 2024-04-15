import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let users = [] as User[];
  try {
    users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Error in retreiving users. Please review your request body, header or cookies",
      },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
  if (typeof users == "undefined") {
    return NextResponse.json(
      { message: "No users found in the workspace" },
      { status: 404, statusText: "No users found!" }
    );
  }
  return NextResponse.json(users);
}
