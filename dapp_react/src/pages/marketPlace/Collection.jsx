import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { getNewOnsaleNfts, getNftListAndCountToIpfs, isArraysEqual } from "../../hooks/common";
import Spinner from "../../components/Spinner";
import { pinStart } from "../../hooks/variables.";
import { useQuery } from "@tanstack/react-query";


const Collection = () => {
  const { account } = useContext(GlobalContext);
  const [gridCss, setCount] = useOutletContext();
  const pageLimit = 100;
  // const [isLoadingApi, setIsLoadingApi] = useState(false);

  const [searchParams] = useSearchParams();
  const { search } = useLocation();

  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );

  const fetchNftList = async (url) => {
    const { ipfsDatas, count } = await getNftListAndCountToIpfs(url);
    setCount(count * 10);
    return ipfsDatas;
  }

  const { data: onsaleNftList, isPending, isSuccess } = useQuery({
    queryKey: ['marketplace_collection', search],
    queryFn: () => {
      const url = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&metadata[keyvalues]={"isCollection":{"value":"true","op":"eq"}}`;
      const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isCollection":{"value":"true","op":"eq"}}`;
      const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isCollection":{"value":"true","op":"eq"}}`;

      if (query) {
        return fetchNftList(queryUrl);
      } else if (category) {
        return fetchNftList(categoryUrl);
      } else {
        return fetchNftList(url);
      }
    }
  });
  return (
    <Container>
      {/* {onsaleNftList.length < 1 && isLoadingApi && <Spinner _custom={{ color: '#3498db', size: '30px', height: '100px' }} />} */}
      {isPending && <Spinner _custom={{ color: '#3498db', size: '30px', height: '100px' }} />}
      {isSuccess && onsaleNftList &&
        getNewOnsaleNfts(onsaleNftList)?.length < 1 ? (<div style={{ padding: '30px' }}>판매중인 NFT가 없습니다.</div>) : (
        <MarketWrap $gridCss={gridCss}>
          {onsaleNftList &&
            getNewOnsaleNfts(onsaleNftList).map(onsaleNft => (
              <OnsaleNftCard key={`marketplace-collection-${onsaleNft.nftId}`} nft={onsaleNft} gridCss={gridCss} />
            ))
          }
        </MarketWrap>
      )
      }
      <div id="observer-target" style={{ width: '100%', height: '1px', backgroundColor: 'transparent' }}></div>
      {/* {
        isLoading && <Spinner _custom={{
          color: '#3498db',
          size: '20px',
          height: '100px'
        }} />
      } */}
    </Container>
  )
}

export default Collection;

const Container = styled.div``;

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$gridCss.gridTemplateColumns};
  gap: ${props => props.$gridCss.gap};
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;


// 무한스크롤 구현
// const [isLoading, setIsLoading] = useState(false);
// const observerRef = useRef(null);

// const infiniteScrollHandler = async () => {
//   setIsLoading(true);

//   offsetRef.current = offsetRef.current + 1;
//   const pageOffset = gridCss.grid === 8 ? offsetRef.current * 4 : offsetRef.current;
//   const pageLimit = gridCss.grid === 8 ? 4 : 1;

//   const url = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

//   try {
//     await fetchNftList(url);
//   } finally {
//     setIsLoading(false);
//   }

// }
// // gridCss.grid === 8 ?
// // (allNftCount.current * 4) - 4 > offsetRef.current * 4 :
// useEffect(() => {
//   const observer = new IntersectionObserver((entryies) => {
//     if (entryies[0].isIntersecting && !isLoading && allNftCount.current - 1 > offsetRef.current
//     ) {
//       infiniteScrollHandler();
//     }
//   }, { threshold: 1 });

//   observerRef.current = observer;
//   observer.observe(document.querySelector('#observer-target'));

//   return () => observer.disconnect();
// }, [isLoading]);

// useEffect(() => {
//   setCount(onsaleNftList.length);
// }, [onsaleNftList]);

// useEffect(() => {
//   const fetchData = async () => {
//     const pageOffset = gridCss.grid === 8 ? offsetRef.current * 4 : offsetRef.current;
//     const pageLimit = gridCss.grid === 8 ? 4 : 1;

//     const url = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
//     const queryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;
//     const categoryUrl = `https://api.pinata.cloud/data/pinList?pageLimit=${pageLimit}&pinStart=${pinStart}&pageOffset=${pageOffset}&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"true","op":"eq"}}`;

//     const currentUrl = query ? queryUrl : category ? categoryUrl : url;
//     setIsLoadingApi(true);
//     try {
//       await fetchNftList(currentUrl);
//     } finally {
//       setIsLoadingApi(false);
//     }

//   };

//   fetchData();
// }, [search]);