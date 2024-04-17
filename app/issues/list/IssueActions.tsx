import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";

const IssueActions = ({
  selectedStatus,
}: {
  selectedStatus: Status | undefined;
}) => {
  return (
    <div className="m-6 space-y-6">
      <h1 className="text-4xl">Issues Page</h1>
      <Flex justify="between">
        <IssueStatusFilter selectedStatus={selectedStatus} />
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
    </div>
  );
};

export default IssueActions;
