import { Fragment } from "react";
// import Link from "next/link";
import prisma from "@/prisma/client";
// import IssueStatusBadge from "../components/IssueStatusBadge";
// import Link from "../components/Link";
import Pagination from "@/app/components/Pagination";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
// Now we use the custom Link component which marries both the 'radix-ui' stylized link component and the 'next/navigation' functional Link component

interface Props {
  // searchParams: { status: "OPEN" | "IN_PROGRESS" | "CLOSED" };
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
const Issues = async ({ searchParams: { status, orderBy, page } }: Props) => {
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status);

  const orderByObject = columnNames.includes(orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

  const pageOfIssues = parseInt(page) || 1;
  const pageSize = 15;
  const issues = await prisma.issue.findMany({
    where: { status: validStatus ? status : undefined },
    orderBy: orderByObject,
    skip: (pageOfIssues - 1) * pageSize,
    take: pageSize, //No. of records that we need to fetch
    // orderBy: {
    //   [orderBy]: "asc",
    // },
  });

  //Now we need to determine the total no. of issues in the database and send it to our pagination component

  const issueCount = await prisma.issue.count({
    where: { status: validStatus ? status : undefined },
  });

  // await delay(2000);
  return (
    <Fragment>
      {/* Modularizing and Abstracting it out */}
      {/* <div className="m-6 space-y-6">
        <h1 className="text-4xl">Issues Page</h1>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div> */}
      <IssueActions />
      {/* <div className="m-6 space-y-3"> */}
      <Flex as="div" m="5" direction={"column"} gap="3">
        <IssueTable issues={issues} orderBy={orderBy} status={status} />
        <Pagination
          countItems={issueCount}
          currentPage={pageOfIssues}
          pageSize={pageSize}
        />
      </Flex>
      {/* </div> */}
    </Fragment>
  );
};

export const dynamic = "force-dynamic"; //This is to make Next.js opt out of static rendering of this page route
export const revalidate = 0; //Exactly the same as setting the const dynamic= 'force-dynamic'
export default Issues;
