"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { unified } from "unified";
import { getServerSession } from "next-auth";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

export const saveNote = async ({ id, title, content }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const file = await unified()
    .use(rehypeParse,{fragment:true})
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

  return saved;
};
