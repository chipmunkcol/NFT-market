import styled from "styled-components";
import { toastSwal } from "../../hooks/swal";
import { GlobalContext } from "../../context/GlobalContext";
import { useContext, useState } from "react";
import { GlobalContextType } from "../../../type";
import {
  P_updateMetadataAddCart,
  pinJsonToIPFSForCart,
} from "../../hooks/common";
import { JsonRpcSigner } from "ethers";
import Spinner from "../Spinner";
import iconCart from "../../assets/images/icon-cart-wh.png";

type Nft = {
  nftId: number;
  nftName: string;
  tokenUrl: string;
  nftPrice: number;
  previousPrice: number;
  owner: string;
};

interface CartProps {
  nft: Nft;
}
const Cart = ({ nft }: CartProps) => {
  const { signer, account } = useContext(GlobalContext) as GlobalContextType;
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  // 장바구니에 담기
  const addCartHandler = async (
    nft: Nft,
    signer: JsonRpcSigner | null,
    account: string | null
  ) => {
    if (!signer || !account) {
      toastSwal("메타마스크 지갑을 연결해주세요");
      return;
    }
    setIsLoadingCart(true);

    try {
      let cartIpfsHash = localStorage.getItem(`cart-${account}`);
      if (!cartIpfsHash) {
        cartIpfsHash = await pinJsonToIPFSForCart(account, nft);
        cartIpfsHash &&
          localStorage.setItem(`cart-${account}`, JSON.stringify(cartIpfsHash));
      } else {
        const paredCartIpfsHash = JSON.parse(cartIpfsHash);
        const updateMetadataResult = await P_updateMetadataAddCart(
          paredCartIpfsHash,
          nft
        );

        if (updateMetadataResult?.ok) {
          // pinata update 되는 시간이 꽤나 김...
          setTimeout(() => {
            toastSwal("장바구니에 담겼습니다.");
          }, 3000);
        }
      }
    } finally {
      setIsLoadingCart(false);
    }
  };

  return (
    <CartBtn onClick={() => addCartHandler(nft, signer, account)}>
      <CartImg>
        {isLoadingCart ? (
          <Spinner
            _custom={{
              color: "#3498db",
              size: "16px",
              height: "100%",
            }}
          />
        ) : (
          <img src={iconCart} alt="장바구니" />
        )}
      </CartImg>
    </CartBtn>
  );
};

export default Cart;

const CartBtn = styled.div`
  width: 40px;
  border-radius: 0 0 10px 0;
  height: 30px;
  background-color: rgba(32, 129, 226, 1);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;

const CartImg = styled.div`
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;
