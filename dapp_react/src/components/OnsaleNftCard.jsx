/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from './NftCard'
// import NonSaleNftCard from "./NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { MintContract, web3, SaleNftContract } from "../../contracts/index";
import { S_Button } from "../styles/styledComponent";
import { P_updateMetadataPurchase, getImageUrl, getIpfsTokenData, getTargetNftToIpfsDataMetadata } from "../hooks/common";
// interface props {
//   nft: {
//     nftId: number;
//     nftHash: number;
//     nftPrice: string;
//   }
// }


// const OnsaleNftCard: FC<props> = ({ nft }) => {

// nftId, nftName, tokenUrl, nftPrice 
const OnsaleNftCard = ({ nft, account, cardWidth }) => {
  const { nftId, nftName, tokenUrl, nftPrice } = nft;
  const { setPurchaseTrigger } = useContext(GlobalContext);
  const [isMyNft, setIsMyNft] = useState(false);

  // function checkMyNft(nftId) {
  //   const res = myNfts.some((myNft) => myNft.nftId === nftId);
  //   setIsMyNft(res);
  // }

  // useEffect(() => {
  //   checkMyNft(id);
  // }, [myNfts]);
  // useEffect(() => {
  //   setIsMyNft(account === owner?.toLowerCase());
  // }, [account]);

  async function purchaseNftHandler(nftId) {
    try {
      const ipfsData = await getTargetNftToIpfsDataMetadata(tokenUrl);
      const updateResult = await P_updateMetadataPurchase(nftId, ipfsData, account);
      if (!updateResult.ok) return;

      const weiPrice = web3.utils.toWei(nftPrice, 'ether');
      const res = await SaleNftContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        alert('NFT 구매에 성공했습니다.');
        setPurchaseTrigger(prev => !prev);
      }

    } catch (err) {
      console.log('err: ', err);
    }
  }

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


  const [ipfsData, setIpfsData] = useState({
    name: '',
    description: '',
    image: '',
    attributes: []
  });


  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    if (!tokenUrl) return;

    async function fetchIpfsData() {
      try {
        const tokenData = await getIpfsTokenData(tokenUrl);
        setIpfsData(tokenData);
        setImageUrl(getImageUrl(tokenData.image));
      } catch (error) {
        console.error('Error fetching IPFS data:', error);
      }
    }

    fetchIpfsData();
  }, [tokenUrl]);

  return (
    <Styled.Container>
      {/* <NonSaleNftCard nftHash={nftHash} /> */}
      <ImgWrap $cardWidth={cardWidth} >
        <Styled.Img src={imageUrl} alt="NFT image" />
      </ImgWrap>
      <Styled.Name>{nftName}</Styled.Name>
      <OnsalePriceWrap>
        가격 : {nftPrice} ETH ($
        {(Number(nftPrice) * 2928).toFixed(2)}
        )
      </OnsalePriceWrap>
      {
        !isMyNft && <ButtonWrap>
          <S_Button onClick={() => purchaseNftHandler(nftId)}>구매하기</S_Button>
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
