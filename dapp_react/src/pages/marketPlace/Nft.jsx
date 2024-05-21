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
  const removedNftListByPurchase = (nftId) => {
    newNftListRef.current = onsaleNftList.filter(nft => nft.nftId !== nftId);
  }
  
  const [isLoading, setIsLoading] = useState(false);


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
  