import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useContext, useEffect, useRef, useState } from "react";
import { SaleNftContract } from "../../../contracts";
import { GlobalContext } from "../../context/GlobalContext";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListToIpfs, ipfsGetOptions } from "../../hooks/common";

const Nft = () => {
  const { onsaleNftList, setOnsaleNftList, getAllonsaleNftListRef, account, onsaleTrigger, purchaseTrigger } = useContext(GlobalContext);
  const [grid, cardWidth] = useOutletContext();
  const allNftCount = useRef(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  console.log('query: ', query);
  const [offset, setOffset] = useState(0);

  const [onsaleNftsInContract, setOnsaleNftsInContract] = useState([]);

  const encodedOffset = encodeURIComponent(
    offset
  );

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  useEffect(() => {
    setOffset(0);
  }, [query]);


  useEffect(() => {
    async function fetchOnsaleNftIdsInContract() {
      const _onsaleNftIdsInContract = await SaleNftContract.methods.getOnsaleNfts().call();
      setOnsaleNftsInContract(_onsaleNftIdsInContract);
    }
    fetchOnsaleNftIdsInContract();
  }, [onsaleTrigger]);

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

  const checkContractNftsToIpfsNfts = (onsaleNftsInContract, onsaleNftsInIpfs) => {
    const commonNfts = onsaleNftsInIpfs.filter(ipfsNft => onsaleNftsInContract.some(contractNft => (parseInt(contractNft.nftId) === ipfsNft.nftId && contractNft.tokenUrl === ipfsNft.tokenUrl)));
    return commonNfts
  }

  const getIpfsNftList = async (url) => {
    const ipfsDatas = await getNftListToIpfs(url);
    // allNftCount.current = response.count;
    const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
    const commonNfts = checkContractNftsToIpfsNfts(onsaleNftsInContract, newOnsaleNfts)
    setOnsaleNftList(commonNfts);
    console.log('newOnsaleNfts: ', newOnsaleNfts);
  }

  function getOnsaleNftList() {
    if (query) {
      // fetch(`https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"}}`, options)
      getIpfsNftList(`https://api.pinata.cloud/data/pinList?pinStart=20240515&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`);
    } else {
      // fetch(`https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`, options)
      getIpfsNftList(`https://api.pinata.cloud/data/pinList?pinStart=20240515&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`);
    }
  }

  useEffect(() => {
    // if (allNftCount.current !== 0 && allNftCount.current - 10 <= offset * 10) return;
    // if (onsaleNftList.length - 10 <= offset * 10) return;
    // if (onsaleNftsInContract.length < 1) return;

    getOnsaleNftList();
  }, [onsaleNftsInContract, query, offset, onsaleTrigger, purchaseTrigger]);

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const infiniteScrollHandler = () => {
    setIsLoading(true);
    setOffset(prev => prev + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading && getAllonsaleNftListRef.current?.length > 0) {
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