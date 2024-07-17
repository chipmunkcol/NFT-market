import { JsonRpcSigner } from "ethers";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

export type Nft = {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
};

export type GlobalContextType = {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  signer: JsonRpcSigner | null;
  setSigner: React.Dispatch<React.SetStateAction<JsonRpcSigner>>;
  myNfts: Nft[];
  setMyNfts: React.Dispatch<React.SetStateAction<Nft[]>>;
  onsaleNftList: Nft[];
  setOnsaleNftList: React.Dispatch<React.SetStateAction<Nft[]>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  collection: {
    name: string;
    tags: string[];
    nfts: Nft[];
    nftsLength: number;
    perPrice: number;
    startAt: number;
    preReleaseJsonData: {
      description: string;
      file: File | null;
    };
  };
  setCollection: React.Dispatch<
    React.SetStateAction<{
      name: string;
      tags: string[];
      nfts: Nft[];
      nftsLength: number;
      perPrice: number;
      startAt: number;
      preReleaseJsonData: {
        description: string;
        file: File | null;
      };
    }>
  >;
  resetCollection: () => void;
  nft: Nft;
  setNft: React.Dispatch<React.SetStateAction<Nft>>;
};
