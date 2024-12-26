import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { skaleCalypso } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "b778fc38a24b6d5279eff7d14d0417ac";

// 2. Create a metadata object - optional
const metadata = {
    name: "Holiday Contest",
    description: "Calypso Holiday Contest 2024",
    url: "https://holiday.calypsohub.network", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/192562047"],
};

// 3. Set the networks
const networks = [skaleCalypso, ...[skaleCalypso]];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
    defaultNetwork: skaleCalypso,
    networks: [skaleCalypso, ...[skaleCalypso]],
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
