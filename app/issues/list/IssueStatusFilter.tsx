"use client";
import { Status } from "@prisma/client";
import { Box, RadioCards, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";
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

const IssueStatusFilter = ({
  selectedStatus,
}: {
  selectedStatus: Status | undefined;
}) => {
  const router = useRouter();
  return (
    <Box>
      <RadioCards.Root
        size="1"
        defaultValue={selectedStatus || ""}
        columns={{ initial: "1", sm: "3", md: "4" }}
        onValueChange={(status) => {
          const query = status ? `?status=${status}` : "";
          router.push(`/issues/list/${query}`);
        }}
      >
        {statuses.map((s, index) => {
          return (
            <RadioCards.Item key={s.value || ""} value={s.value || ""}>
              <Text color={s.color || undefined}>{s.label} </Text>
            </RadioCards.Item>
          );
        })}
      </RadioCards.Root>
    </Box>
  );
};

export default IssueStatusFilter;
