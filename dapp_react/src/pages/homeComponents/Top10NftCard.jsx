import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";

const Top10NftCard = ({ nft, index }) => {
  const { name, image } = useGetTokenData(nft.tokenUrl);
  const { nftPrice } = nft;

  return (
    <>{
      <Item key={`top10Nft-${index}`}>
        <ItemContent>
          <ItemRank>{index + 1}</ItemRank>
          <ItemInfo>
            <ItemName>{name}</ItemName>
            <ItemPrice>{nftPrice} ETH ~</ItemPrice>
          </ItemInfo>
        </ItemContent>
        <ItemImg>
          <img src={image} alt="test" />
        </ItemImg>
      </Item>
    }</>
  )
}

export default Top10NftCard;


const Item = styled.li`
  ${props => props.theme.variables.flexBetween};
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