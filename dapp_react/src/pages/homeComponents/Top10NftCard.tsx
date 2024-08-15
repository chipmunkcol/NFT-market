import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import { NftMetadataByJson } from "../../../type";
import loadingImg from "../../assets/images/달팽이로딩.png";
import {
  copyHandler,
  getImageUrl,
  getResizeImageUrl,
} from "../../hooks/common";
import LazyLoadFlipedComponet from "../../hooks/LazyLoadFlipedComponet";

interface Top10NftCardProps {
  nft: NftMetadataByJson;
  index: number;
}
const Top10NftCard = ({ nft, index }: Top10NftCardProps) => {
  const { nftId, tokenUrl, nftPrice, ext } = nft;
  const { name, image } = useGetTokenData(tokenUrl);
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
            <ItemName onClick={() => copyHandler(name)}>{name}</ItemName>
            <ItemPrice>{nftPrice} ETH ~</ItemPrice>
          </ItemInfo>
        </ItemContent>
        <ItemImg onClick={navigateDetailPage}>
          <LazyLoadFlipedComponet css={{ color: "#6c707b33" }}>
            <img
              src={`${getResizeImageUrl(image, ext)}?w=50`}
              // src={getImageUrl(image)}
              onError={(e) => (e.currentTarget.src = getImageUrl(image))}
              alt="top10-nft-card"
              width={40}
              height={40}
              style={{ height: "40px" }}
            />
          </LazyLoadFlipedComponet>
        </ItemImg>
      </Item>
    </>
  );
};

export default Top10NftCard;

export const Item = styled.li`
  ${(props) => props.theme.variables.flexBetween};
  padding: 8px 10px;
  border-radius: 5px;
  background-color: #2c2d31;
`;
export const ItemContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
export const ItemRank = styled.div``;
export const ItemImg = styled.div`
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
export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 3px;
`;
export const ItemName = styled.div``;
export const ItemPrice = styled.div`
  font-size: 12px;
  color: #ffffff4d;
`;
