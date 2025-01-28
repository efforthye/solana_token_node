import { Connection, clusterApiUrl, Cluster } from "@solana/web3.js";
import { config } from "./config";

(async () => {
  const connection = new Connection(clusterApiUrl(config.network as Cluster), "confirmed");
  console.log(`Connected to Solana network: ${config.network}`);
})();
