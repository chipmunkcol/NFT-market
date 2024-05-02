/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from './NftCard'
// import NonSaleNftCard from "./NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { MintContract, web3 } from "../../contracts/index";
import { S_Button } from "../styles/styledComponent";
// interface props {
//   nft: {
//     nftId: number;
//     nftHash: number;
//     nftPrice: string;
//   }
// }


// const OnsaleNftCard: FC<props> = ({ nft }) => {
const OnsaleNftCard = ({ nft, account, cardWidth }) => {
  const { id, name, description, image, price, owner } = nft;
  const { setTrigger } = useContext(GlobalContext);
  const [isMyNft, setIsMyNft] = useState(false);

  // function checkMyNft(nftId) {
  //   const res = myNfts.some((myNft) => myNft.nftId === nftId);
  //   setIsMyNft(res);
  // }

  // useEffect(() => {
  //   checkMyNft(id);
  // }, [myNfts]);
  useEffect(() => {
    setIsMyNft(account === owner?.toLowerCase());
  }, [account]);

  async function purchaseNftHandler(nftId) {
    try {
      const weiPrice = web3.utils.toWei(price, 'ether');
      const res = await MintContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        alert('NFT 구매에 성공했습니다.');
      }
      setTrigger(prev => !prev);

    } catch (err) {
      console.log('err: ', err);
    }
  }

  const imgUrl = `${import.meta.env.VITE_GATEWAY_URL
    }/ipfs/${image}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_TOKEN}`;

  // 장바구니에 담기
  const addCartHandler = nft => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const customNft = { ...nft, checked: true };
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([customNft]));
    } else {
      cart.push(customNft);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  return (
    <Styled.Container>
      {/* <NonSaleNftCard nftHash={nftHash} /> */}
      <ImgWrap $cardWidth={cardWidth} >
        <Styled.Img src={imgUrl} alt="NFT image" />
      </ImgWrap>
      <Styled.Name>{name}</Styled.Name>
      <OnsalePriceWrap>
        가격 : {price} ETH ($
        {(Number(price) * 2928)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        )
      </OnsalePriceWrap>
      {
        !isMyNft && <ButtonWrap>
          <S_Button onClick={() => purchaseNftHandler(id)}>구매하기</S_Button>
          <S_Button onClick={() => addCartHandler(nft)}>💛</S_Button>
        </ButtonWrap>
      }
    </Styled.Container>
  );
};

const ImgWrap = styled.div`
  width: ${props => props.$cardWidth};
  height: ${props => props.$cardWidth};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 10px;
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default OnsaleNftCard;
