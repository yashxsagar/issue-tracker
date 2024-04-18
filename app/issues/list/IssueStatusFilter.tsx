"use client";
import { Status } from "@prisma/client";
import { Box, RadioCards, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Box>
      <RadioCards.Root
        size="1"
        defaultValue={searchParams.get("status") || ""}
        columns={{ initial: "2", sm: "3", md: "4" }}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          //   const query = status ? `?status=${status}` : "";
          const query = params.size ? `?${params.toString()}` : "";
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
