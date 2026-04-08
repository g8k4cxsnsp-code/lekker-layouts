"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface ChatContentProps {
  conversationId: string;
  conversation: any;
  messages: any[];
  members: any[];
  currentUserId: string;
}

export function ChatContent({
  conversationId,
  conversation,
  messages: initialMessages,
  members,
  currentUserId,
}: ChatContentProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const otherMember = members[0]?.profiles;
  const chatName =
    conversation.name ||
    otherMember?.business_name ||
    otherMember?.full_name ||
    "Chat";

  // Auto-scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Real-time subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload: { new: { id: string } }) => {
          // Fetch the full message with profile
          const { data } = await supabase
            .from("messages")
            .select(`
              *,
              profiles:sender_id (
                id, username, full_name, business_name, logo_url
              )
            `)
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setMessages((prev) => {
              // Avoid duplicates
              if (prev.some((m) => m.id === data.id)) return prev;
              return [...prev, data];
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || sending) return;

    setSending(true);
    setNewMessage("");

    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .insert({
        conversation_id: conversationId,
        sender_id: currentUserId,
        content: text,
      })
      .select(`
        *,
        profiles:sender_id (
          id, username, full_name, business_name, logo_url
        )
      `)
      .single();

    if (data) {
      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev;
        return [...prev, data];
      });
    }

    setSending(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col lg:h-[calc(100dvh)]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border/30 bg-background px-4 py-3">
        <Link
          href="/messages"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {chatName[0]}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {chatName}
          </p>
          <p className="text-xs text-muted-foreground">
            {conversation.type === "group"
              ? `${members.length + 1} members`
              : "Direct message"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mx-auto max-w-2xl space-y-3">
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No messages yet. Say hello!
              </p>
            </div>
          )}
          {messages.map((msg, i) => {
            const isOwn = msg.sender_id === currentUserId;
            const showAvatar =
              !isOwn &&
              (i === 0 || messages[i - 1]?.sender_id !== msg.sender_id);

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2",
                  isOwn ? "justify-end" : "justify-start"
                )}
              >
                {!isOwn && (
                  <div className="w-7 shrink-0">
                    {showAvatar && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                        {msg.profiles?.business_name?.[0] ||
                          msg.profiles?.full_name?.[0] ||
                          "?"}
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm",
                    isOwn
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      isOwn
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    )}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("en-ZA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/30 bg-background px-4 py-3 pb-safe">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <textarea
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity",
              (!newMessage.trim() || sending) && "opacity-50 cursor-not-allowed"
            )}
          >
            {sending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
