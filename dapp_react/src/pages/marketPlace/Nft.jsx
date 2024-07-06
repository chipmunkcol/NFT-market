import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useLocation, useOutletContext, useSearchParams } from "react-router-dom";
import { getNftListAndCountToIpfs, isArraysEqual } from "../../hooks/common";
import Spinner from "../../components/Spinner";
import { pinStart } from "../../hooks/variables.";
import { useQuery } from "@tanstack/react-query";
// import {tempNftArray} from "../../../../testJson/nftArray";

const Nft = () => {
  const { account, } = useContext(GlobalContext);
  const [gridCss, setCount] = useOutletContext();
  // const [isLoadingApi, setIsLoadingApi] = useState(false);
  // const [onsaleNftList, setOnsaleNftList] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const encodedSearchQuery = encodeURIComponent(
    query
  );

  const encodedCategory = encodeURIComponent(
    `%${category}%`
  );

  const getPreviousPrice = priceHistory => {
    if (!priceHistory) return;
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
    setCount(count);
    return ipfsDatas;
  }

  const { data: onsaleNftList, isPending, isSuccess } = useQuery({
    queryKey: ['marketplace_nft', search],
    queryFn: () => {
      const url = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
      const queryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
      const categoryUrl = `https://api.pinata.cloud/data/pinList?pinStart=${pinStart}&pageLimit=1000&metadata[keyvalues]={"tags":{"value":"${encodedCategory}","op":"like"},"isOnsale":{"value":"true","op":"eq"},"isCollection":{"value":"false","op":"eq"}}`;
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
      { isPending && <Spinner _custom={{ color: '#3498db', size: '30px', height: '100px' }} /> }
      { isSuccess && onsaleNftList &&
        getNewOnsaleNfts(onsaleNftList)?.length < 1 ? (<div style={{ padding:'30px' }}>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap $gridCss={gridCss}>
            {onsaleNftList &&
              getNewOnsaleNfts(onsaleNftList).map(onsaleNft => (
                <OnsaleNftCard key={`marketplace-nft-${onsaleNft.nftId}-${onsaleNft.tokenUrl}`} nft={onsaleNft} account={account} gridCss={gridCss} />
              ))
            }
          </MarketWrap>
        )
      }
      {/* <div id="observer-target" style={{ width: '100%', height: '1px', backgroundColor: 'transparent' }}></div>
      {
        isLoading && <Spinner _custom={{
          color: '#3498db',
          size: '20px',
          height: '100px'
        }} />
      } */}
    </Container>
  )
}

export default Nft;

const Container = styled.div``;


const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$gridCss.gridTemplateColumns};
  gap: ${props => props.$gridCss.gap};
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
  