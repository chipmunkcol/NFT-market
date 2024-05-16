import { useContext, useState } from "react";
import styled from "styled-components";
import { S_Button } from "../../styles/styledComponent";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { getTargetNftToIpfsData } from "../../hooks/common";
import CartNftCard from "./CartNftCard";

function Cart({ cartModalClose }) {
  const { account } = useContext(GlobalContext);
  const cartIpfsHash = localStorage.getItem(`cart-${account}`);
  const [nftsInCart, setNftsInCart] = useState([]);
  const onclick = e => {
    e.stopPropagation();
  }

  useEffect(() => {
    const getCartData = async () => {
      if (!cartIpfsHash) return;
      const parsedCartIpfsHash = JSON.parse(cartIpfsHash);
      const res = await getTargetNftToIpfsData(parsedCartIpfsHash);
      const cartList = JSON.parse(res.metadata.keyvalues.cart);
      setNftsInCart(cartList);
    }
    getCartData();
  }, [account]);

  // cart price
  const cartPrice = nftsInCart?.reduce((acc, cur) => {
    if (cur.checked) {
      return acc + cur.price;
    }
    return acc;
  }, 0) || 0;

  return (
    <Overlay onClick={cartModalClose}>
      <Container onClick={onclick}>
        <div style={{ width: '100%', padding: '1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #cccccc' }}>
          <h2>Your cart</h2>
          <h4>Price : {cartPrice} ETH</h4>
          <CloseBtnWrap onClick={cartModalClose}>
            <button>x</button>
          </CloseBtnWrap>
        </div>
        <ItemBox>
          {nftsInCart.length > 0 ? (
            <ItemWrap>
              {nftsInCart.map((nft) => {
                return (
                  <CartNftCard key={`cart-${nft.id}`} nft={nft} />
                )
              })}
            </ItemWrap>
          ) : <div style={{ textAlign: 'center' }}>장바구니가 비어있습니다.</div>
          }
        </ItemBox>
        <CartBottom>
          <BtnWrap>
            <button>구매하기</button>
          </BtnWrap>
        </CartBottom>
      </Container>
    </Overlay>
  )
}

const CartBottom = styled.div`
  width: 100%;
  height: 45px;
  background-color: rgba(32, 129, 226, 1);
  
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const BtnWrap = styled.div`
  button {
    color: #ffffff;
    font-weight: 700;
  }
`;

const CloseBtnWrap = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  &:hover {
    background-color: #cccccc;
  }
  cursor: pointer;
`;

const ItemWrap = styled.ul`
  display: flex;
  /* align-items: center; */
  gap: 1rem;
  flex-direction: column;
`;

const ItemBox = styled.div`
  width: 100%;
  padding: 1.3rem 1.3rem 1.3rem 1rem;
  height: calc(100% - 105px);
  overflow: auto;
  /* display: flex; */
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
      width: 360px;
    height: 380px;
    z-index: 150;
    /* position: absolute; */
    position: relative;
    top: 45%;
    left: 84%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: white;
    justify-content: center;
    overflow: hidden;
`;

export default Cart;