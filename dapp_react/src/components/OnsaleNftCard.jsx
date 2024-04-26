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
const OnsaleNftCard = ({ nft, address }) => {
  const { id, name, description, image, price, owner } = nft;
  const { myNfts, account, setPurchaseTrigger } = useContext(GlobalContext);
  const [isMyNft, setIsMyNft] = useState(false);

  // function checkMyNft(nftId) {
  //   const res = myNfts.some((myNft) => myNft.nftId === nftId);
  //   setIsMyNft(res);
  // }

  // useEffect(() => {
  //   checkMyNft(id);
  // }, [myNfts]);

  async function purchaseNftHandler(nftId) {
    try {
      const weiPrice = web3.utils.toWei(price, 'ether');
      const res = await MintContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        alert('NFT 구매에 성공했습니다.');
      }
      setPurchaseTrigger(prev => !prev);

    } catch (err) {
      console.log('err: ', err);
    }
  }

  const imgUrl = `${import.meta.env.VITE_GATEWAY_URL
    }/ipfs/${image}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_TOKEN}`;


  return (
    <Styled.Container>
      {/* <NonSaleNftCard nftHash={nftHash} /> */}
      <Styled.ImgWrap>
        <Styled.Img src={imgUrl} alt="NFT image" />
      </Styled.ImgWrap>
      <Styled.Name>{name}</Styled.Name>
      <OnsalePriceWrap>
        가격 : {price} ETH ($
        {(Number(price) * 2928)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        )
      </OnsalePriceWrap>
      {owner !== address && <ButtonWrap>
        <S_Button onClick={() => purchaseNftHandler(id)}>구매하기</S_Button>
      </ButtonWrap>}
    </Styled.Container>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default OnsaleNftCard;
