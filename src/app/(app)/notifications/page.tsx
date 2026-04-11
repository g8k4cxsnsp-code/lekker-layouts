import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Bell, UserPlus, Heart, MessageCircle, Crown } from "lucide-react";

const iconMap: Record<string, any> = {
  connection_request: UserPlus,
  connection_accepted: UserPlus,
  post_like: Heart,
  post_comment: MessageCircle,
  new_message: MessageCircle,
  premium_expiring: Crown,
};

export default async function NotificationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  // Mark all as read (fire-and-forget, don't block page render)
  if (notifications && notifications.some((n: any) => !n.read)) {
    supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", user.id)
      .eq("read", false)
      .then(() => {});
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="font-heading text-2xl font-bold text-foreground mb-6">
        Notifications
      </h1>

      {(!notifications || notifications.length === 0) ? (
        <div className="rounded-2xl border-2 border-primary/20 bg-card p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Bell size={28} className="text-primary" />
          </div>
          <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
            No notifications yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You&apos;ll see notifications here when someone connects with you, likes your posts, or sends you a message.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification: any) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 rounded-xl border-2 bg-card p-4 transition-colors ${
                  notification.read
                    ? "border-border/50"
                    : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon size={16} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {notification.title}
                  </p>
                  {notification.body && (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {notification.body}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
