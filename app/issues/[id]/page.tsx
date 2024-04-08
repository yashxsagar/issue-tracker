// "use client";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import React, { useState } from "react";
import {
  Badge,
  Blockquote,
  Callout,
  Card,
  Heading,
  Text,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
        <IssueStatusBadge status={issue!.status} />
        <Text size={"2"}>{issue?.createdAt.toLocaleString()}</Text>
      </div>
      {/* <Blockquote size="2">{issue?.description}</Blockquote> */}
      {/* We want to ideally use react-markdown component in order to make the user specified 'markdown' in the issue's description field visible here */}
      <Card className="prose" variant="classic">
        {/* <Blockquote size={"2"}> */}
        <ReactMarkdown>{issue?.description}</ReactMarkdown>
        {/* </Blockquote> */}
      </Card>
    </div>
  );
};

export default page;
