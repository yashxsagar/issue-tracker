import { Table } from "@radix-ui/themes";
import { Fragment } from "react";
// import Link from "next/link";
import prisma from "@/prisma/client";
// import IssueStatusBadge from "../components/IssueStatusBadge";
// import Link from "../components/Link";
import { IssueStatusBadge, Link } from "@/app/components"; //Simplifying Imports of multiple modules/components into a singular file without specifying the name of the module - index.ts
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";
import { RiSortAsc } from "react-icons/ri";
import Pagination from "@/app/components/Pagination";
// Now we use the custom Link component which marries both the 'radix-ui' stylized link component and the 'next/navigation' functional Link component

interface Props {
  // searchParams: { status: "OPEN" | "IN_PROGRESS" | "CLOSED" };
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}
const Issues = async ({ searchParams: { status, orderBy, page } }: Props) => {
  const statuses = Object.values(Status);
  const validStatus = statuses.includes(status);
  const columns: {
    label: string;
    value: keyof Issue;
    className?: "hidden md:table-cell";
  }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const orderByObject = columns.map((c) => c.value).includes(orderBy)
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
      <div className="m-6 space-y-3">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((c) => (
                <Table.ColumnHeaderCell key={c.value} className={c.className}>
                  {/* <NextLink href={`/issues/list?orderBy=${c.value}`}> */}
                  <NextLink href={{ query: { status, orderBy: c.value } }}>
                    {c.label}
                  </NextLink>
                  {c.value === orderBy && (
                    <RiSortAsc color="plum" className="inline ml-3" />
                  )}
                  {/* The Link component from @/app/components/Link.tsx is leading to a ton of plum color on the screen. So we replace it with the NextLink component from Next/Link */}
                </Table.ColumnHeaderCell>
              ))}
              {/* <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((i, index) => {
              return (
                <Table.Row key={i.id}>
                  <Table.Cell>
                    <Link href={`/issues/${i.id}`}>{i.title}</Link>
                    {/* <Link href={`/issues/${i.id}`}>{i.title}</Link> */}
                    {/* <div className="block md:hidden">{i.status}</div> */}
                    <div className="block md:hidden">
                      <IssueStatusBadge status={i.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={i.status} />
                    {/* {i.status} */}
                    {/* Now issuing the status inside of a 'radix-ui' badge component instead of in a plain Table Cell's text format */}
                  </Table.Cell>
                  {/* Making it mobile-optimized and responsive */}
                  <Table.Cell className="hidden md:table-cell">
                    {i.createdAt.toLocaleString()}
                  </Table.Cell>
                  {/* Making it mobile-optimized and responsive */}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
        <Pagination
          countItems={issueCount}
          currentPage={pageOfIssues}
          pageSize={pageSize}
        />
      </div>
    </Fragment>
  );
};

export const dynamic = "force-dynamic"; //This is to make Next.js opt out of static rendering of this page route
export const revalidate = 0; //Exactly the same as setting the const dynamic= 'force-dynamic'
export default Issues;
