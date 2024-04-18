import prisma from "@/prisma/client";
import React from "react";
import { columnNames } from "./issues/list/IssueTable";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true, //This technique is called Eager loading to load parallel values from a related table
    },
  });
  return (
    <Card>
      <Heading ml="3" mb={"5"} size={"8"} className="border-b-plum">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map(async (i) => {
            return (
              <Table.Row key={i.id}>
                <Table.Cell>
                  <Flex direction={"row"} justify={"between"}>
                    <Flex direction="column" align="start" gap="2">
                      <Link href={`/issues/${i.id}`}>{i.title}</Link>
                      <IssueStatusBadge status={i.status} />
                    </Flex>
                    {i.assignedToUser && (
                      <Avatar
                        radius={"full"}
                        src={i.assignedToUser?.image!}
                        fallback="?"
                        size="2"
                        referrerPolicy="no-referrer"
                      />
                    )}{" "}
                  </Flex>
                </Table.Cell>
                {/* <Table.Cell>{i.description}</Table.Cell>
              <Table.Cell>{i.createdAt.toLocaleString()}</Table.Cell> */}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
