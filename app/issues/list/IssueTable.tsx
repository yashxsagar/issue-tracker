import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { orderBy } from "lodash";
import Link from "next/link";
import React from "react";
import { RiSortAsc } from "react-icons/ri";
import NextLink from "next/link";

interface Props {
  orderBy: keyof Issue;
  issues: Issue[];
  status: Status;
}

//We've moved the definition of the columns {}[] collection/array and exponst const columnNames to the very bottom of this component file so as to make the appearance cleaner and more user-friendly
const IssueTable = ({ orderBy, issues, status }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell key={c.value} className={c.className}>
              {/* <NextLink href={`/issues/list?orderBy=${c.value}`}> */}
              <NextLink href={{ query: { status, orderBy: c.value } }}>
                {c.label}
              </NextLink>
              {c.value === orderBy && (
                <RiSortAsc color="plum" className="inline ml-3" />
              )}
              {/* The Link component from @/app/components/Link.tsx is leading to a ton of plum color on the screen. So we replace it with the NextLink component from Next/Link */}
            </Table.ColumnHeaderCell>
          ))}
          {/* <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((i, index) => {
          return (
            <Table.Row key={i.id}>
              <Table.Cell>
                <Link href={`/issues/${i.id}`}>{i.title}</Link>
                {/* <Link href={`/issues/${i.id}`}>{i.title}</Link> */}
                {/* <div className="block md:hidden">{i.status}</div> */}
                <div className="block md:hidden">
                  <IssueStatusBadge status={i.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={i.status} />
                {/* {i.status} */}
                {/* Now issuing the status inside of a 'radix-ui' badge component instead of in a plain Table Cell's text format */}
              </Table.Cell>
              {/* Making it mobile-optimized and responsive */}
              <Table.Cell className="hidden md:table-cell">
                {i.createdAt.toLocaleString()}
              </Table.Cell>
              {/* Making it mobile-optimized and responsive */}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Issue;
  className?: "hidden md:table-cell";
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

export const columnNames = columns.map((c) => c.value);

export default IssueTable;
