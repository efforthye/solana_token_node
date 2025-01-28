import { createMint } from "@solana/spl-token";
export const createToken = async (connection, payer) => {
    const mint = await createMint(connection, payer, payer.publicKey, null, 9 // 소수점 자리수 (기본: 9, NFT는 0으로 설정)
    );
    console.log(`Token Mint Address: ${mint.toBase58()}`);
    return mint.toBase58();
};
