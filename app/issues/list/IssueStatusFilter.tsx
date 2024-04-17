"use client";
import { Status } from "@prisma/client";
import { Box, RadioCards, Flex, Text } from "@radix-ui/themes";
import React from "react";

const statuses: {
  label: string;
  value?: Status;
  color?: "red" | "blue" | "green";
}[] = [
  { label: "All" },
  { label: "Open", value: "OPEN", color: "red" },
  { label: "In Progress", value: "IN_PROGRESS", color: "blue" },
  { label: "Closed", value: "CLOSED", color: "green" },
];

const IssueStatusFilter = () => {
  return (
    <Box>
      <RadioCards.Root
        size="1"
        defaultValue=""
        columns={{ initial: "1", sm: "3", md: "4" }}
      >
        {statuses.map((s, index) => {
          return (
            <RadioCards.Item key={s.value} value={s.value || ""}>
              <Text color={s.color || undefined}>{s.label} </Text>
            </RadioCards.Item>
          );
        })}
      </RadioCards.Root>
    </Box>
  );
};

export default IssueStatusFilter;
