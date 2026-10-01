"use client";

import { useEffect, useState } from "react";

export default function CowSharingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/cow-sharing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("You're on the list! We'll let you know when the next sharing opens.");
      setEmail("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Close */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm transition hover:text-black"
          aria-label="Close"
        >
          <span className="material-symbols-outlined">
            close
          </span>
        </button>

        {/* Image / visual */}
        <div className="flex h-44 items-center justify-center bg-[#eef4e9]">
          <span className="text-7xl">🐄</span>
        </div>

        <div className="p-7 text-center">

          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Coming Soon
          </span>

          <h2 className="text-2xl font-bold text-[#131811]">
            Want to join our next Cow Sharing?
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-[#6f8961]">
            Cow Sharing lets you join others to share the cost of a cow
            and enjoy quality meat at a better value.
          </p>

          <p className="mt-2 text-sm font-medium text-[#131811]">
            Leave your email and we'll notify you when the next one opens.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-xl border border-[#dfe6da] bg-[#f7f9f5] px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-5 py-3 font-bold text-[#162210] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Joining..." : "Notify Me"}
            </button>
          </form>

          {message && (
            <p className="mt-4 text-sm text-primary">
              {message}
            </p>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 text-xs text-gray-400 hover:text-gray-600"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}