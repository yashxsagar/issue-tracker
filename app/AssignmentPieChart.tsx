"use client";
import prisma from "@/prisma/client";
import { Issue, User } from "@prisma/client";
import { Card, Flex } from "@radix-ui/themes";
import { data } from "autoprefixer";
import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { FaSquare } from "react-icons/fa";
import { ResponsivePie } from "@nivo/pie";

interface Props {
  usersWithIssues: {
    email: string | null;
    // name: string | null;
    assignedIssues: Issue[] | undefined;
  }[];
  noOfUnassignedIssues: number | undefined;
}
const AssignmentPieChart = ({
  usersWithIssues,
  noOfUnassignedIssues,
}: Props) => {
  // chartData: {label:string, value: number, color: 'blue'|'green'|'yellow'|'red'}[]let colors=
  //   const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#000000"];
  //   const colors = ["#801357", "#9C5495", "#B768A2", "#D3A9BF"];// The hecodes converted to hsl values below that are understood by the @nivo/pie  library-->
  //   const colors = [
  //     "hsl(322, 28%, 74%)",
  //     "hsl(305, 47%, 30%)",
  //     "hsl(315, 56%, 35%)",
  //     "hsl(328, 74%, 32%)",
  //   ];

  const chartData = () => {
    return usersWithIssues.map((u, index) => {
      return {
        // name: u.name,
        id: u.email,
        label: u.email || undefined,
        value: u.assignedIssues!.length,
        // color: colors[index],
      };
    });
  };
  const pieData = [
    ...chartData(),
    {
      id: "Unassigned Issues",
      label: "Unassigned Issues",
      value: noOfUnassignedIssues,
      color: "#FFFFFF",
    },
  ];

  const returnFill = () => {
    return pieData.map((slice, index) => {
      return {
        match: {
          id: slice.id,
        },
        id: slice.id?.includes("@", 0) ? "dots" : "lines",
      };
    });
  };
  return (
    <ResponsivePie
      data={pieData}
      margin={{ top: 20, right: 60, bottom: 60, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      animate={true}
      //   motionStiffness={90}
      //   motionDamping={15}
      colors={{ scheme: "purple_red" }}
      activeOuterRadiusOffset={8}
      borderWidth={0}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      enableArcLinkLabels={window.innerWidth < 900 ? false : true}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={returnFill()}
      legends={[
        {
          anchor: "bottom",
          direction: window.innerWidth < 768 ? "column" : "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: window.innerWidth < 768 ? 10 : 50,
          itemWidth: 100,
          itemHeight: 10,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default AssignmentPieChart;
