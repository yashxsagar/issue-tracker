"use client";
import { Issue, User } from "@prisma/client";
import { AlertDialog, Flex, HoverCard, Select, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import { LoadingSpinner } from "@/app/components";
import delay from "delay";
import { HiUserRemove } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3, //reactQuery will try automartically upto 3 times to fetch the data upon encountering any error(s)
  });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    (issue.assignedToUserId &&
      users?.find((user) => {
        return user.id === issue.assignedToUserId;
      })?.id) ||
      null
  );
  //   With ReactQuery we no longer need to use state and effect hooks as it is a managed library that does all this under the hood
  //   const [users, setUsers] = useState<User[]>([]);
  //   const [errors, setErrors] = useState([]);
  //   //We cannot make the callback function of the useEffect hook async because react does not permit taht
  //   //So we need to modularize the implementation of the useEffect hook inside of another sub-function fecthUsers
  //   useEffect(() => {
  //     const fecthUsers = async () => {
  //       try {
  //         const { data } = await axios.get<User[]>("/api/users");
  //         setUsers(data);
  //       } catch (error: any) {
  //         console.log(error.response.data.errors);
  //         setErrors(error);
  //         <AlertDialog.Root>
  //           <AlertDialog.Trigger>{errors.length > 0}</AlertDialog.Trigger>
  //           <AlertDialog.Content>
  //             <AlertDialog.Title>
  //               Error fetching Users. Please check your request Header, Body or
  //               Cookies
  //             </AlertDialog.Title>
  //             <AlertDialog.Description>
  //               {error.response.data.errors}
  //             </AlertDialog.Description>
  //           </AlertDialog.Content>
  //           <AlertDialog.Cancel>OK</AlertDialog.Cancel>
  //         </AlertDialog.Root>;
  //       }
  //     };
  //     fecthUsers();
  //   }, []);
  if (error) {
    return (
      <Text as="label" align="center">
        Error fetching Users
      </Text>
    );
  }
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <Select.Root
        onValueChange={async (userId) => {
          let updatedIssue = {} as Issue;
          setSelectedUserId(userId);
          setIsAssigning(true);
          // delay(1000);
          try {
            updatedIssue = await axios.patch(`/api/issues/${issue.id}`, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            });
          } catch (error: any) {
            toast.error("New user could not be assigned!");
            console.log(error.response.data.errors);
          } finally {
            setIsAssigning(false);
            if (Object.keys(updatedIssue).length > 3) {
              if (userId === "unassigned") {
                toast("User unassigned");
              } else {
                toast.success(`New user assigned to Issue ${issue.id}`);
              }
            }
          }
        }}
        defaultValue={
          (issue.assignedToUserId &&
            users?.find((user) => {
              return user.id === issue.assignedToUserId;
            })?.id) ||
          // undefined --> to display 'Suggestions' as the default value
          "unassigned"
        }
      >
        <Select.Trigger placeholder="Assign Member" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">
              <Flex align={"center"} width={"11rem"} justify={"between"}>
                <Text>Unassigned</Text> <HiUserRemove color={"plum"} />
              </Flex>
            </Select.Item>
            {users &&
              users?.map((user, index) => (
                <Select.Item
                  key={user.id}
                  value={user.id}
                  onSelect={() => {
                    console.log("Assigned user nullified");
                    if (selectedUserId === user.id) {
                      try {
                        axios.patch(`/api/issues/${issue.id}`, {
                          assignedToUserId: null,
                        });
                      } catch (error: any) {
                        console.log(error.response.data.errors);
                      } finally {
                        console.log("Assigned user nullified");
                      }
                    }
                  }}
                >
                  {users?.filter((u) => u.name == user.name).length > 1 ? (
                    <HoverCard.Root>
                      <HoverCard.Trigger>
                        <Flex justify="between" width="11rem">
                          <Text>
                            {user.name} {isAssigning && <LoadingSpinner />}
                          </Text>
                          <DotFilledIcon color={"plum"} height={"22"} />
                        </Flex>
                      </HoverCard.Trigger>
                      <HoverCard.Content
                        //   maxWidth="300px"
                        size={"1"}
                        side="right"
                        //   height={"50px"}
                        align="center"
                        style={{
                          backgroundColor: "white",
                          color: "plum",
                          borderStyle: "solid",
                          borderWidth: "1px",
                          borderColor: "plum",
                        }}
                      >
                        <Text>{user.email}</Text>
                      </HoverCard.Content>
                    </HoverCard.Root>
                  ) : (
                    <Text>
                      {user.name} {isAssigning && <LoadingSpinner />}
                    </Text>
                  )}
                </Select.Item>
              ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;

{
  /* <Select.Item value="1">Marc</Select.Item>
            <Select.Item value="2">Chris</Select.Item>
            <Select.Item value="3">Vijay</Select.Item> */
}
