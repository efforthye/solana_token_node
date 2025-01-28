import * as dotenv from "dotenv";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

dotenv.config();

export const config = {
  network: process.env.SOLANA_NETWORK || "devnet",
  privateKey: process.env.PRIVATE_KEY || ""
};

export const loadWallet = (): Keypair => {
  if (!config.privateKey) {
    throw new Error("개인키가 .env 파일에 설정되지 않았습니다.");
  }
  
  try {
    // 먼저 배열 형식으로 파싱 시도
    const privateKeyArray = JSON.parse(config.privateKey);
    return Keypair.fromSecretKey(new Uint8Array(privateKeyArray));
  } catch {
    // 배열 파싱에 실패하면 base58 디코딩 시도
    try {
      const privateKeyBytes = bs58.decode(config.privateKey);
      return Keypair.fromSecretKey(new Uint8Array(privateKeyBytes));
    } catch {
      throw new Error("유효하지 않은 개인키 형식입니다. array 또는 base58 형식이어야 합니다.");
    }
  }
};