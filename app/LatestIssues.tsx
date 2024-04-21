import prisma from "@/prisma/client";
import React from "react";
import { columnNames } from "./issues/list/IssueTable";
import {
  Tooltip,
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { IoInformationCircle } from "react-icons/io5";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true, //This technique is called Eager loading to load parallel values from a related table
    },
  });
  return (
    <Card mx={{ initial: "1", sm: "2" }} my={{ initial: "5" }}>
      <Heading
        ml={{ initial: "3" }}
        mb={"3"}
        size={"8"}
        className="sm: pt-4 md:pt-10"
      >
        Latest Issues
      </Heading>
      <Table.Root className="sm: pb-6">
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
                      <Flex
                        gap="2"
                        align="end"
                        direction={{ initial: "column" }}
                      >
                        <Avatar
                          radius={"full"}
                          src={i.assignedToUser?.image!}
                          fallback="?"
                          size="2"
                          referrerPolicy="no-referrer"
                        />

                        {issues.filter((i) => i.assignedToUser?.name).length >
                        1 ? (
                          <Tooltip content={i.assignedToUser.email}>
                            <Flex>
                              <Text
                                size="1"
                                as="label"
                                color="plum"
                                className="inline cursor-pointer"
                              >
                                {i.assignedToUser.name}
                              </Text>
                              <IoInformationCircle
                                color="plum"
                                height={22}
                                className="inline"
                                cursor={"pointer"}
                              />
                            </Flex>
                          </Tooltip>
                        ) : (
                          <Text
                            size="1"
                            as="label"
                            color="plum"
                            className="inline"
                          >
                            {i.assignedToUser.name}
                          </Text>
                        )}
                      </Flex>
                    )}
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
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default LatestIssues;
