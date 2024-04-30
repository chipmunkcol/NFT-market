import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import OnsaleNftCard from "../../components/OnsaleNftCard";

function Onsale() {
  const [myNfts, onsaleMyNfts, account] = useOutletContext();

  return (
    <Container>
      {myNfts.length > 0 && (
        <MyNftsWrap>
          {
            onsaleMyNfts.map(nft => (
              <OnsaleNftCard key={nft.id} nft={nft} account={account} />
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


export default Onsale;