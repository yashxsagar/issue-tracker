import { Issue } from "@prisma/client";
// import IssueForm from "../../components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/components/IssueFormSkeleton";

const IssueForm = dynamic(
  () => {
    return import("@/app/issues/components/IssueForm");
  },
  {
    ssr: false,
    loading: () => {
      return <IssueFormSkeleton />;
    },
  }
);
interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  let issue = {} as Issue | null;
  try {
    issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });
  } catch (error) {
    console.log(error);
    notFound();
  }
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
