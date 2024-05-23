import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs } from "../../hooks/common";
// import {tempNftArray} from "../../../../testJson/nftArray";

const Nft = () => {
  const { account } = useContext(GlobalContext);
  const [gridCss] = useOutletContext();
  
  const allNftCount = useRef(0);
  const [offset, setOffset] = useState({ page: 0 });
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const offsetRef = useRef(0);
  console.log('offset: ', offset);

  const encodedOffset = encodeURIComponent(
    offsetRef.current * 10
  );

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedUpdateDate = encodeURIComponent(
    '20240523'
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );

  const url = `https://api.pinata.cloud/data/pinList?pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  const queryUrl = `https://api.pinata.cloud/data/pinList?pinStart==${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  const categoryUrl = `https://api.pinata.cloud/data/pinList?pinStart==${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":${encodedCategory},"op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  // const queryCategoryUrl = `https://api.pinata.cloud/data/pinList?pinStart==${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"tags":{"value":${encodedCategory},"op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
  const urlRef = useRef(url);
  const queryUrlRef = useRef(queryUrl);
  // ipfsNftsList[0].metadata.keyvalues
  const getPreviousPrice = priceHistory => {
    const parsedPriceHistory = JSON.parse(priceHistory);
    if (parsedPriceHistory.length < 1) return 0;

    const previousPrice = parsedPriceHistory[0].price;
    return previousPrice;
  };

  const getNewOnsaleNfts = ipfsNftsList => {
    const newOnsaleNfts = ipfsNftsList.map(ipfsNft => {
      const tokenUrl = ipfsNft.ipfs_pin_hash;
      const nftName = ipfsNft.metadata.name;
      const { nftId, nftPrice, owner, priceHistory } = ipfsNft.metadata.keyvalues;
      const previousPrice = getPreviousPrice(priceHistory);
      return { nftId, nftName, tokenUrl, nftPrice, previousPrice, owner  };
    });
    return newOnsaleNfts;
  }


  useEffect(() => {
    if (allNftCount.current) {
      setOffset({ page: 0 });
      offsetRef.current = 0;
      setOnsaleNftList([]);
    }
  }, [query]);

  useEffect(() => {
    if (allNftCount.current) {
      urlRef.current = categoryUrl;
      setOffset({ page: 0 });
      offsetRef.current = 0;
      setOnsaleNftList([]);
    }
  }, [category]);

  const getNftListControllerToInfinityScroll = useCallback(async (url) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
    allNftCount.current = count;
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    setOnsaleNftList(prev => [...prev, ...newOnsaleNfts]);
  }, [offset]);

  useEffect(() => {
    if (query) {
      getNftListControllerToInfinityScroll(queryUrlRef.current);
    } else {
      getNftListControllerToInfinityScroll(urlRef.current);
    }
  }, [getNftListControllerToInfinityScroll]);
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
      if (entryies[0].isIntersecting && !isLoading && allNftCount.current - 10 > offsetRef.current * 10) {
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
          <MarketWrap $gridCss={gridCss}>
            {
              onsaleNftList.map(onsaleNft => (
                <OnsaleNftCard key={`marketplace-nft-${onsaleNft.nftId}-${onsaleNft.tokenUrl}`} nft={onsaleNft} account={account} gridCss={gridCss} />
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
  