import { AppSidebar } from "./app-sidebar";
import { AppNavbar } from "./app-navbar";

interface AppShellProps {
  children: React.ReactNode;
  userName?: string;
  userAvatar?: string | null;
}

export function AppShell({ children, userName, userAvatar }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="lg:pl-64">
        <AppNavbar userName={userName} userAvatar={userAvatar} />
        <main className="pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}
