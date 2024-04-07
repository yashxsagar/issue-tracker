"use client";
import CustomSimpleMDE from "@/app/components/CustomSimpleMDE";
import { Button, RadioCards, TextField, Callout, Text } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import axios from "axios";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";

type IssueForm = z.infer<typeof createIssueSchema>; //Basically, we are letting zod infer the type of the useForm data object from the centrally defined back-end createIssueSchema defined at @/app/validationSchemas
const page = () => {
  const router = useRouter();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  // console.log(register("status"));
  return (
    //For encapsulating the Callout UI component from the radix-ui library
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root variant="outline" color="plum">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            console.log(data);
            const response = await axios.post("/api/issues", data);
          } catch (error: any) {
            // catch (AxiosError: any) {
            //   // alert(AxiosError.response.data.error[0]);
            //   // console.log(AxiosError.response.data.error[0]);
            // }
            // console.log(error);
            setError(JSON.stringify(error.response.data.error));
          }
        })}
      >
        <TextField.Root
          placeholder="Issue Title"
          autoFocus={true}
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="plum" as="div">
            {errors.title.message}
          </Text>
        )}
        {/* <TextArea placeholder="Describe your issue"></TextArea> */}
        {/* Container <div> for defining a color for the SimpleMde component on hover */}
        {/* Instead of directly rendering the CustomSimpleMDE component which does not support application of props via obj destructuring notation, we take help of the Controller function  */}
        <CustomSimpleMDE borderColor="plum" borderWidth="2" control={control} />
        {errors.description && (
          <Text color="plum" as="div">
            {errors.description.message}
          </Text>
        )}
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
                <RadioCards.Item value="IN_PROGRESS">
                  In Progress
                </RadioCards.Item>
                <RadioCards.Item value="CLOSED">Closed</RadioCards.Item>
              </RadioCards.Root>
            )}
          />
          {/* {formState.errors.status && (
            <span>{formState.errors.status.message}</span>
          )} */}
        </section>
        {/* <RadioCards.Root defaultValue="1" {...formInstance.register("status")}>
          <RadioCards.Item value="OPEN">Open</RadioCards.Item>
          <RadioCards.Item value="IN_PROGRESS">In Progress</RadioCards.Item>
          <RadioCards.Item value="CLOSED">Closed</RadioCards.Item>
        </RadioCards.Root> */}
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default page;
