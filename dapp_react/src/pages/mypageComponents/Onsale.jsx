import styled from "styled-components";
import OnsaleNftCard from "../mypageComponents/OnsaleNftCard";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext } from "react";
import * as Styled from "./All";

function Onsale() {
  const { myNfts, account } = useContext(GlobalContext);
  const onsaleMyNfts = myNfts.filter(nft => nft.nftPrice);


  return (
    <Container>
      {myNfts.length > 0 && (
        <Styled.MyNftsWrap>
          {
            onsaleMyNfts.map(nft => (
              <OnsaleNftCard key={`mypage-onsale-${nft.id}-${nft.name}`} nft={nft} account={account} />
            ))
          }
        </Styled.MyNftsWrap>
      )}
      {myNfts.length < 1 && <h2>No NFTs</h2>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;



export default Onsale;