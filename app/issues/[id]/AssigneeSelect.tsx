"use client";
import { User } from "@prisma/client";
import { AlertDialog, Flex, HoverCard, Select, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { DotFilledIcon } from "@radix-ui/react-icons";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState([]);
  //We cannot make the callback function of the useEffect hook async because react does not permit taht
  //So we need to modularize the implementation of the useEffect hook inside of another sub-function fecthUsers
  useEffect(() => {
    const fecthUsers = async () => {
      try {
        const { data } = await axios.get<User[]>("/api/users");
        setUsers(data);
      } catch (error: any) {
        console.log(error.response.data.errors);
        setErrors(error);
        <AlertDialog.Root>
          <AlertDialog.Trigger>{errors.length > 0}</AlertDialog.Trigger>
          <AlertDialog.Content>
            <AlertDialog.Title>
              Error fetching Users. Please check your request Header, Body or
              Cookies
            </AlertDialog.Title>
            <AlertDialog.Description>
              {error.response.data.errors}
            </AlertDialog.Description>
          </AlertDialog.Content>
          <AlertDialog.Cancel>OK</AlertDialog.Cancel>
        </AlertDialog.Root>;
      }
    };
    fecthUsers();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign Member" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users &&
            users.map((user, index) => (
              <Select.Item key={user.id} value={user.id}>
                {users.filter((u) => u.name == user.name).length > 1 ? (
                  <HoverCard.Root>
                    <HoverCard.Trigger>
                      <Flex>
                        <Text>{user.name}</Text>
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
                  <Text>{user.name}</Text>
                )}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;

{
  /* <Select.Item value="1">Marc</Select.Item>
            <Select.Item value="2">Chris</Select.Item>
            <Select.Item value="3">Vijay</Select.Item> */
}
