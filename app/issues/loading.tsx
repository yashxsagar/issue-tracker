import { Table } from "@radix-ui/themes";
import React from "react";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IssueActions from "./IssueActions";

const LoadingIssuesPage = () => {
  let issuesPlaceHolderArray = [1, 2, 3, 4, 5];
  return (
    <>
      {/* <div className="mx-6 mt-6">Loading...</div>
      <div
        className="m-6 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-plum motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div> */}
      <IssueActions />
      <div className="m-6">
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issuesPlaceHolderArray.map((i, index) => {
              return (
                <Table.Row key={i}>
                  <Table.Cell>
                    <Skeleton />
                    {/* <div className="block md:hidden">{i.status}</div> */}
                    <div className="block md:hidden">
                      <Skeleton />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton />
                    {/* {i.status} */}
                    {/* Now issuing the status inside of a 'radix-ui' badge component instead of in a plain Table Cell's text format */}
                  </Table.Cell>
                  {/* Making it mobile-optimized and responsive */}
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton />
                  </Table.Cell>
                  {/* Making it mobile-optimized and responsive */}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
};

export default LoadingIssuesPage;
