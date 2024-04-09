import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { Heading, Card, Text, Flex } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <Flex className="space-x-3">
        <Skeleton width={"8rem"} />
        <Skeleton width={"25rem"} />
      </Flex>
      <div className="flex flex-row space-x-3">
        <Skeleton width={"13rem"} />
        {/* <Text size={"2"}>
          <Skeleton />
        </Text> */}
        {/* <Skeleton width={"8rem"} /> */}
      </div>
      {/* <Blockquote size="2">{issue?.description}</Blockquote> */}
      {/* We want to ideally use react-markdown component in order to make the user specified 'markdown' in the issue's description field visible here */}
      <Card className="prose" variant="classic">
        {/* <Blockquote size={"2"}> */}
        {/* <ReactMarkdown>
          <Skeleton />
        </ReactMarkdown> */}
        {/* </Blockquote> */}
        <Skeleton count={3} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailPage;
