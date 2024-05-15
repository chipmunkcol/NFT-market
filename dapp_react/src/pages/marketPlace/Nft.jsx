import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useContext, useEffect, useRef, useState } from "react";
import { SaleNftContract } from "../../../contracts";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs, getNftListToIpfs, ipfsGetOptions } from "../../hooks/common";

const Nft = () => {
  const { onsaleNftList, setOnsaleNftList, getAllonsaleNftListRef, account, onsaleTrigger, purchaseTrigger } = useContext(GlobalContext);
  const [grid, cardWidth] = useOutletContext();
  const allNftCount = useRef(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [offset, setOffset] = useState({ page: 0 });
  const offsetRef = useRef(0);
  console.log('offset: ', offset);

  const encodedOffset = encodeURIComponent(
    offsetRef.current * 10
  );

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const getNewOnsaleNfts = ipfsNftsList => {
    const newOnsaleNfts = [];
    ipfsNftsList.forEach(data => {
      const nftName = data.metadata.name;
      const tokenUrl = data.ipfs_pin_hash;
      const metaData = data.metadata.keyvalues;
      newOnsaleNfts.push({ ...metaData, nftName, tokenUrl });
    })
    return newOnsaleNfts;
  }


  const getNftListController = async (url) => {
    const ipfsDatas = await getNftListToIpfs(url);
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    setOnsaleNftList(newOnsaleNfts);
  }

  const getNftListControllerToInfinityScroll = async (url) => {
    const {ipfsDatas, count} = await getNftListAndCountToIpfs(url);
    allNftCount.current = count;
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    setOnsaleNftList(prev => [...prev, ...newOnsaleNfts]);
  };

  // const url = `https://api.pinata.cloud/data/pinList?pinStart=20240515&pageLimit=20&pageOffset=5&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  const url = `https://api.pinata.cloud/data/pinList?pinStart=20240515&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  const queryUrl = `https://api.pinata.cloud/data/pinList?pinStart=20240515&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;

  useEffect(() => {
    setOffset({ page: 0 });
  }, [query]);

  useEffect(() => {
    if (query) {
      getNftListControllerToInfinityScroll(queryUrl);
    } else {
      getNftListControllerToInfinityScroll(url);
    }
  }, [offset]);

  useEffect(() => {
    if (allNftCount.current) {
      getNftListController(url);
    }
  }, [onsaleTrigger, purchaseTrigger]);
// }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const infiniteScrollHandler = () => {
    setIsLoading(true);
    setOffset({ page: offsetRef.current + 1 });
    offsetRef.current = offsetRef.current + 1;
    setIsLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading  && allNftCount.current - 10 > offsetRef.current * 10) {
        infiniteScrollHandler();
      }
    }, { threshold: 1 });

    observerRef.current = observer;
    observer.observe(document.querySelector('#observer-target'));

    return () => observer.disconnect();
  }, [isLoading]);


  return (
    <>
      {
        onsaleNftList.length < 1 ? (<div>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap $grid={grid}>
            {
              onsaleNftList.map(onsaleNft => (
                <OnsaleNftCard key={`marketplace-${onsaleNft.nftId}`} nft={onsaleNft} account={account} cardWidth={cardWidth} />
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
  grid-template-columns: ${props => props.$grid};
  gap: 10px;
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
  