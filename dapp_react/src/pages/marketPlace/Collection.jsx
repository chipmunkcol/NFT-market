import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs } from "../../hooks/common";

// const tempNftKeyvalues = [{ "name": "CryptoKitty #123", "fileName": "test.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "jangkal cat", "fileName": "test10.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "borning monkey", "fileName": "test11.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "zeus", "fileName": "test12.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #222", "fileName": "test2.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "CryptoKitty #333", "fileName": "test3.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #111", "fileName": "test4.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #222", "fileName": "test5.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #333", "fileName": "test6.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }, { "name": "Jack's NFT #4444", "fileName": "test7.json", "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266", "isOnsale": "true", "nftPrice": "0.888", "numberOfSales": 0, "priceHistory": "[]" }];

const Collection = () => {
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
    '20240524'
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );


  const url = `https://api.pinata.cloud/data/pinList?pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  const queryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  const categoryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

  // const url = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  // const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
  // const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=2&pinStart=${encodedUpdateDate}&pageOffset=${encodedOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

  // ipfsNftsList[0].metadata.keyvalues.nftKeyvaluesList
  const getNewOnsaleNfts = ipfsNftsList => {
    let newOnsaleNfts = [];
    ipfsNftsList.slice(0, 1).forEach(data => {
      const collectionIpfs = data.ipfs_pin_hash;
      const parsedCollectionNftList = JSON.parse(data.metadata.keyvalues.nftKeyvaluesList);

      // const newCollectionNftList = parsedCollectionNftList.map(v => ({ ...v, nftName: v.name, tokenUrl: `${collectionIpfs}/${v.fileName}` }));
      const newCollectionNftList = parsedCollectionNftList.map(v => ({ ...v, nftName: v.name, tokenUrl: collectionIpfs }));
      newOnsaleNfts = [...newOnsaleNfts, ...newCollectionNftList];
    })
    return newOnsaleNfts;
  }


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
    setIsLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading && (allNftCount.current * 10) - 10 > offsetRef.current * 10) {
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
                <OnsaleNftCard key={`marketplace-collection-${onsaleNft.nftId}`} nft={onsaleNft} account={account} gridCss={gridCss} />
              ))
            }
          </MarketWrap>
        )
      }
      <div id="observer-target" style={{ width: '100%', height: '1px', backgroundColor: 'red' }}></div>
    </>
  )
}

export default Collection;

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$gridCss.gridTemplateColumns};
  gap: ${props => props.$gridCss.gap};
`;