import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs } from "../../hooks/common";
import Spinner from "../../components/Spinner";
import { pinStart } from "../../hooks/variables.";
// import {tempNftArray} from "../../../../testJson/nftArray";

const Nft = () => {
  const { account } = useContext(GlobalContext);
  const [gridCss] = useOutletContext();
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const allNftCount = useRef(0);
  const [offset, setOffset] = useState({ page: 0 });
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const offsetRef = useRef(0);
  console.log('offset: ', offsetRef.current);

  // const encodedOffset = encodeURIComponent(
  //   offsetRef.current * 10
  // );

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );

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

  const {search} = useLocation();

  const fetchNftList = async (url) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
    // if (!ipfsDatas) {
    //   window.location.reload();
    //   return;
    // }
    allNftCount.current = count;
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    setOnsaleNftList(prev => [...prev, ...newOnsaleNfts]);
  }

  useEffect(() => {
    const resetData = () => {
      offsetRef.current = 0;
      allNftCount.current = 0;
      setOnsaleNftList([]);
    };

    resetData();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingApi(true);

      const url = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageOffset=${offsetRef.current * 10}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
      const queryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageOffset=${offsetRef.current * 10}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
      const categoryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageOffset=${offsetRef.current * 10}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
      
      const currentUrl = query ? queryUrl : category ? categoryUrl : url;
      await fetchNftList(currentUrl);

      setIsLoadingApi(false);
    };

    fetchData();
  }, [search]);
  // }, [offset, search]);
  // }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const infiniteScrollHandler = async () => {
    setIsLoading(true);
    // setOffset({ page: offsetRef.current + 1 });
    offsetRef.current = offsetRef.current + 1;
    const url = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageOffset=${offsetRef.current * 10}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
    await fetchNftList(url);
    
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
    <Count>결과 {onsaleNftList.length}개</Count>
      { onsaleNftList.length < 1 && isLoadingApi && <Spinner _custom={{ color: '#3498db', size: '30px', height: '100px' }} /> }
      { !isLoadingApi &&
        onsaleNftList.length < 1 ? (<div style={{ padding:'30px' }}>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap $gridCss={gridCss}>
            {
              onsaleNftList.map(onsaleNft => (
                <OnsaleNftCard key={`marketplace-nft-${onsaleNft.nftId}-${onsaleNft.tokenUrl}`} nft={onsaleNft} account={account} gridCss={gridCss} />
              ))
            }
          </MarketWrap>
        )
      }
      <div id="observer-target" style={{ width: '100%', height: '1px', backgroundColor: 'transparent' }}></div>
      {
        isLoading && <Spinner _custom={{
          color: '#3498db',
          size: '20px',
          height: '100px'
        }} />
      }
    </>
  )
}

export default Nft;


const Count = styled.div`
    position: fixed;
    z-index: 10;
    top: 29%;
    left: 32px;
    font-size: 14px;
`;

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
  