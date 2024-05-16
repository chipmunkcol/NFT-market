import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";

const CartNftCard = ({ nft }) => {
  const { nftId, nftName, tokenUrl, nftPrice, owner } = nft;
  const tokenData = useGetTokenData(tokenUrl);

  const checkToggleHandler = (nft) => {
  }

  return (
    <>
      {
        <Item>
          <SelectBox onClick={() => checkToggleHandler(nft)}>
            <input type="checkbox" checked={nft.checked} />
          </SelectBox>
          <ImgWrap>
            <img src={tokenData.image} alt="nft" />
          </ImgWrap>
          <ContentWrap>
            <div>상품명: {nftName}</div>
            <div>가격: {nftPrice}</div>
          </ContentWrap>
          <button onClick={() => removeCartHandler(nft)}>삭제</button>
        </Item>
      }
    </>
  )
}

export default CartNftCard;


const SelectBox = styled.div`
  width: 17px;
  height: 17px;
  input {
    width: 100%;
    height: 100%;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 150px;
  font-size: 0.8rem;
`;

const ImgWrap = styled.div`
width: 50px;
    height: 50px;
    img {
      width: 100%;
    height: 100%;
    border-radius: 10px;
    }
`;

const Item = styled.li`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 20px;
  /* padding: 0px 30px 0 10px; */
  button {
    background-color: #e25120;
    border-radius: 8px;
    padding: 0 12px 0 10px;
    height: 30px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
  }
`;
