"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export const handleOnboardingForm = async (data: FormData) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const name = data.get("name");
  if (!name || name === "") {
    throw new Error("Name is required");
  }

  if (typeof name !== "string") {
    throw new Error("Name must be a string");
  }

  if (name.length > 50) {
    throw new Error("Name must be less than 100 characters");
  }

  const user = await db.user.update({
    where: { id: session.user?.id },
    data: {
      name,
    },
  });

  redirect("/dashboard");
};
