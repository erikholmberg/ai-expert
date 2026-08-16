import { BookmarksClient } from "./bookmarks-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks — AI Expert",
};

export default function BookmarksPage() {
  return <BookmarksClient />;
}
