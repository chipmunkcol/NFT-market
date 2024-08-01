import styled from "styled-components";
import useGetTokenData from "../../hooks/useGetTokenData";
import {
  getImageUrl,
  getResizeImageUrl,
  P_updateMetadataRemoveCart,
} from "../../hooks/common";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import useAsyncTask from "../../hooks/useAsyncTask";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import loadingImg from "../../assets/images/달팽이로딩.png";
import {
  CollectionNftByJson,
  GlobalContextType,
  NewOnsaleNft,
} from "../../../type";

interface CartNftCardProps {
  // nft: NewOnsaleNft | CollectionNftByJson;
  nft: any;
  propsFunction: {
    removeCheckdNft: (nft: any) => void;
    addCheckedNft: (nft: any) => void;
    R_removeCartHandler: (nft: any) => void;
  };
}
const CartNftCard = ({ nft, propsFunction }: CartNftCardProps) => {
  const { account } = useContext(GlobalContext) as GlobalContextType;
  const { nftId, nftName, nftPrice, isCollection, ext } = nft;
  const tokenUrl = nft?.isReveal
    ? `${nft.tokenUrl}/${nft.fileName}`
    : nft.tokenUrl;

  const { removeCheckdNft, addCheckedNft, R_removeCartHandler } = propsFunction;
  const tokenData = useGetTokenData(tokenUrl);
  const { image } = tokenData;
  // const { handleWithLoading } = useAsyncTask();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const navigateDetailPage = () => {
    if (isCollection === "true") {
      navigate(`/nft-detail/collection/${nft.tokenUrl}/${nftId}`);
    } else {
      navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    }
  };

  const checkToggleHandler = (e: any) => {
    if (e.target.checked) {
      addCheckedNft(nft);
    } else {
      removeCheckdNft(nft);
    }
  };

  const removeCartHandler = async (nft: any) => {
    let cartIpfsHash = localStorage.getItem(`cart-${account}`);
    if (!cartIpfsHash) return;

    setIsLoading(true);
    try {
      const paredCartIpfsHash = JSON.parse(cartIpfsHash);
      const updateMetadataResult = await P_updateMetadataRemoveCart(
        paredCartIpfsHash,
        nftId
      );
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
            <input
              type="checkbox"
              defaultChecked={true}
              onClick={checkToggleHandler}
            />
          </SelectBox>
          <ImgWrap onClick={navigateDetailPage}>
            {/* <img src={tokenData.image} alt="nft" /> */}
            {image ? (
              <img
                src={`${getResizeImageUrl(image, ext)}?w=50&h=50`}
                onError={(e) => (e.currentTarget.src = getImageUrl(image))}
              />
            ) : (
              <img src={loadingImg} />
            )}
          </ImgWrap>
          <ContentWrap>
            <div>상품명: {nftName}</div>
            <div>가격: {nftPrice} ETH</div>
          </ContentWrap>
          <div>
            {isLoading ? (
              <Spinner
                _custom={{
                  color: "#3498db",
                  size: "16px",
                  height: "100%",
                }}
              />
            ) : (
              <span onClick={() => removeCartHandler(nft)}>삭제</span>
            )}
          </div>
        </Item>
      }
    </>
  );
};

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
  cursor: pointer;
`;

const Item = styled.li`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  gap: 20px;
  span {
    font-size: 11px;
    cursor: pointer;
    &:hover {
      color: #e25120;
      text-decoration: underline;
    }
  }
`;
