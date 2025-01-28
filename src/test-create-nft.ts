import { Connection } from "@solana/web3.js";
import { createNFT } from "./services/token/nft.js";
import { loadWallet } from "./config.js";

const main = async () => {
  try {
    const connection = new Connection("https://api.devnet.solana.com", "confirmed");
    const payer = loadWallet();
    
    console.log("NFT 생성 시작...");
    const nftAddress = await createNFT(connection, payer);
    
    console.log("NFT가 성공적으로 생성되었습니다!");
    console.log("NFT 주소:", nftAddress);
    
  } catch (error) {
    console.error("NFT 생성 중 오류 발생:", error);
  }
};

main();