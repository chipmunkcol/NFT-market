import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import { NftMetadataByJson } from "../../../type";
import useGetResizeImageUrl from "../../hooks/useGetResizeImageUrl";
import loadingImg from "../../assets/images/달팽이로딩.png";

interface Top10NftCardProps {
  nft: NftMetadataByJson;
  index: number;
}
const Top10NftCard = ({ nft, index }: Top10NftCardProps) => {
  const { nftId, tokenUrl, nftPrice } = nft;
  const { name, image } = useGetTokenData(tokenUrl);
  const resizeImageUrl = useGetResizeImageUrl(image);
  const navigate = useNavigate();

  const navigateDetailPage = () => {
    navigate(`/nft-detail/${tokenUrl}/${nftId}`);
  };

  return (
    <>
      <Item key={`top10Nft-${index}`}>
        <ItemContent>
          <ItemRank>{index + 1}</ItemRank>
          <ItemInfo>
            <ItemName>{name}</ItemName>
            <ItemPrice>{nftPrice} ETH ~</ItemPrice>
          </ItemInfo>
        </ItemContent>
        <ItemImg onClick={navigateDetailPage}>
          {resizeImageUrl ? (
            <img
              src={`${resizeImageUrl}?w=50`}
              onError={(e) => (e.currentTarget.src = image)}
              alt="top10-nft-card"
            />
          ) : (
            <img src={loadingImg} alt="loading..." />
          )}
        </ItemImg>
      </Item>
    </>
  );
};

export default Top10NftCard;

const Item = styled.li`
  ${(props) => props.theme.variables.flexBetween};
  padding: 8px 10px;
  border-radius: 5px;
  background-color: #2c2d31;
`;
const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const ItemRank = styled.div``;
const ItemImg = styled.div`
  width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
  cursor: pointer;
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 3px;
`;
const ItemName = styled.div``;
const ItemPrice = styled.div`
  font-size: 12px;
  color: #ffffff4d;
`;
