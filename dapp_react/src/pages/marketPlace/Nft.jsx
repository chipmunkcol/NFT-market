import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SaleNftContract } from "../../../contracts";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs, getNftListToIpfs, ipfsGetOptions } from "../../hooks/common";
import {tempNftArray} from "../../../../testJson/nftArray";

const Nft = () => {
  const { getAllonsaleNftListRef, account, onsaleTrigger, purchaseTrigger } = useContext(GlobalContext);
  const [gridCss] = useOutletContext();
  const onsaleNftList = tempNftArray;
  // const allNftCount = useRef(0);
  // const [offset, setOffset] = useState({ page: 0 });
  // const [onsaleNftList, setOnsaleNftList] = useState([]);
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('query');
//   const offsetRef = useRef(0);
//   const newNftListRef = useRef([]);
//   console.log('offset: ', offset);

//   const encodedOffset = encodeURIComponent(
//     gridCss.grid === 5 ? offsetRef.current * 10 : offsetRef.current * 32
//   );

//   const encodedSearchQuery = encodeURIComponent(
//     query
//   );
  
  // const url = gridCss.grid === 5 ? `https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&pinStart=20240515&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}` :
  //   `https://api.pinata.cloud/data/pinList?pageLimit=32&pageOffset=${encodedOffset}&pinStart=20240515&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  
  //   const queryUrl = `https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&pinStart=20240515&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;


//   const getNewOnsaleNfts = ipfsNftsList => {
//     const newOnsaleNfts = [];
//     ipfsNftsList.forEach(data => {
//       const nftName = data.metadata.name;
//       const tokenUrl = data.ipfs_pin_hash;
//       const metaData = data.metadata.keyvalues;
//       newOnsaleNfts.push({ ...metaData, nftName, tokenUrl });
//     })
//     return newOnsaleNfts;
//   }

  const removedNftListByPurchase = (nftId) => {
    newNftListRef.current = onsaleNftList.filter(nft => nft.nftId !== nftId);
  }

//   useEffect(() => {
//     setOnsaleNftList(newNftListRef.current);
//   }, [purchaseTrigger])

//   useEffect(() => {
//     if (allNftCount.current) {
//       setOffset({ page: 0 });
//       offsetRef.current = 0;
//       setOnsaleNftList([]);
//     }
//   }, [query]);

//   const getNftListControllerToInfinityScroll = useCallback(async (url) => {
//     const {ipfsDatas, count} = await getNftListAndCountToIpfs(url);
//     allNftCount.current = count;
//     const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
//     setOnsaleNftList(prev => [...prev, ...newOnsaleNfts]);
//   }, [offset]);

//   useEffect(() => {
//     if (query) {
//       getNftListControllerToInfinityScroll(queryUrl);
//     } else {
//       getNftListControllerToInfinityScroll(url);
//     }
//   }, [getNftListControllerToInfinityScroll]);
// // }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

//   // 무한스크롤 구현
//   const [isLoading, setIsLoading] = useState(false);
//   const observerRef = useRef(null);

//   const infiniteScrollHandler = () => {
//     setIsLoading(true);
//     setOffset({ page: offsetRef.current + 1 });
//     offsetRef.current = offsetRef.current + 1;
//     setIsLoading(false);
//   }

// const gridBooleanOption = gridCss.grid === 5 ? (allNftCount.current - 10 > offsetRef.current * 10) : 
//     (allNftCount.current - 32 > offsetRef.current * 32);

//   useEffect(() => {
//     const observer = new IntersectionObserver((entryies) => {
//       if (entryies[0].isIntersecting && !isLoading  && gridBooleanOption ) {
//         infiniteScrollHandler();
//       }
//     }, { threshold: 1 });

//     observerRef.current = observer;
//     observer.observe(document.querySelector('#observer-target'));

//     return () => observer.disconnect();
//   }, [isLoading]);


  return (
    <>
      {
        onsaleNftList.length < 1 ? (<div>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap $gridCss={gridCss}>
            {
              onsaleNftList.map(onsaleNft => (
                <OnsaleNftCard key={`marketplace-nft-${onsaleNft.nftId}`} nft={onsaleNft} account={account} gridCss={gridCss} removedNftListByPurchase={removedNftListByPurchase} />
              ))
            }
          </MarketWrap>
        )
      }
      <div id="observer-target" style={{ width: '100%', height: '100px', backgroundColor: 'red' }}></div>
    </>
  )
}

export default Nft;

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$gridCss.gridTemplateColumns};
  gap: ${props => props.$gridCss.gap};
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
  