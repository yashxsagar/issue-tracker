//A single place/component where we define the look and feel of our Error Messages throughout our application
import React, { ReactNode } from "react";
import { Text } from "@radix-ui/themes";

interface Props {
  children: ReactNode;
}

const ErrorMessage = ({ children }: Props) => {
  if (!children) return null;
  return (
    <Text color="plum" as="div">
      {children}
    </Text>
  );
};

export default ErrorMessage;
