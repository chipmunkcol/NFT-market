import { PriceHistory } from "./src/pages/NftDetail";
import { JsonRpcSigner } from "ethers";

declare module "*.svg" {
  import React from "react";
  const content: React.FC<React.SVGProps<SVGAElement>>;
  export default content;
  // const src: string;
  // export default src;
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

export type PriceHistoryT = {
  owner: string;
  price: number;
  soldTime: string;
};

export type NftMetadata = {
  nftId: number;
  nftPrice: number;
  owner: string;
  tokenUrl: string;
  isOnsale: string;
  isCollection: string;
  numberOfSales: number;
  priceHistory: PriceHistoryT[];
};

export type Collection = {
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

export type GlobalContextType = {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  signer: JsonRpcSigner | null;
  setSigner: React.Dispatch<React.SetStateAction<JsonRpcSigner>>;
  loadingState: {
    isLoading: boolean;
    message: string;
  };
  setLoadingState: React.Dispatch<
    React.SetStateAction<{
      isLoading: boolean;
      message: string;
    }>
  >;
  myNfts: Nft[];
  setMyNfts: React.Dispatch<React.SetStateAction<Nft[]>>;
  onsaleNftList: Nft[];
  setOnsaleNftList: React.Dispatch<React.SetStateAction<Nft[]>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  collection: Collection;
  setCollection: React.Dispatch<React.SetStateAction<Collection>>;
  resetCollection: () => void;
  nft: Nft;
  setNft: React.Dispatch<React.SetStateAction<Nft>>;
};

export type IpfsData = {
  // id: string;
  ipfs_pin_hash: string;
  // size: number;
  // user_id: string;
  // date_pinned: string;
  // date_unpinned: string | null;
  metadata: {
    name: string;
    keyvalues: {
      tags: string;
      nftId: number;
      owner: string;
      isOnsale: string;
      nftPrice: number;
      isCollection: string;
      priceHistory: string;
      numberOfSales: number;
      cart?: string;
    };
  };
  // regions: {
  //   regionId: string;
  //   currentReplicationCount: number;
  //   desiredReplicationCount: number;
  // }[];
  // mime_type: string;
  // number_of_files: number;
};

export type CollectionNft = {
  name: string;
  fileName: string;
  owner: string;
  isOnsale: string;
  isCollection: string;
  nftPrice: number;
  numberOfSales: number;
  priceHistory: string; // PriceHistoryT[];
  tags: string;
  nftId: number;
  tokenUrl: string;
  isReveal: boolean;
};

export type CollectionIpfsData = {
  ipfs_pin_hash: string;
  metadata: {
    name: string;
    keyvalues: {
      tags: string;
      owner: string;
      isHide: string;
      isOnsale: string;
      isCollection: string;
      numberOfSales: number;
      nftKeyvaluesList: string; // CollectionNft[];
    };
  };
};

export type CartNft = {
  nftId: number;
  nftName: string;
  tokenUrl: string;
  nftPrice: number;
  previousPrice: number;
  owner: string;
};

export type CartIpfsData = {
  ipfs_pin_hash: string;
  // size: number;
  // user_id: string;
  // date_pinned: string;
  // date_unpinned: string | null;
  metadata: {
    name: string;
    keyvalues: {
      cart: string; // CartNft[];
    };
  };
};
