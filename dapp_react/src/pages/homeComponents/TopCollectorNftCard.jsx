import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";

const TopCollectorNftCard = ({ nft }) => {

  const navigate = useNavigate();
  const tokenUrl = nft?.isCollection === 'true' ? `${nft.tokenUrl}/${nft.fileName}` : nft.tokenUrl;
  // const tokenUrl = `${nft.tokenUrl}/${nft.fileName}`;
  const tokenData = useGetTokenData(tokenUrl);
  const { nftPrice, nftId } = nft;

  const soldPrice = nft.soldPrice;


  const navigateDetailPage = () => {
    if (nft?.isCollection === 'true') {
      navigate(`/nft-detail/collection/${nft.tokenUrl}/${nftId}`);
    } else {
      navigate(`/nft-detail/${nft.tokenUrl}/${nftId}`);
    }
  }

  return (
    <>
      <TopItemBox key={`top3-${nftId}`}>
        <TopImgWrap onClick={navigateDetailPage}>
          <img src={tokenData?.image} />
        </TopImgWrap>
        <TopContent>
          {/* <h3>{item} name</h3> */}
          <p>{soldPrice ? soldPrice : nftPrice} ETH</p>
        </TopContent>
      </TopItemBox>
    </>
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
  cursor: pointer;
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