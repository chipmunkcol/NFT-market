import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { MintContract } from "../../../contracts";
import NonSaleNftCard from "../../components/NonSaleNftCard";
import styled from "styled-components";
import OnsaleNftCard from "../../components/OnsaleNftCard";
import { useOutletContext } from "react-router-dom";

// nftId, nftName, tokenUrl, nftPrice 
const All = () => {
  const [myNfts, account] = useOutletContext();
  const onsaleMyNfts = myNfts.filter(nft => nft.nftPrice);
  const nonsaleMyNfts = myNfts.filter(nft => !nft.nftPrice);


  return (
    <Container>
      {myNfts.length > 0 && (
        <MyNftsWrap>
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(nft => ( */}
          {/* {myNfts.map(nft => (
            !nft.isOnsale ?
              <NonSaleNftCard key={nft.id} nft={nft} account={account} /> :
              <OnsaleNftCard key={nft.id} nft={nft} account={account} />
          ))} */}
          {
            onsaleMyNfts.map(nft => (
              <OnsaleNftCard key={`${nft.id}-${nft.name}`} nft={nft} account={account} />
            ))
          }
          {
            nonsaleMyNfts.map(nft => (
              <NonSaleNftCard key={`${nft.id}-${nft.name}`} nft={nft} account={account} />
            ))
          }
        </MyNftsWrap>
      )}
      {myNfts.length < 1 && <h2>No NFTs</h2>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const MyNftsWrap = styled.ul`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
  padding: 1rem 0;
`;

export default All;