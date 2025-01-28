import { Connection, Keypair } from "@solana/web3.js";
import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../../utils/ipfs.js";

export const createNFT = async (connection: Connection, payer: Keypair): Promise<string> => {
  const metaplex = Metaplex.make(connection).use(keypairIdentity(payer));

  console.log("이미지 업로드 중...");
  const imageUrl = await uploadFileToIPFS("src/assets/test.png");

  const metadata = {
    name: "Test",
    symbol: "TST",
    description: "This is an test NFT",
    image: imageUrl,
  };

  console.log("메타데이터 업로드 중...");
  const metadataUri = await uploadJSONToIPFS(metadata);

  console.log("NFT 생성 중...");
  const { nft } = await metaplex.nfts().create({
    uri: metadataUri,
    name: metadata.name,
    symbol: metadata.symbol,
    sellerFeeBasisPoints: 500,
    mintAuthority: payer,
    updateAuthority: payer,
  });

  console.log(`NFT Created: ${nft.address.toBase58()}`);
  return nft.address.toBase58();
};