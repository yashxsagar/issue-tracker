"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const chartData = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card size={"1"} className="w-9/12">
      {/* The ResponsiveContainer will ensure that our chart will adapt to the size of the parent container */}
      <ResponsiveContainer width={"60%"} height={350}>
        <BarChart data={chartData}>
          <XAxis dataKey={"label"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={"value"} barSize={40} fill="plum" spacing={"1px"} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
