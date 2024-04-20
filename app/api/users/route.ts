import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let users = [] as User[];
  try {
    users = await prisma.user.findMany({ orderBy: { name: "asc" } });
    console.log("Fetched users:", users);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Error in retreiving users. Please review your request body, header or cookies",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Ensures the response is not cached
        },
      }
    );
  }
  if (typeof users == "undefined") {
    return NextResponse.json(
      { message: "No users found in the workspace" },
      {
        status: 404,
        statusText: "No users found!",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store", // Ensures the response is not cached
        },
      }
    );
  }
  return NextResponse.json(users, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store", // Ensures the response is not cached
    },
  });
}

export const dynamic = "force-dynamic"; //This is to make Next.js opt out of static rendering of this API route
export const revalidate = 0;
