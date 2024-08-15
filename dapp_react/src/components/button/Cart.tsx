import styled from "styled-components";
import IconCart from "../../assets/images/icon-cart-wh.png";
import { NftMetadata, NewOnsaleNft, CollectionNft } from "../../../type";
import { addCartHandler, validateAccountAndOnsale } from "../../hooks/common";
import { toastSwal } from "../../hooks/swal";
import useAsyncTask from "../../hooks/useAsyncTask";

type Css = {
  btnWidth: string;
  imgWidth: string;
  borderRadius: string;
};

interface CartProps {
  css: Css;
  metadata: NftMetadata | NewOnsaleNft | CollectionNft;
  account: string | null;
}

const Cart = ({ css, metadata, account }: CartProps) => {
  const { handleWithLoading } = useAsyncTask();
  const { nftPrice, owner } = metadata;

  const addCartController = async () => {
    const validateResult = validateAccountAndOnsale(nftPrice, owner, account);
    if (!validateResult) return;
    if (!account) return;
    const result = await handleWithLoading(
      () => addCartHandler(metadata, account),
      "장바구니에 추가중입니다"
    );
    if (result === "already exist") {
      toastSwal("이미 장바구니에 담긴 상품입니다.");
    } else if (result) {
      toastSwal("장바구니에 추가되었습니다.");
    } else {
      toastSwal("장바구니 추가에 실패했습니다.");
    }
  };

  return (
    <Container $css={css} onClick={addCartController}>
      <CartImg $css={css}>
        <img src={IconCart} alt="cart" />
      </CartImg>
    </Container>
  );
};

const Container = styled.div<{ $css: Css }>`
  width: ${({ $css }) => $css.btnWidth};
  height: 100%;
  border-radius: ${({ $css }) => $css.borderRadius};
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

const CartImg = styled.div<{ $css: Css }>`
  width: ${({ $css }) => $css.imgWidth};
  height: ${({ $css }) => $css.imgWidth};

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Cart;
