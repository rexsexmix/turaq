"use client";

import { useEffect, useState } from "react";
import { DEMO_AUTH_EVENT, readDemoLoggedIn } from "@/lib/demoSession";

export function useDemoAuth(): { loggedIn: boolean; ready: boolean } {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLoggedIn(readDemoLoggedIn());
    sync();
    setReady(true);
    window.addEventListener(DEMO_AUTH_EVENT, sync);
    return () => window.removeEventListener(DEMO_AUTH_EVENT, sync);
  }, []);

  return { loggedIn, ready };
}
