// import IssueForm from "../components/IssueForm";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/components/IssueFormSkeleton";
const IssueForm = dynamic(() => import("@/app/issues/components/IssueForm"), {
  loading: () => {
    return <IssueFormSkeleton />;
  },
  ssr: false,
});
const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
