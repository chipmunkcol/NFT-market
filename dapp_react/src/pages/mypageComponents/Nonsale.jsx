import styled from "styled-components";
import NonSaleNftCard from "../../components/NonSaleNftCard";
import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import * as Styled from "./All";

function Nonsale() {
  const { myNfts, account } = useContext(GlobalContext);
  const nonsaleMyNfts = myNfts.filter(nft => !nft.nftPrice);

  return (
    <Container>
      {myNfts.length > 0 && (
        <Styled.MyNftsWrap>
          {
            nonsaleMyNfts.map(nft => (
              <NonSaleNftCard key={`mypage-nonsale-${nft.id}-${nft.name}`} nft={nft} account={account} />
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



export default Nonsale;