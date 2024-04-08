import { Status } from "@prisma/client"; //Importing Status for use as a type in this component
import { Badge, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status; //This Status type comes from the Status enum defined in the schema.prisma file and is generated upon each successful migration by our prisma client/ORM
}

const statusMap: Record<
  Status,
  { label: string; color: "tomato" | "green" | "blue" | "red" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "blue" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Flex gap="2">
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </Flex>
  );
};

export default IssueStatusBadge;
