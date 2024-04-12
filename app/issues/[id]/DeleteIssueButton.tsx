"use client";
import { LoadingSpinner } from "@/app/components";
import { ExitIcon, TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
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
            <Button
              color="red"
              disabled={deleting}
              onClick={async () => {
                let response = {} as any;
                try {
                  setDeleting(true);
                  response = await axios.delete(`/api/issues/${issueId}`, {
                    data: null,
                    maxBodyLength: 0,
                  });
                } catch (error: any) {
                  console.log(JSON.stringify(error.response.data.error));
                } finally {
                  setDeleting(false);
                  if (!response.error) {
                    router.push("/issues");
                    router.refresh();
                  }
                }
              }}
            >
              <ExitIcon />
              Delete Issue {deleting && <LoadingSpinner />}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
