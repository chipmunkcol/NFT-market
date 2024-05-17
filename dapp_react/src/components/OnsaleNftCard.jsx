/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from './NftCard'
// import NonSaleNftCard from "./NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { MintContract, web3, SaleNftContract } from "../../contracts/index";
import { S_Button } from "../styles/styledComponent";
import { P_updateMetadataAddCart, P_updateMetadataPurchase, getImageUrl, getIpfsTokenData, getTargetNftToIpfsData, pinJsonToIPFSForCart } from "../hooks/common";
import iconCart from "../assets/images/icon-cart.png";
// interface props {
//   nft: {
//     nftId: number;
//     nftHash: number;
//     nftPrice: string;
//   }
// }


// const OnsaleNftCard: FC<props> = ({ nft }) => {

// nftId, nftName, tokenUrl, nftPrice 
const OnsaleNftCard = ({ nft, account, gridCss, removedNftListByPurchase }) => {
  const { nftId, nftName, tokenUrl, nftPrice, owner } = nft;
  const { setPurchaseTrigger } = useContext(GlobalContext);
  const isMyNft = account === owner?.toLowerCase();

  async function purchaseNftHandler(nftId) {
    try {
      const ipfsData = await getTargetNftToIpfsData(tokenUrl);
      const updateResult = await P_updateMetadataPurchase(nftId, ipfsData, account);
      if (!updateResult.ok) return;

      const weiPrice = web3.utils.toWei(nftPrice, 'ether');
      const res = await SaleNftContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        removedNftListByPurchase(nftId);
        alert('NFT 구매에 성공했습니다.');
        setPurchaseTrigger(prev => !prev);
      }

    } catch (err) {
      console.log('err: ', err);
    }
  }

  // 장바구니에 담기
  const addCartHandler = async nft => {
    let cartIpfsHash = localStorage.getItem(`cart-${account}`);
    if (!cartIpfsHash) {
      cartIpfsHash = await pinJsonToIPFSForCart(account, nft);
      cartIpfsHash && localStorage.setItem(`cart-${account}`, JSON.stringify(cartIpfsHash));
    } else {
      const paredCartIpfsHash = JSON.parse(cartIpfsHash);
      const updateMetadataResult = await P_updateMetadataAddCart(paredCartIpfsHash, nft);

      if (updateMetadataResult.ok) {
        alert('장바구니에 담겼습니다.');
      }
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
      <ImgWrap $gridCss={gridCss} >
        {/* <Styled.Img src={imageUrl} alt="NFT image" /> */}
        <BgImg $src={imageUrl} alt="NFT image" />
      </ImgWrap>
      <Content>
        <Styled.Name>{nftName}</Styled.Name>
        <OnsalePriceWrap>
          가격 : {nftPrice} ETH ($
          {(Number(nftPrice) * 2928).toFixed(2)}
          )
        </OnsalePriceWrap>
      </Content>
      {
        !isMyNft && (
          <ButtonWrap>
            <PurchaseBtn $gridCss={gridCss} onClick={() => purchaseNftHandler(nftId)}>{gridCss === 5 ? '지금 구매하기' : '구매하기'}</PurchaseBtn>
            <CartBtn onClick={() => addCartHandler(nft)} >
              <CartImg>
                <img src={iconCart} alt="장바구니" />
              </CartImg>
            </CartBtn>
          </ButtonWrap>)
      }
    </Styled.Container>
  );
};

const BgImg = styled.div`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */
  background-image: url(${props => props.$src});
  background-size: 100%;
  background-position: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-size: 110%;
  }
`;

const Content = styled.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
`;

const CartImg = styled.div`
  width: 16px;
  height: 16px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const PurchaseBtn = styled.div`
  width: calc(100% - 41px);
    height: 30px;
    background-color: rgba(32, 129, 226, 1);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    border-radius: 0 0 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: rgba(32, 129, 226, 0.8);
    }
`;

const CartBtn = styled(PurchaseBtn)`
  width: 40px;
  border-radius: 0 0 10px 0;
  height: 30px;
`;

const ImgWrap = styled.div`
  width: ${props => props.$gridCss.cardWidth};
  height: ${props => props.$gridCss.cardWidth};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: white;
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default OnsaleNftCard;
