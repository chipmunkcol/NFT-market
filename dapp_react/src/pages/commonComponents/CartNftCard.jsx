import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import { P_updateMetadataRemoveCart } from "../../hooks/common";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import useAsyncTask from "../../hooks/useAsyncTask";
import Spinner from "../../components/Spinner";

const CartNftCard = ({ nft, propsFunction }) => {
  const { account } = useContext(GlobalContext);
  const { nftId, nftName, nftPrice, owner } = nft;
  const tokenUrl = nft?.isCollection === 'true' ? `${nft.tokenUrl}/${nft.fileName}` : nft.tokenUrl;

  const { removeCheckdNft, addCheckedNft, R_removeCartHandler } = propsFunction;
  const tokenData = useGetTokenData(tokenUrl);
  // const { handleWithLoading } = useAsyncTask();
  const [isLoading, setIsLoading] = useState(false);


  const checkToggleHandler = (e) => {
    if (e.target.checked) {
      addCheckedNft(nft);
    } else {
      removeCheckdNft(nft);
    }
  }


  const removeCartHandler = async (nft) => {
    let cartIpfsHash = localStorage.getItem(`cart-${account}`);
    if (!cartIpfsHash) return;

    setIsLoading(true);
    try {
      const paredCartIpfsHash = JSON.parse(cartIpfsHash);
      const updateMetadataResult = await P_updateMetadataRemoveCart(paredCartIpfsHash, nftId);
      if (updateMetadataResult.ok) {
        R_removeCartHandler(nft);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {
        <Item>
          <SelectBox>
            <input type="checkbox" defaultChecked={true} onClick={checkToggleHandler} />
          </SelectBox>
          <ImgWrap>
            <img src={tokenData.image} alt="nft" />
          </ImgWrap>
          <ContentWrap>
            <div>상품명: {nftName}</div>
            <div>가격: {nftPrice} ETH</div>
          </ContentWrap>
          <div>
            {
              isLoading ? <Spinner _custom={{
                color: '#3498db',
                size: '16px',
                height: '100%'
              }} /> :
                <span onClick={() => removeCartHandler(nft)}>삭제</span>
            }
          </div>
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
  /* button {
    background-color: #e25120;
    border-radius: 8px;
    padding: 0 12px 0 10px;
    height: 30px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
  } */
  span {
    font-size: 11px;
    cursor: pointer;
    &:hover {
      color: #e25120;
      text-decoration: underline;
    }
  }
`;
