import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PARAJULI'S — your family's cozy corner" },
      { name: "description", content: "Sign in to PARAJULI'S to share messages, photos and memories with the people you love." },
      { property: "og:title", content: "PARAJULI'S — your family's cozy corner" },
      { property: "og:description", content: "Sign in to PARAJULI'S to share messages, photos and memories with the people you love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      if (data.user) navigate({ to: "/home", replace: true });
      else navigate({ to: "/auth", search: { mode: "signin" }, replace: true });
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl text-plum">PARAJULI'S</h1>
        <p className="mt-2 text-sm text-muted-foreground">Warming up your family's corner…</p>
      </div>
    </div>
  );
}
