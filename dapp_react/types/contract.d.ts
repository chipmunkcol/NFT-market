import { Uint256 } from "web3";

export type MyNft = {
  nftId: number;
  nftName: string;
  tokenUrl: string;
  nftPrice: number;
  collectionIpfs: string;
  fileName: string;
};

export type MyCollection = {
  ids: number[];
  startAt: MatchPrimitiveType<Uint256, unknown>;
  tempTokenUrl: string;
  isReveal: MatchPrimitiveType<bool, unknown>;
};

// export type MyCollection = {
//   ids: number[];
//   isReveal: boolean;
//   startAt: string;
//   tempTokenUrl: string;
// };
