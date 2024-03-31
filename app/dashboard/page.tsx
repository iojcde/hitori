import { WorkspaceCard } from "./vault-card";
import { Notes } from "./notes";
import { Suspense } from "react";
import Link from "next/link";
import { NewNoteButton } from "./new-note-button";

const Dashboard = async () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Notes</h1>
        <NewNoteButton />
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
