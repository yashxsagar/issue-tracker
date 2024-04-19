import { Button, Flex, Grid } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  //   {
  //   searchParams: { page },
  // }: {
  //   searchParams: { page: string };
  // })
  const countOpen = await prisma.issue.count({ where: { status: "OPEN" } });
  const countInProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const countClosed = await prisma.issue.count({ where: { status: "CLOSED" } });
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
    <Grid columns={{ initial: "1", md: "2" }} gap="7">
      <Flex direction="column" gap="7" className="p-6 ">
        <IssueSummary
          open={countOpen}
          inProgress={countInProgress}
          closed={countClosed}
        />
        <IssueChart
          open={countOpen}
          inProgress={countInProgress}
          closed={countClosed}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description:
    "View a summary of Project Issues - Issue Tracker is a minimalistic open source alternative for Jira by Atlassian for dev teams building and shipping software products",
};
