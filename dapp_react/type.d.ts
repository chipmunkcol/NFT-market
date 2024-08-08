import { NftMetadata } from "./type.d";
import { ListObjectsCommandOutput } from "@aws-sdk/client-s3";
import { PriceHistory } from "./src/pages/NftDetail";
import { JsonRpcSigner } from "ethers";
import { MyNft } from "./types/contract";

export type DummyNft = {
  name: string;
  description: string;
  image: string;
  tokenUrl: string;
  ext: string;
};

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

export type NftMetadataBase = {
  nftId: number;
  nftPrice: number;
  owner: string;
  tokenUrl: string;
  isCollection: string;
  numberOfSales: number;
  ext: string;
  // add
  tags: string;
  cart?: string;
};

export type NftMetadata = NftMetadataBase & {
  priceHistory: PriceHistoryT[];
};

export type NftMetadataByJson = NftMetadataBase & {
  priceHistory: string;
};

export type nftMetadataAddSoldPrice = NftMetadataBase & {
  soldPrice: number;
};

export type Collection = {
  name: string;
  tags: string[];
  nfts: Nft[];
  nftsLength: number;
  perPrice: number;
  startAt: string;
  preReleaseJsonData: {
    description: string;
    file: File | null;
  };
};

type S3Obects = Required<ListObjectsCommandOutput>["Contents"];

export type GlobalContextType = {
  s3Obects: S3Obects;
  setS3Objects: React.Dispatch<React.SetStateAction<S3Obects>>;
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
  myNfts: MyNft[];
  setMyNfts: React.Dispatch<React.SetStateAction<MyNft[]>>;
  onsaleNftList: Nft[];
  setOnsaleNftList: React.Dispatch<React.SetStateAction<Nft[]>>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  collectionIndex: number;
  setCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
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
      nftPrice: number;
      isCollection: string;
      priceHistory: string;
      numberOfSales: number;
      ext: string;
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

export type CollectionNftBase = {
  name: string;
  fileName: string;
  owner: string;
  isCollection: string;
  nftPrice: number;
  numberOfSales: number;
  tags: string;
  nftId: number;
  tokenUrl: string;
  isReveal: boolean;
};

export type CollectionNftByJson = CollectionNftBase & {
  priceHistory: string;
};

export type CollectionNft = CollectionNftBase & {
  priceHistory: PriceHistoryT[];
};

export type CollectionIpfsData = {
  ipfs_pin_hash: string;
  metadata: {
    name: string;
    keyvalues: {
      tags: string;
      owner: string;
      isHide: string;
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
  metadata: {
    name: string;
    keyvalues: {
      cart: string; // CartNft[];
    };
  };
};

export type NewOnsaleNft = NftMetadataByJson & {
  nftName: string;
  tokenUrl: string;
  previousPrice: number;
};

export type NewOnsaleNftByDetailPage = NftMetadata & {
  nftName: string;
  tokenUrl: string;
};
