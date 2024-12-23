"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { darkTheme, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
    skaleCalypsoTestnet,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
    appName: "Calypso Hub Holiday Contest",
    projectId: "b778fc38a24b6d5279eff7d14d0417ac",
    chains: [skaleCalypsoTestnet],
    ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

export default function Web3Providers({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: "var(--primary)",
                        borderRadius: "medium"
                    })}
                >{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
