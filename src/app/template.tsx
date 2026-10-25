import { ViewTransition } from "react";

/**
 * Templates remount on every navigation, so this <ViewTransition> sees the
 * old page exit and the new one enter. Animations live in globals.css (.page).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
