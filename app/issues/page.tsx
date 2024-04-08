import React, { Fragment } from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";

const Issues = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <Fragment>
      <div className="m-6 space-y-6">
        <h1 className="text-4xl">Issues Page</h1>
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>
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
                    {i.title}
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

export default Issues;
