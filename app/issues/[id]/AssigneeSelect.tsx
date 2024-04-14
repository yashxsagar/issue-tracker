"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Member" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Marc</Select.Item>
          <Select.Item value="2">Chris</Select.Item>
          <Select.Item value="3">Vijay</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
