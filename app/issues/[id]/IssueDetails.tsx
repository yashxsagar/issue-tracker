import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}
const IssueDetails = ({
  issue: { id, title, status, createdAt, description },
}: Props) => {
  return (
    <Fragment>
      <Heading>
        Issue {id} | {title}
      </Heading>
      <Flex className="space-x-3" my="3">
        <IssueStatusBadge status={status} />
        <Text size={"2"}>{createdAt.toLocaleString()}</Text>
      </Flex>
      {/* <Blockquote size="2">{issue?.description}</Blockquote> */}
      {/* We want to ideally use react-markdown component in order to make the user specified 'markdown' in the issue's description field visible here */}
      <Card className="prose max-w-full" variant="classic">
        {/* <Blockquote size={"2"}> */}
        <ReactMarkdown>{description}</ReactMarkdown>
        {/* </Blockquote> */}
      </Card>
    </Fragment>
  );
};

export default IssueDetails;
