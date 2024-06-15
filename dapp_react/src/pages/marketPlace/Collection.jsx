import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { getNewOnsaleNfts, getNftListAndCountToIpfs } from "../../hooks/common";
import Spinner from "../../components/Spinner";
import { pinStart } from "../../hooks/variables.";

// const tempNftKeyvalues = [{ "name": "CryptoKitty #123", "fileName": "test.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "jangkal cat", "fileName": "test10.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "borning monkey", "fileName": "test11.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "zeus", "fileName": "test12.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #222", "fileName": "test2.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #333", "fileName": "test3.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #111", "fileName": "test4.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #222", "fileName": "test5.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #333", "fileName": "test6.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #4444", "fileName": "test7.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }];

const Collection = () => {
  const { account } = useContext(GlobalContext);
  const [gridCss] = useOutletContext();
  const allNftCount = useRef(0);
  // 
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  // const [offset, setOffset] = useState({ page: 0 });
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const offsetRef = useRef(0);
  console.log('offset: ', offsetRef.current);

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );


  const fetchNftList = async (url) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
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
  }, [search, gridCss.grid]);

  useEffect(() => {
    const fetchData = async () => {
      const pageOffset = gridCss.grid === 8 ? offsetRef.current * 4 : offsetRef.current;
      const pageLimit = gridCss.grid === 8 ? 4 : 1;

      const url = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
      const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
      const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

      const currentUrl = query ? queryUrl : category ? categoryUrl : url;
      setIsLoadingApi(true);
      try {
        await fetchNftList(currentUrl);
      } finally {
        setIsLoadingApi(false);
      }

    };

    fetchData();
  }, [search]);
  // }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const infiniteScrollHandler = async () => {
    setIsLoading(true);

    offsetRef.current = offsetRef.current + 1;
    const pageOffset = gridCss.grid === 8 ? offsetRef.current * 4 : offsetRef.current;
    const pageLimit = gridCss.grid === 8 ? 4 : 1;

    const url = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

    try {
      await fetchNftList(url);
    } finally {
      setIsLoading(false);
    }

  }
  // gridCss.grid === 8 ?
  // (allNftCount.current * 4) - 4 > offsetRef.current * 4 :
  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading && allNftCount.current - 1 > offsetRef.current
      ) {
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
      {onsaleNftList.length < 1 && isLoadingApi && <Spinner _custom={{ color: '#3498db', size: '30px', height: '100px' }} />}
      {!isLoadingApi &&
        onsaleNftList.length < 1 ? (<div style={{ padding: '30px' }}>판매중인 NFT가 없습니다.</div>) : (
        <MarketWrap $gridCss={gridCss}>
          {
            onsaleNftList.length > 0 &&
            onsaleNftList.map(onsaleNft => (
              <OnsaleNftCard key={`marketplace-collection-${onsaleNft.nftId}`} nft={onsaleNft} account={account} gridCss={gridCss} />
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

export default Collection;

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