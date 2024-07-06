import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import NonSaleNftCard from "../../components/NonSaleNftCard";
import styled from "styled-components";
import OnsaleNftCard from "../mypageComponents/OnsaleNftCard";

// nftId, nftName, tokenUrl, nftPrice 
const All = () => {
  // const [myNfts, account] = useOutletContext();
  const { myNfts, account } = useContext(GlobalContext);
  const onsaleMyNfts = myNfts.filter(nft => nft.nftPrice);
  const nonsaleMyNfts = myNfts.filter(nft => !nft.nftPrice);


  return (
    <Container>
      {myNfts.length > 0 && (
        <MyNftsWrap>
          {
            onsaleMyNfts.map(nft => (
              <OnsaleNftCard key={`mypage-all-onsale-${nft.nftId}-${nft.nftName}`} nft={nft} account={account} />
            ))
          }
          {
            nonsaleMyNfts.map(nft => (
              <NonSaleNftCard key={`mypage-all-nonsale-${nft.nftId}-${nft.nftName}`} nft={nft} account={account} />
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

export const MyNftsWrap = styled.ul`
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 20px;
  padding: 1rem 1rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    padding: 1rem 0rem;
  }
  
  @media (max-width: 380px) {
    grid-template-columns: repeat(1, 1fr);
    padding: 1rem 1rem;
  }
`;

export default All;