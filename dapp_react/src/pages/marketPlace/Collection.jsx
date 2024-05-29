import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNewOnsaleNfts, getNftListAndCountToIpfs } from "../../hooks/common";
import Spinner from "../../components/Spinner";
import { pinStart } from "../../hooks/variables.";

// const tempNftKeyvalues = [{ "name": "CryptoKitty #123", "fileName": "test.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "jangkal cat", "fileName": "test10.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "borning monkey", "fileName": "test11.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "zeus", "fileName": "test12.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #222", "fileName": "test2.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #333", "fileName": "test3.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #111", "fileName": "test4.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #222", "fileName": "test5.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #333", "fileName": "test6.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #4444", "fileName": "test7.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }];

const Collection = () => {
  const { account } = useContext(GlobalContext);
  const [gridCss] = useOutletContext();
  const allNftCount = useRef(0);
  // 
  const [offset, setOffset] = useState({ page: 0 });
  const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const offsetRef = useRef(0);
  console.log('offset: ', offset);

  const encodedLimit = encodeURIComponent(
    gridCss.grid === 8 ? 5 : 2
  );

  const encodedOffset = encodeURIComponent(
    gridCss.grid === 8 ? offsetRef.current * 4 : offsetRef.current
  );

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );


  const url = `https://api.pinata.cloud/data/pinList?pageLimit=${encodedLimit}&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${encodedLimit}&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${encodedLimit}&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

  // const url = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  // const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  // const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${pinStart}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

  // ipfsNftsList[0].metadata.keyvalues.nftKeyvaluesList



  useEffect(() => {
    if (query !== null) {
      offsetRef.current = 0;

      setOnsaleNftList([]);
    }
  }, [query]);

  useEffect(() => {
    if (category) {
      offsetRef.current = 0;

      setOnsaleNftList([]);
    }
  }, [category]);

  const getNftListControllerToInfinityScroll = async (url) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
    allNftCount.current = count;
    setIsLoading(false);
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    setOnsaleNftList(prev => [...prev, ...newOnsaleNfts]);
  }

  useEffect(() => {
    if (query) {
      getNftListControllerToInfinityScroll(queryUrl);
    } else if (category) {
      getNftListControllerToInfinityScroll(categoryUrl);
    } else {
      getNftListControllerToInfinityScroll(url);
    }
  }, [offset, query, category]);
  // }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const infiniteScrollHandler = () => {
    setIsLoading(true);
    setOffset({ page: offsetRef.current + 1 });
    offsetRef.current = offsetRef.current + 1;
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading && gridCss.grid === 8 ?
        (allNftCount.current * 4) - 4 > offsetRef.current * 4 :
        allNftCount.current - 1 > offsetRef.current
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
      {
        onsaleNftList.length < 1 ? (<div style={{ padding: '30px' }}>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap $gridCss={gridCss}>
            {
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