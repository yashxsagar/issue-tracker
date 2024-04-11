"use client";
import { ExitIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (
    // Now let's wrap the DeleteIssueButton inside of an AlerDialog box fromn 'radix-ui'

    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <TrashIcon />
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure want to Delete Issue: {issueId}?
        </AlertDialog.Description>
        <Flex gap={"4"} mt="3">
          <AlertDialog.Cancel>
            <Button color="gray">Cancel Delete</Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red">
              <ExitIcon />
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
