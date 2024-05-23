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
              <OnsaleNftCard key={`mypage-all-onsale-${nft.id}-${nft.name}`} nft={nft} account={account} />
            ))
          }
          {
            nonsaleMyNfts.map(nft => (
              <NonSaleNftCard key={`mypage-all-nonsale-${nft.id}-${nft.name}`} nft={nft} account={account} />
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