"use client";
import React from "react";
import { TextArea, TextField, RadioCards, Button } from "@radix-ui/themes";

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Issue Title" color="blue"></TextField.Root>
      <TextArea placeholder="Describe your issue"></TextArea>
      <section className="max-w-xl">
        <RadioCards.Root color="green" defaultValue="1">
          <RadioCards.Item value="1">Open</RadioCards.Item>
          <RadioCards.Item value="2">In Progress</RadioCards.Item>
          <RadioCards.Item value="3">Closed</RadioCards.Item>
        </RadioCards.Root>
      </section>
      <Button type="submit">Submit Issue</Button>
    </div>
  );
};

export default page;
