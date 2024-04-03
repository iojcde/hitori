"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const addTags = async (tags: string[], noteId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!Array.isArray(tags)) {
    throw new Error("Tags must be an array");
  }

  if (tags.length > 10) {
    throw new Error("Tags must be less than 10");
  }
  const note = await db.note.findFirst({
    where: {
      id: noteId,
      userId: session.user.id,
    },
    select: {
      tags: true,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  const a = await db.note.update({
    where: {
      id: noteId,
      userId: session.user.id,
    },
    data: {
      tags,
    },
  });
  revalidateTag("/editor");
  return a;
};
