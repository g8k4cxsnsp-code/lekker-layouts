"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  Crown,
  MapPin,
  Briefcase,
  MessageCircle,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  acceptConnectionRequest,
  declineConnectionRequest,
  removeConnection,
} from "@/lib/actions/connections";
import { createDirectConversation } from "@/lib/actions/messages";
import { UserAvatar } from "@/components/app/user-avatar";

interface ConnectionsContentProps {
  pendingReceived: any[];
  pendingSent: any[];
  accepted: any[];
  currentUserId: string;
}

export function ConnectionsContent({
  pendingReceived,
  pendingSent,
  accepted,
  currentUserId,
}: ConnectionsContentProps) {
  const router = useRouter();
  const [received, setReceived] = useState(pendingReceived);
  const [sent, setSent] = useState(pendingSent);
  const [connections, setConnections] = useState(accepted);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (requesterId: string) => {
    setLoadingId(requesterId);
    const result = await acceptConnectionRequest(requesterId);
    if (result.success) {
      const accepted = received.find(
        (r) => r.profiles?.id === requesterId
      );
      setReceived((prev) =>
        prev.filter((r) => r.profiles?.id !== requesterId)
      );
      if (accepted) {
        setConnections((prev) => [...prev, accepted]);
      }
    }
    setLoadingId(null);
  };

  const handleDecline = async (requesterId: string) => {
    setLoadingId(requesterId);
    const result = await declineConnectionRequest(requesterId);
    if (result.success) {
      setReceived((prev) =>
        prev.filter((r) => r.profiles?.id !== requesterId)
      );
    }
    setLoadingId(null);
  };

  const handleRemove = async (otherUserId: string) => {
    setLoadingId(otherUserId);
    const result = await removeConnection(otherUserId);
    if (result.success) {
      setConnections((prev) =>
        prev.filter((c) => c.profiles?.id !== otherUserId)
      );
    }
    setLoadingId(null);
  };

  const handleMessage = async (otherUserId: string) => {
    setLoadingId(otherUserId);
    const result = await createDirectConversation(otherUserId);
    if (result.conversationId) {
      router.push(`/messages/${result.conversationId}`);
    }
    setLoadingId(null);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <h1 className="font-heading text-2xl font-bold text-foreground">
            My Network
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your connections and requests
          </p>
        </motion.div>

        {/* Pending requests banner */}
        {received.length > 0 && (
          <motion.div
            variants={fadeInUp}
            className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <UserPlus size={16} />
              {received.length} pending connection{received.length !== 1 ? "s" : ""} request{received.length !== 1 ? "s" : ""}
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeInUp}>
          <Tabs defaultValue={received.length > 0 ? "received" : "connections"}>
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="received" className="gap-1.5">
                Requests
                {received.length > 0 && (
                  <Badge className="ml-1 h-5 min-w-5 rounded-full px-1.5 text-xs">
                    {received.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="connections">
                Connections ({connections.length})
              </TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
            </TabsList>

            {/* Received requests */}
            <TabsContent value="received" className="mt-4 space-y-3">
              {received.length === 0 ? (
                <EmptyState
                  icon={<UserPlus size={32} />}
                  title="No pending requests"
                  description="When someone wants to connect, their request will appear here."
                />
              ) : (
                received.map((req) => (
                  <PersonCard
                    key={req.id}
                    profile={req.profiles}
                    loading={loadingId === req.profiles?.id}
                    actions={
                      <>
                        <button
                          onClick={() => handleAccept(req.profiles.id)}
                          disabled={loadingId === req.profiles?.id}
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "gap-1.5"
                          )}
                        >
                          <UserCheck size={14} />
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(req.profiles.id)}
                          disabled={loadingId === req.profiles?.id}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "sm" }),
                            "gap-1.5"
                          )}
                        >
                          <UserX size={14} />
                          Decline
                        </button>
                      </>
                    }
                  />
                ))
              )}
            </TabsContent>

            {/* Accepted connections */}
            <TabsContent value="connections" className="mt-4 space-y-3">
              {connections.length === 0 ? (
                <EmptyState
                  icon={<Search size={32} />}
                  title="No connections yet"
                  description="Start building your network by discovering other business owners."
                  action={
                    <Link
                      href="/discover"
                      className={cn(buttonVariants(), "mt-4 gap-2")}
                    >
                      <Search size={16} />
                      Discover Businesses
                    </Link>
                  }
                />
              ) : (
                connections.map((conn) => (
                  <PersonCard
                    key={conn.id}
                    profile={conn.profiles}
                    loading={loadingId === conn.profiles?.id}
                    actions={
                      <>
                        <button
                          onClick={() => handleMessage(conn.profiles.id)}
                          disabled={loadingId === conn.profiles?.id}
                          className={cn(
                            buttonVariants({ size: "sm" }),
                            "gap-1.5"
                          )}
                        >
                          <MessageCircle size={14} />
                          Message
                        </button>
                        <button
                          onClick={() => handleRemove(conn.profiles.id)}
                          disabled={loadingId === conn.profiles?.id}
                          className={cn(
                            buttonVariants({
                              variant: "outline",
                              size: "sm",
                            }),
                            "gap-1.5 text-destructive hover:text-destructive"
                          )}
                        >
                          <UserX size={14} />
                          Remove
                        </button>
                      </>
                    }
                  />
                ))
              )}
            </TabsContent>

            {/* Sent requests */}
            <TabsContent value="sent" className="mt-4 space-y-3">
              {sent.length === 0 ? (
                <EmptyState
                  icon={<Clock size={32} />}
                  title="No pending sent requests"
                  description="Requests you've sent that are waiting for a response will appear here."
                />
              ) : (
                sent.map((req) => (
                  <PersonCard
                    key={req.id}
                    profile={req.profiles}
                    loading={false}
                    actions={
                      <Badge variant="secondary" className="gap-1.5">
                        <Clock size={12} />
                        Pending
                      </Badge>
                    }
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}

function PersonCard({
  profile,
  loading,
  actions,
}: {
  profile: any;
  loading: boolean;
  actions: React.ReactNode;
}) {
  if (!profile) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border-2 border-primary/15 bg-card p-4 transition-opacity",
        loading && "opacity-60"
      )}
    >
      <Link href={`/profile/${profile.username || profile.id}`}>
        <UserAvatar
          src={profile.logo_url}
          name={profile.business_name || profile.full_name}
          size="md"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/profile/${profile.username || profile.id}`}
            className="font-heading text-sm font-semibold text-foreground hover:underline truncate"
          >
            {profile.business_name || profile.full_name}
          </Link>
          {profile.is_premium && (
            <Crown size={14} className="shrink-0 text-amber-500" />
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {profile.industry && (
            <span className="flex items-center gap-1">
              <Briefcase size={10} />
              {profile.industry}
            </span>
          )}
          {profile.location && (
            <span className="flex items-center gap-1">
              <MapPin size={10} />
              {profile.location}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">{actions}</div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 border-primary/20 bg-card p-12 text-center">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="font-heading text-base font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {action}
    </div>
  );
}
