import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import { nftMetadataAddSoldPrice } from "../../../type";
import { getImageUrl, getResizeImageUrl } from "../../hooks/common";
import loadingImg from "../../assets/images/달팽이로딩.png";
import LazyLoadFlipedComponet from "../../hooks/LazyLoadFlipedComponet";

interface ExpensiveNftCardProps {
  nft: nftMetadataAddSoldPrice;
}
const ExpensiveNftCard = ({ nft }: ExpensiveNftCardProps) => {
  const navigate = useNavigate();
  const { nftPrice, nftId, tokenUrl, ext } = nft;
  const tokenData = useGetTokenData(tokenUrl);
  const { image } = tokenData;

  const soldPrice = nft.soldPrice;

  const navigateDetailPage = () => {
    if (nft?.isCollection === "true") {
      navigate(`/nft-detail/collection/${nft.tokenUrl}/${nftId}`);
    } else {
      navigate(`/nft-detail/${nft.tokenUrl}/${nftId}`);
    }
  };

  return (
    <>
      <TopItemBox key={`top3-${nftId}`}>
        <TopImgWrap onClick={navigateDetailPage}>
          <LazyLoadFlipedComponet css={{ color: "#F6F9F0" }}>
            <img
              src={`${getResizeImageUrl(image, ext)}?w=200&h=200`}
              onError={(e) => (e.currentTarget.src = getImageUrl(image))}
            />
          </LazyLoadFlipedComponet>
          {/* {image ? (
            <img
              src={`${getResizeImageUrl(image, ext)}?w=200&h=200`}
              onError={(e) => (e.currentTarget.src = getImageUrl(image))}
            />
          ) : (
            <img src={loadingImg} />
          )} */}
        </TopImgWrap>
        <TopContent>
          {/* <h3>{item} name</h3> */}
          Last sold price
          <p>{soldPrice ? soldPrice : nftPrice} ETH</p>
        </TopContent>
      </TopItemBox>
    </>
  );
};

export default ExpensiveNftCard;

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
  ${(props) => props.theme.variables.flexColumn};
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
