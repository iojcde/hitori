"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { newNote } from "@/actions/new-note";
import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";

export const NewNoteButton = () => {
  const router = useRouter();
  return (
    <Button
      variant={"ghost"}
      className={cn("flex items-center gap-2")}
      onClick={async () => {
        toast.promise(newNote(), {
          loading: "Creating a new note...",
          success: (n: any) => {
            if (!n) throw new Error("Failed to create note");

            router.push(`/editor/${n.id}`);
            return "Note created";
          },
          error: "Failed to create note",
        });
      }}
    >
      <PlusCircle className="inline-block" />
      <div className="text-gray-11">
        <span className="font-semibold text-gray-12">New</span> {` `}note
      </div>
    </Button>
  );
};
