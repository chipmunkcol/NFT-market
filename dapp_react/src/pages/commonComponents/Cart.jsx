import { useState } from "react";
import styled from "styled-components";
import { S_Button } from "../../styles/styledComponent";
import { useEffect } from "react";
import { json } from "react-router-dom";

function Cart({ cartModalClose }) {

  const [nftsInCart, setNftsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const onclick = e => {
    e.stopPropagation();
  }

  // const tempArray = [1, 2, 3, 4, 5, 6, 7];
  // const tempArray = [];
  const removeCartHandler = async (nft) => {
    const cart = await JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(item => item.id !== nft.id);
    const jsonNewCart = JSON.stringify(newCart);
    localStorage.setItem('cart', jsonNewCart);
    setNftsInCart(newCart);
  }

  const imgUrl = (image) => {
    return `${import.meta.env.VITE_GATEWAY_URL
      }/ipfs/${image}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_TOKEN}`
  };

  // cart price
  const cartPrice = nftsInCart?.reduce((acc, cur) => {
    if (cur.checked) {
      return acc + cur.price;
    }
    return acc;
  }, 0) || 0;

  const checkToggleHandler = (nft) => {
    const newCart = nftsInCart.map(item => {
      if (item.id === nft.id) {
        return { ...item, checked: !item.checked }
      }
      return item;
    });
    setNftsInCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  }

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
                  <Item key={nft}>
                    <SelectBox onClick={() => checkToggleHandler(nft)}>
                      <input type="checkbox" checked={nft.checked} />
                    </SelectBox>
                    <ImgWrap>
                      <img src={imgUrl(nft?.image)} alt="nft" />
                    </ImgWrap>
                    <ContentWrap>
                      <div>상품명: {nft?.name}</div>
                      <div>가격: {nft?.price}</div>
                    </ContentWrap>
                    <button onClick={() => removeCartHandler(nft)}>삭제</button>
                  </Item>
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