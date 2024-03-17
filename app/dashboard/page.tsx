import { WorkspaceCard } from "./vault-card";
import { authOptions } from "@/lib/auth";
import { Notes } from "./notes";
import { Suspense } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = async () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Notes</h1>
        <Link
          href="/create"
          className={cn(
            "flex items-center gap-2",
            buttonVariants({ variant: "ghost" })
          )}
        >
          <PlusCircle className="inline-block" />
          <div className="text-gray-11">
            <span className="font-semibold text-gray-12">New</span> {` `}note
          </div>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="divide-border-200 mt-8 divide-y rounded-md border">
            <WorkspaceCard.Skeleton />
            <WorkspaceCard.Skeleton />
            <WorkspaceCard.Skeleton />
            <WorkspaceCard.Skeleton />
            <WorkspaceCard.Skeleton />
          </div>
        }
      >
        <Notes />
      </Suspense>
    </div>
  );
};

export default Dashboard;

export const metadata = {
  title: "Dashboard",
};

export const revalidate = 0;
