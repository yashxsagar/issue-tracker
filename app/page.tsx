import { Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";
import { DoubleArrowLeftIcon } from "@radix-ui/react-icons";

export default function Home({
  searchParams: { page },
}: {
  searchParams: { page: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-5xl">Hello World</h1>
        <Pagination
          countItems={100}
          currentPage={page ? parseInt(page) : 1}
          pageSize={7}
        />
      </div>
    </main>
  );
}
