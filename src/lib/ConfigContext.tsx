"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_CONFIG,
  type SiteConfig,
  type ContentConfig,
  type AnimationConfig,
  type DualAnimationConfig,
} from "@/lib/siteConfig";

const ConfigContext = createContext<SiteConfig>(DEFAULT_CONFIG);

export function ConfigProvider({
  children,
  initialConfig,
}: {
  children: ReactNode;
  initialConfig?: SiteConfig;
}) {
  const [config, setConfig] = useState<SiteConfig>(
    initialConfig ?? DEFAULT_CONFIG
  );

  useEffect(() => {
    if (initialConfig) return; // Already have config from server
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.content) setConfig(data);
      })
      .catch(() => {
        // Use defaults
      });
  }, [initialConfig]);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig(): SiteConfig {
  return useContext(ConfigContext);
}

export function useContent(): ContentConfig {
  return useContext(ConfigContext).content;
}

/** Returns desktop animation config (backward compat) */
export function useAnimationConfig(): AnimationConfig {
  return useContext(ConfigContext).animation.desktop;
}

/** Returns both desktop and mobile animation configs */
export function useDualAnimationConfig(): DualAnimationConfig {
  return useContext(ConfigContext).animation;
}

/** Returns the appropriate animation config based on viewport width */
export function useResponsiveAnimationConfig(): AnimationConfig {
  const { desktop, mobile } = useContext(ConfigContext).animation;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isMobile ? mobile : desktop;
}
