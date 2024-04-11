import { Flex, Card, Box, RadioCards } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components/";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <div className="mb-2 mt-2">
        <Skeleton />
      </div>
      <div className="mb-7">
        <Skeleton height={"23rem"} />
      </div>
      {/* <ErrorMessage>{errors.title?.message}</ErrorMessage> */}
      {/* {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>} */}
      {/* Instead of checking whether each form field's state contains an error state/message, we can simply off-load this responsibility to the <ErrorMessage> component */}
      {/* <TextArea placeholder="Describe your issue"></TextArea> */}
      {/* Container <div> for defining a color for the SimpleMde component on hover */}
      {/* Instead of directly rendering the CustomSimpleMDE component which does not support application of props via obj destructuring notation, we take help of the Controller function  */}
      {/* {<ErrorMessage>{errors.description?.message}</ErrorMessage>} */}
      {/** Offloading the checking of the presence of errors in the descr */}
      {/* {errors.description && (
        <ErrorMessage>{errors.description.message}</ErrorMessage>
      )} */}
      {/* <section className="max-w-xl"> */}
      <RadioCards.Root className="mb-3">
        <RadioCards.Item value="placeholderSkeleton" disabled={true}>
          <Skeleton width={"10rem"} />
        </RadioCards.Item>
        <RadioCards.Item value="placeholderSkeleton" disabled={true}>
          <Skeleton width={"10rem"} />
        </RadioCards.Item>
        <RadioCards.Item value="placeholderSkeleton" disabled={true}>
          <Skeleton width={"10rem"} />
        </RadioCards.Item>
      </RadioCards.Root>{" "}
      {/* {formState.errors.status && (
          <span>{formState.errors.status.message}</span>
        )} */}
      {/* </section> */}
      <div>
        <Skeleton width={"4rem"} className="block">
          {/* <Skeleton /> */}
        </Skeleton>
      </div>
      {/* <RadioCards.Root defaultValue="1" {...formInstance.register("status")}>
        <RadioCards.Item value="OPEN">Open</RadioCards.Item>
        <RadioCards.Item value="IN_PROGRESS">In Progress</RadioCards.Item>
        <RadioCards.Item value="CLOSED">Closed</RadioCards.Item>
      </RadioCards.Root> */}
      {/* </form> */}
    </Box>
    // </div>
  );
};

export default IssueFormSkeleton;
