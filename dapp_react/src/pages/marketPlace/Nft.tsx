import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import React from "react";
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { getNftListAndCountToIpfs } from "../../hooks/common";
import {
  marketplaceNftCategoryUrl,
  marketplaceNftqueryUrl,
  marketplaceNftUrl,
} from "../../hooks/variables.";
import { useQuery } from "@tanstack/react-query";
import { IpfsData, NewOnsaleNft } from "../../../type";
import Marketplace from "../../components/skeletonUI/Marketplace";
// import {tempNftArray} from "../../../../testJson/nftArray";

export type GridCss = {
  gridTemplateColumns: string;
  gap: string;
};

export type OutletContextType = [
  gridCss: GridCss,
  setCount: React.Dispatch<React.SetStateAction<number>>
];

const Nft = () => {
  const [gridCss, setCount] = useOutletContext<OutletContextType>();
  // const [isLoadingApi, setIsLoadingApi] = useState(false);
  // const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  const encodedSearchQuery = query && encodeURIComponent(query);

  const encodedCategory = encodeURIComponent(`%${category}%`);

  const getPreviousPrice = (priceHistory: string) => {
    if (!priceHistory) return;
    const parsedPriceHistory = JSON.parse(priceHistory);
    if (parsedPriceHistory.length < 1) return 0;

    const previousPrice = parsedPriceHistory[0].price;
    return previousPrice;
  };

  const getNewOnsaleNfts = (ipfsNftsList: IpfsData[]): NewOnsaleNft[] => {
    const newOnsaleNftList = ipfsNftsList.map((ipfsNft) => {
      const tokenUrl = ipfsNft.ipfs_pin_hash;
      const nftName = ipfsNft.metadata.name;
      const { priceHistory } = ipfsNft.metadata.keyvalues;
      const previousPrice = getPreviousPrice(priceHistory);
      return {
        nftName,
        tokenUrl,
        previousPrice,
        ...ipfsNft.metadata.keyvalues,
      };
    });
    return newOnsaleNftList;
  };

  const { search } = useLocation();

  const fetchNftList = async (url: string) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
    setCount(count);
    return ipfsDatas;
  };

  const {
    data: onsaleNftList,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["marketplace_nft", search],
    queryFn: () => {
      const url = marketplaceNftUrl;
      const queryUrl = marketplaceNftqueryUrl(encodedSearchQuery);
      const categoryUrl = marketplaceNftCategoryUrl(encodedCategory);
      if (query) {
        return fetchNftList(queryUrl);
      } else if (category) {
        return fetchNftList(categoryUrl);
      } else {
        return fetchNftList(url);
      }
    },
  });

  return (
    <Container>
      {isPending && <Marketplace />}
      {isSuccess &&
      onsaleNftList &&
      getNewOnsaleNfts(onsaleNftList)?.length < 1 ? (
        <div style={{ padding: "30px" }}>판매중인 NFT가 없습니다.</div>
      ) : (
        <MarketWrap $gridCss={gridCss}>
          {onsaleNftList &&
            getNewOnsaleNfts(onsaleNftList).map((onsaleNft) => (
              <OnsaleNftCard
                key={`marketplace-nft-${onsaleNft.nftId}-${onsaleNft.tokenUrl}`}
                nft={onsaleNft}
                gridCss={gridCss}
              />
            ))}
        </MarketWrap>
      )}
      {/* <div id="observer-target" style={{ width: '100%', height: '1px', backgroundColor: 'transparent' }}></div>
      {
        isLoading && <Spinner _custom={{
          color: '#3498db',
          size: '20px',
          height: '100px'
        }} />
      } */}
    </Container>
  );
};

export default Nft;

const Container = styled.div``;

const MarketWrap = styled.div<{ $gridCss: GridCss }>`
  display: grid;
  grid-template-columns: ${(props) => props.$gridCss.gridTemplateColumns};
  gap: ${(props) => props.$gridCss.gap};
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

// contract nfts 와 ipfs nfts 를 비교하여 같은 nfts 를 반환

// const [onsaleNftsInContract, setOnsaleNftsInContract] = useState([]);

// const commonNfts = checkContractNftsToIpfsNfts(onsaleNftsInContract, newOnsaleNfts)
// setOnsaleNftList(commonNfts);

// useEffect(() => {
//   async function fetchOnsaleNftIdsInContract() {
//     const _onsaleNftIdsInContract = await SaleNftContract.methods.getOnsaleNfts().call();
//     setOnsaleNftsInContract(_onsaleNftIdsInContract);
//   }
//   fetchOnsaleNftIdsInContract();
// }, [onsaleTrigger]);

// const checkContractNftsToIpfsNfts = (onsaleNftsInContract, onsaleNftsInIpfs) => {
//   const commonNfts = onsaleNftsInIpfs.filter(ipfsNft => onsaleNftsInContract.some(contractNft => (parseInt(contractNft.nftId) === ipfsNft.nftId && contractNft.tokenUrl === ipfsNft.tokenUrl)));
//   return commonNfts
// }
