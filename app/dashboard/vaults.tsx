import { db } from "@/lib/db";
import { WorkspaceCard } from "./vault-card";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const Vaults = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const notes = await db.note.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="mt-8 divide-y divide-border overflow-clip rounded-lg  ">
      {notes.length > 0 ? (
        notes.map((note) => <div key={note.id}>{note.title}</div>)
      ) : (
        <div className="rounded-lg bg-gray-2 p-8 text-gray-11 shadow-inner">
          No notes yet...
        </div>
      )}
    </div>
  );
};
