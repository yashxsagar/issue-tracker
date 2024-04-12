import { Table } from "@radix-ui/themes";
import { Fragment } from "react";
// import Link from "next/link";
import prisma from "@/prisma/client";
// import IssueStatusBadge from "../components/IssueStatusBadge";
// import Link from "../components/Link";
import { IssueStatusBadge, Link } from "@/app/components"; //Simplifying Imports of multiple modules/components into a singular file without specifying the name of the module - index.ts
import IssueActions from "./IssueActions";
// Now we use the custom Link component which marries both the 'radix-ui' stylized link component and the 'next/navigation' functional Link component

const Issues = async () => {
  const issues = await prisma.issue.findMany();
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
      <div className="m-6">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
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
      </div>
    </Fragment>
  );
};

export const dynamic = "force-dynamic"; //This is to make Next.js opt out of static rendering of this page route
export const revalidate = 0; //Exactly the same as setting the const dynamic= 'force-dynamic'
export default Issues;
