import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";

const TopCollectorNftCard = ({ nft }) => {
  if (!nft) return null;
  const { name, image } = useGetTokenData(nft.tokenUrl);
  const { nftPrice, nftId } = nft;

  const soldPrice = nft.soldPrice;
  return (
    <>{
      <TopItemBox key={`top3-${nftId}`}>
        <TopImgWrap>
          <img src={image} />
        </TopImgWrap>
        <TopContent>
          {/* <h3>{item} name</h3> */}
          <p>{soldPrice ? soldPrice : nftPrice} ETH</p>
        </TopContent>
      </TopItemBox>
    }</>
  )
}

export default TopCollectorNftCard;


const TopItemBox = styled.li`
  width: 184px;
`;
const TopImgWrap = styled.div`
  width: 100%;
  height: 184px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

`;
const TopContent = styled.div`
  ${props => props.theme.variables.flexColumn};
  padding-top: 1rem;
  gap: 0.5rem;
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #6c707b;
  }
`;