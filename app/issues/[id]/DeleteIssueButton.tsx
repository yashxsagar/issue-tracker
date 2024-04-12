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
  const [error, setError] = useState("");
  const handleDelete = async () => {
    let response = {} as any;
    //now let's display the error in a separate Dialog box upon encountering the error at the press of the Delete Issue confirmation button
    try {
      // throw new Error(); //Simulating an error in the try block
      setDeleting(true);
      response = await axios.delete(`/api/issues/${issueId}`, {
        data: null,
        maxBodyLength: 0,
      });
      router.push("/issues/list");
      router.refresh();
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(JSON.stringify(error.response.data.error));
        console.log(JSON.stringify(error.response.data.error));
      } else {
        setError(
          JSON.stringify(
            "Some Issue in the nature or style of the request. Please check the request URL/header"
          )
        );
        console.log(
          JSON.stringify(
            "Some Issue in the nature or style of the request. Please check the request URL/header"
          )
        );
      }
    } finally {
      setDeleting(false);
      // if (!response.error) {
      //   router.push("/issues");
      //   router.refresh();
      // }
    }
  };
  return (
    // Now let's wrap the DeleteIssueButton inside of an AlerDialog box fromn 'radix-ui'
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={deleting}>
            <TrashIcon />
            Delete Issue {deleting && <LoadingSpinner />}
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
                //Now let's abstract out all the code outside of this onClick event handler since it's too lengthy
                onClick={handleDelete}
              >
                <ExitIcon />
                Delete Issue {deleting && <LoadingSpinner />}
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error !== ""}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error in Deleting Issue: {issueId}
          </AlertDialog.Title>
          <AlertDialog.Description>
            The issue could not be deleteing due to the following error: {error}
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              color="gray"
              mt="2"
              onClick={() => {
                setError("");
              }}
            >
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
