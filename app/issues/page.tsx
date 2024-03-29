import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Issues = () => {
  return (
    <div className="m-6 space-y-6">
      <h1 className="text-4xl">Issues Page</h1>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default Issues;
