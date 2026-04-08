"use client";

import { useState } from "react";
import { UserPlus, UserCheck, Clock, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface ConnectionButtonProps {
  profileId: string;
  initialStatus: "none" | "pending" | "connected";
}

export function ConnectionButton({
  profileId,
  initialStatus,
}: ConnectionButtonProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    if (status !== "none") return;
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("connections").insert({
      requester_id: user.id,
      receiver_id: profileId,
      status: "pending",
    });

    if (!error) {
      setStatus("pending");
    }
    setLoading(false);
  };

  if (status === "connected") {
    return (
      <button
        disabled
        className={cn(
          buttonVariants({ variant: "outline" }),
          "gap-2 cursor-default"
        )}
      >
        <UserCheck size={14} />
        Connected
      </button>
    );
  }

  if (status === "pending") {
    return (
      <button
        disabled
        className={cn(
          buttonVariants({ variant: "outline" }),
          "gap-2 cursor-default"
        )}
      >
        <Clock size={14} />
        Pending
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className={cn(buttonVariants(), "gap-2")}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <UserPlus size={14} />
      )}
      Connect
    </button>
  );
}
