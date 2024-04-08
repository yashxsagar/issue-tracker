// "use client";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { Badge, Blockquote, Callout, Heading, Text } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};
const page = async ({ params: { id } }: Props) => {
  //   const [error, setError] = useState("");
  //   if (typeof parseInt(id) == "integer") {
  //     notFound();
  //   }
  let issue = {} as Issue | null;
  try {
    issue = await prisma.issue.findUnique({
      where: { id: parseInt(id) },
    });
  } catch (error: any) {
    console.log(error);
    notFound();
    // setError(JSON.stringify(error));
  }
  if (!issue) {
    notFound();
  }

  return (
    <div className="max-w-xl space-y-3">
      {/* {error && (
        <Callout.Root variant="surface" color="plum">
          <InfoCircledIcon />
          <Callout.Text>
            An Error occured in fetching the Issue Details
          </Callout.Text>
        </Callout.Root>
      )} */}
      <Heading>
        Issue {issue?.id} | {issue?.title}
      </Heading>
      <div className="flex flex-row space-x-3">
        <span>
          <IssueStatusBadge status={issue!.status} />
        </span>
        <span>{issue?.createdAt.toLocaleString()}</span>
      </div>
      <Blockquote size="2">{issue?.description}</Blockquote>
    </div>
  );
};

export default page;
