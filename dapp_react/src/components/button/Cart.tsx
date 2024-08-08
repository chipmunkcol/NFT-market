import styled from "styled-components";
import IconCart from "../../assets/images/icon-cart-wh.png";
import { NftMetadata, NewOnsaleNft } from "../../../type";
import { addCartHandler, validateAccountAndOnsale } from "../../hooks/common";
import { toastSwal } from "../../hooks/swal";
import useAsyncTask from "../../hooks/useAsyncTask";

type Css = {
  btnWidth: string;
  imgWidth: string;
};

interface CartProps {
  css: Css;
  metadata: NftMetadata | NewOnsaleNft;
  account: string;
}

const Cart = ({ css, metadata, account }: CartProps) => {
  const { handleWithLoading } = useAsyncTask();
  const addCartController = async () => {
    const validateResult = validateAccountAndOnsale(metadata, account);
    if (!validateResult) return;

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
  border-radius: 0 10px 10px 0;
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
