import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
// import LatestIssues from "./LatestIssues";
// import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
// import IssueChart from "./IssueChart";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
// import AssignmentPieChart from "./AssignmentPieChart";

const IssueSummary = dynamic(() => import("./IssueSummary"), { ssr: false });
const IssueChart = dynamic(() => import("./IssueChart"), { ssr: false });
const LatestIssues = dynamic(() => import("./LatestIssues"), { ssr: false });
const AssignmentPieChart = dynamic(() => import("./AssignmentPieChart"), {
  ssr: false,
});
export default async function Home() {
  //   {
  //   searchParams: { page },
  // }: {
  //   searchParams: { page: string };
  // })
  let counts: {
    countOpen: number;
    countInProgress: number;
    countClosed: number;
  } = { countOpen: -1, countInProgress: -1, countClosed: -1 };
  try {
    counts.countOpen = await prisma.issue.count({ where: { status: "OPEN" } });
    counts.countInProgress = await prisma.issue.count({
      where: { status: "IN_PROGRESS" },
    });
    counts.countClosed = await prisma.issue.count({
      where: { status: "CLOSED" },
    });
  } catch (error: any) {
    console.log(error);
    // notFound();
    // setError(JSON.stringify(error));
  }
  // if (!issue) {
  //   notFound();
  // } else {
  //   return issue;
  // }

  const usersWithIssues = await prisma.user.findMany({
    where: {
      assignedIssues: {
        some: {},
      },
    },
    orderBy: { assignedIssues: { _count: "desc" } },
    take: 4,
    select: {
      // name: true,
      email: true,
      assignedIssues: true,
    },
  });

  const noOfUnassignedIssues = await prisma.issue.count({
    where: {
      assignedToUserId: null,
    },
  });

  console.log(usersWithIssues);
  console.log(noOfUnassignedIssues);
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div>
    //     {/* <h1 className="text-5xl">Hello World</h1> */}
    //     {/* <Pagination
    //     //   countItems={100}
    //     //   currentPage={page ? parseInt(page) : 1}
    //     //   pageSize={7}
    //     // /> */}
    //   </div>
    // </main>
    // <LatestIssues />
    // <IssueSummary
    //   open={countOpen}
    //   inProgress={countInProgress}
    //   closed={countClosed}
    // />
    // <IssueChart
    //   open={countOpen}
    //   inProgress={countInProgress}
    //   closed={countClosed}
    // />
    <>
      <Grid
        columns={{ initial: "1", md: "2" }}
        gap="7"
        align={{ initial: "center", sm: "center" }}
      >
        <Flex direction="column" gap="7" className="p-6 ">
          <IssueSummary
            open={counts.countOpen}
            inProgress={counts.countInProgress}
            closed={counts.countClosed}
          />
          <IssueChart
            open={counts.countOpen}
            inProgress={counts.countInProgress}
            closed={counts.countClosed}
          />
        </Flex>
        <LatestIssues />
      </Grid>
      <Box height={{ initial: "25rem", sm: "30rem" }}>
        <AssignmentPieChart
          usersWithIssues={usersWithIssues}
          noOfUnassignedIssues={noOfUnassignedIssues}
        />
      </Box>
      {/* <Grid columns={"1"} as="div"> */}

      {/* </Grid> */}
    </>
  );
}

export const revalidate = 0; //Exactly the same as setting the const dynamic= 'force-dynamic'
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "View a summary of Project Issues - Issue Tracker is a minimalistic open source alternative for Jira by Atlassian for dev teams building and shipping software products",
};
