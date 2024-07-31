import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import { GlobalContextType, NftMetadataByJson } from "../../../type";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import {
  getResizeImageKeyOfAwsS3,
  getResizeImageUrl,
  removeExtenstion,
} from "../../hooks/common";

interface Top10NftCardProps {
  nft: NftMetadataByJson;
  index: number;
}
const Top10NftCard = ({ nft, index }: Top10NftCardProps) => {
  const { s3Obects } = useContext(GlobalContext) as GlobalContextType;
  const { nftId, tokenUrl } = nft;
  const { name, image } = useGetTokenData(tokenUrl);
  const { nftPrice } = nft;
  const navigate = useNavigate();
  const [resizeImageUrl, setResizeImageUrl] = useState("");

  const navigateDetailPage = () => {
    navigate(`/nft-detail/${tokenUrl}/${nftId}`);
  };

  useEffect(() => {
    if (!image) return;
    const resizeImagekey = getResizeImageKeyOfAwsS3(image);
    const targetKey = s3Obects.filter((s3Object) => {
      if (s3Object.Key) {
        let keyWithoutExtension = removeExtenstion(s3Object.Key);
        return keyWithoutExtension === resizeImagekey;
      }
    });
    if (targetKey[0]?.Key) {
      const _resizeImageUrl = getResizeImageUrl(targetKey[0].Key);
      setResizeImageUrl(_resizeImageUrl);
    }
  }, [image]);

  return (
    <>
      {
        <Item key={`top10Nft-${index}`}>
          <ItemContent>
            <ItemRank>{index + 1}</ItemRank>
            <ItemInfo>
              <ItemName>{name}</ItemName>
              <ItemPrice>{nftPrice} ETH ~</ItemPrice>
            </ItemInfo>
          </ItemContent>
          <ItemImg onClick={navigateDetailPage}>
            <img
              src={`${resizeImageUrl}?w=100`}
              onError={(e) => (e.currentTarget.src = image)}
              alt="test"
            />
          </ItemImg>
        </Item>
      }
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
