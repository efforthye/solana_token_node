import { Connection, clusterApiUrl } from "@solana/web3.js";
import { config } from "./config";
(async () => {
    const connection = new Connection(clusterApiUrl(config.network), "confirmed");
    console.log(`Connected to Solana network: ${config.network}`);
})();
