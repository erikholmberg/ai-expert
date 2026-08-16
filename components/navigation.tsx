"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpen, Brain, Home, Sparkles, Bookmark, Library } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

function navHrefMatches(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  const firstSegment = href.replace(/^\//, "").split("/")[0];
  const prefix = `/${firstSegment}`;
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/learn/ml-fundamentals", label: "Learn", icon: BookOpen },
  { href: "/guides", label: "Guides", icon: Library },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/review", label: "Review", icon: Brain },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-5 w-5" />
          <span>AI Expert</span>
        </Link>
        <nav className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = navHrefMatches(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
