import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { skaleCalypso, skaleCalypsoTestnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const isMainnet = process.env.NETWORK === "mainnet";
// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "b778fc38a24b6d5279eff7d14d0417ac";

// 2. Create a metadata object - optional
const metadata = {
    name: "AppKit",
    description: "AppKit Example",
    url: "https://example.com", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [
    isMainnet ? skaleCalypso : skaleCalypsoTestnet,
    ...[isMainnet ? skaleCalypso : skaleCalypsoTestnet],
];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    defaultNetwork: isMainnet ? skaleCalypso : skaleCalypsoTestnet,
    networks: [
        isMainnet ? skaleCalypso : skaleCalypsoTestnet,
        ...[isMainnet ? skaleCalypso : skaleCalypsoTestnet],
    ],
    projectId,
    metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
    },
});

export function Web3Provider({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
