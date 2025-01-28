import fs from 'fs';
import * as Client from '@web3-storage/w3up-client';
import { filesFromPaths } from 'files-from-path';
import 'dotenv/config'; 

// IPFS 클라이언트 초기화
let client: any = null;
const WEB3_STORAGE_EMAIL = process.env.WEB3_STORAGE_EMAIL;
const WEB3_STORAGE_SPACE = process.env.WEB3_STORAGE_SPACE;

export const uploadFileToIPFS = async (filePath: string): Promise<string> => {
  try {
    if (!client) {
      client = await Client.create(); // 🔥 여기 수정!

      // 첫 설정
      if (!(await client.accounts()).length) {
        const account = await client.login(WEB3_STORAGE_EMAIL || '');
        const space = await client.createSpace(WEB3_STORAGE_SPACE || '');
        await space.save();
        await account.provision(space.did());
      }
    }

    // 파일 읽기
    const files = await filesFromPaths([filePath]);
    const root = await client.uploadDirectory(files);

    console.log('Upload successful. CID:', root.toString());
    return `https://w3s.link/ipfs/${root.toString()}`;
  } catch (error) {
    console.error('IPFS 파일 업로드 실패:', error);
    throw error;
  }
};

export const uploadJSONToIPFS = async (jsonData: object): Promise<string> => {
  try {
    if (!client) {
      client = await Client.create();
    }

    // JSON 데이터를 Blob이 아닌 Uint8Array로 변환
    const buffer = Buffer.from(JSON.stringify(jsonData));
    const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

    // 개별 파일 업로드
    const cid = await client.uploadFile(blob); 

    console.log('Upload successful. CID:', cid);
    return `https://w3s.link/ipfs/${cid}`;
  } catch (error) {
    console.error('IPFS JSON 업로드 실패:', error);
    throw error;
  }
};
