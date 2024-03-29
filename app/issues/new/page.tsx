"use client";
import CustomSimpleMDE from "@/app/components/CustomSimpleMDE";
import { Button, RadioCards, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

const page = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root
        placeholder="Issue Title"
        autoFocus={true}
      ></TextField.Root>
      {/* <TextArea placeholder="Describe your issue"></TextArea> */}
      {/* Container <div> for defining a color for the SimpleMde component on hover */}
      <CustomSimpleMDE borderColor="plum" borderWidth="2" />
      <section className="max-w-xl">
        <RadioCards.Root defaultValue="1">
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
