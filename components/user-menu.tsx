"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <span className="h-9 w-9 shrink-0 rounded-md border border-transparent" />
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-[140px] truncate text-xs text-muted-foreground sm:inline">
        <User className="mr-1 inline h-3 w-3 align-middle" />
        {session.user.name ?? session.user.email ?? "Signed in"}
      </span>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-2"
        onClick={() => void signOut({ callbackUrl: "/" })}
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
