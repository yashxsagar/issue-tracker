// "use client";
import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import React, { useState } from "react";
import {
  Badge,
  Blockquote,
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import delay from "delay";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

type Props = {
  params: { id: string };
};
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
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

  await delay(2000);
  //This page is now only responsible for laying out the various elements/details of an issue and we offload the logic of generating the UI/formatting for various issue elements that are co-located with this page route
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"3"}>
      {/* sm: stands for small in 'radix-ui' and is used for tablets */}
      {/* maxWidth={"50vw"} */}
      {/* {error && (
        <Callout.Root variant="surface" color="plum">
          <InfoCircledIcon />
          <Callout.Text>
            An Error occured in fetching the Issue Details
          </Callout.Text>
        </Callout.Root>
      )} */}
      {/* Note lg (laptops) in Tailwind CSS is the same as md in 'radix-ui', Also md in Tailwind CSS is the analaogous to sm in 'radix-ui' */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box className={"md:col-span-1"}>
          {/* Using a flex to stack the buttons vertically */}
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            {/* <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}></Link>Edit Issue
        </Button> */}
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
