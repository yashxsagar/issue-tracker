"use client";
import CustomSimpleMDE from "@/app/components/CustomSimpleMDE";
import { Button, RadioCards, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

const createIssueSchema = z
  .object({
    title: z.string().min(3).max(255),
    description: z.string().min(15),
    status: z.enum(["OPEN", "IN_PROGRESS", "CLOSED"]).optional(),
    // email: z.string().email(),
  })
  .strict();

type IssueForm = z.infer<typeof createIssueSchema>;
const page = () => {
  const router = useRouter();
  const { register, control, formState, handleSubmit } = useForm<IssueForm>();
  // console.log(register("status"));
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        try {
          console.log(data);
          const response = await axios.post("/api/issues", data);
        } catch (AxiosError: any) {
          alert(AxiosError.response.data.error[0]);
          console.log(AxiosError.response.data.error[0]);
        }
      })}
    >
      <TextField.Root
        placeholder="Issue Title"
        autoFocus={true}
        {...register("title")}
      ></TextField.Root>
      {/* <TextArea placeholder="Describe your issue"></TextArea> */}
      {/* Container <div> for defining a color for the SimpleMde component on hover */}
      {/* Instead of directly rendering the CustomSimpleMDE component which does not support application of props via obj destructuring notation, we take help of the Controller function  */}
      <CustomSimpleMDE borderColor="plum" borderWidth="2" control={control} />
      <section className="max-w-xl">
        <Controller
          name="status"
          control={control}
          defaultValue="OPEN"
          // Set default value if needed
          render={({ field: { name, ref, value, onBlur, onChange } }) => (
            <RadioCards.Root
              name={name}
              ref={ref}
              value={value}
              onBlur={onBlur}
              onValueChange={onChange} //Debug Courtesy - https://codesandbox.io/p/sandbox/radixui-radio-group-forked-ljsg12?file=%2Fsrc%2FForm.tsx
            >
              <RadioCards.Item value="OPEN">Open</RadioCards.Item>
              <RadioCards.Item value="IN_PROGRESS">In Progress</RadioCards.Item>
              <RadioCards.Item value="CLOSED">Closed</RadioCards.Item>
            </RadioCards.Root>
          )}
        />
        {formState.errors.status && (
          <span>{formState.errors.status.message}</span>
        )}
      </section>
      {/* <RadioCards.Root defaultValue="1" {...formInstance.register("status")}>
          <RadioCards.Item value="OPEN">Open</RadioCards.Item>
          <RadioCards.Item value="IN_PROGRESS">In Progress</RadioCards.Item>
          <RadioCards.Item value="CLOSED">Closed</RadioCards.Item>
        </RadioCards.Root> */}
      <Button type="submit">Submit Issue</Button>
    </form>
  );
};

export default page;
