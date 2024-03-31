import { db } from "@/lib/db";
import { WorkspaceCard } from "./vault-card";
import Link from "next/link";
import { timeAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";

export const Notes = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const notes = await db.note.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="mt-8 rounded-lg grid lg:grid-cols-2 gap-2 ">
      {notes.length > 0 ? (
        notes.map((note) => (
          <Link
            href={`/editor/${note.id}`}
            key={note.id}
            className="p-4 shadow border rounded-lg "
          >
            <div className="font-semibold text-xl">{note.title}</div>
            <div className="mt-8">
              <Badge className="font-normal" variant={"secondary"}>
                wow
              </Badge>
            </div>
            <div className="text-gray-10 text-sm mt-2">
              {timeAgo(note.createdAt)}
            </div>
          </Link>
        ))
      ) : (
        <div className="rounded-lg bg-gray-2 p-8 text-gray-11 shadow-inner">
          No notes yet...
        </div>
      )}
    </div>
  );
};
