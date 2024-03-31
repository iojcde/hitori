"use client";

import { newNote } from "@/actions/new-note";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next-nprogress-bar";
import { toast } from "sonner";

export const SidebarContent = ({}) => {
  const router = useRouter();

  return (
    <div className="px-2 flex items-center gap-2">
      <input
        className="text-xs px-4 py-2 border w-full h-8 rounded-sm"
        placeholder="Search anything"
      />
      <button
        onClick={async () => {
          toast.promise(newNote(), {
            loading: "Creating a new note...",
            success: (n) => {
              router.push(`/editor/${n.id}`);
              return "Note created";
            },
            error: "Failed to create note",
          });
        }}
        className="text-xs gap-1 font-semibold flex justify-center p-1.5 h-8 aspect-square rounded-sm text-gray-11 items-center border "
      >
        <PlusIcon size={14} strokeWidth={3} />
      </button>
    </div>
  );
};
