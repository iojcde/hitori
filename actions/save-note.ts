"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";
import { revalidatePath } from "next/cache";

export const saveNote = async ({ id, title, content }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const file = await unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  const saved = await db.note.update({
    where: { id, userId: session.user.id },
    data: {
      title,
      content: String(file),
      updatedAt: new Date(),
    },
  });
  revalidatePath(`/editor`);

  return {
    id: saved.id,
    title: saved.title,
    updatedAt: saved.updatedAt.toString(),
  };
};
