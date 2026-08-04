import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    poweredByHeader: false,
    reactCompiler: true,
    reactStrictMode: true,
    typedRoutes: true,
    cacheComponents: true,
    partialPrefetching: true,
    experimental: {
        typedEnv: true,
        inlineCss: true,
        useCache: true,
        viewTransition: true,
        webVitalsAttribution: ["FCP", "LCP", "CLS", "TTFB", "INP"],
    },
    logging: {
        browserToTerminal: true,
    },
    devIndicators: {
        position: "bottom-right",
    },
};

export default nextConfig;
