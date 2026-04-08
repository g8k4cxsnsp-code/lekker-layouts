import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function AppShell({ children, userName }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppNavbar userName={userName} />
        <main className="pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
