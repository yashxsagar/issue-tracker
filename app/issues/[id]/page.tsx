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

  await delay(2000);
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"3"}>
      {/* maxWidth={"50vw"} */}
      {/* {error && (
        <Callout.Root variant="surface" color="plum">
          <InfoCircledIcon />
          <Callout.Text>
            An Error occured in fetching the Issue Details
          </Callout.Text>
        </Callout.Root>
      )} */}
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
        {/* <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}></Link>Edit Issue
        </Button> */}
      </Box>
    </Grid>
  );
};

export default page;
