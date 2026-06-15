import type { ReactNode } from "react";

// This root layout is intentionally minimal.
// The [lang] layout below provides the full <html> shell.
// The proxy.ts redirects all root requests to /[lang]/...
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
