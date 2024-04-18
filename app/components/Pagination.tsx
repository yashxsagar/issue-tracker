"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  countItems: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ countItems, currentPage, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(countItems / pageSize);
  if (pageCount == 1) {
    return null;
  }
  const changePage = (page: Number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`); //So we are only updateing the query string and not the end-point. The useRouter hook will  retain the value of the URL/endPoint
  };
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color="plum"
        size="1"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        color="plum"
        size={"1"}
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        color="plum"
        size={"1"}
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => {
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        color="plum"
        size={"1"}
        variant="soft"
        disabled={currentPage === pageCount}
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
