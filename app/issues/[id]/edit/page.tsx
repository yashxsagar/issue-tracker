import { Issue } from "@prisma/client";
import IssueForm from "../../components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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
