"use client";
import { useEffect, useState } from "react";
import { timeAgo } from "@/lib/utils";

export const TimeAgo = ({ children }) => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  if (!children) return null;

  if (typeof children === "string") {
    children = new Date(children);
  }

  return <div suppressHydrationWarning>{timeAgo(children)}</div>;
};
