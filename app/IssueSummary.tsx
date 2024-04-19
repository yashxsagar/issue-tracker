import { Status } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const cards: {
    label: String;
    color: "red" | "blue" | "green";
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open Issues",
      color: "red",
      value: open,
      status: "OPEN",
    },
    {
      label: "In Progress Issues",
      color: "blue",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      color: "green",
      value: closed,
      status: "CLOSED",
    },
  ];
  return (
    <Flex gap="3" direction={{ initial: "column", sm: "row" }}>
      {cards.map((c) => {
        return (
          <Link key={c.status} href={`/issues/list?status=${c.status}`}>
            <Card
              key={`${c.label}`}
              variant="surface"
              //   className={`hover:border-green-600`}
              style={{
                borderStyle: "double",
                borderWidth: "1px",
                borderColor: `${c.color}`,
              }}
              size={{ initial: "1", sm: "3" }}
            >
              <Flex direction={"column"} gap="5">
                <Text size={"6"}>{c.label}</Text>
                <Text weight="bold">{c.value}</Text>
              </Flex>
            </Card>
          </Link>
        );
      })}
    </Flex>
  );
};

export default IssueSummary;
