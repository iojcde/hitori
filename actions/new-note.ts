"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";

export const newNote = async () => {
  const session = await auth();

  if (!session) return null;
  console.log(session);

  const n = await db.note.create({
    data: {
      title: "Untitled",
      content: "",
      userId: session.user.id,
    },
  });

  revalidatePath("/editor");
  return n;
};
