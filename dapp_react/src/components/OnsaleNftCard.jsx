/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from './NftCard'
// import NonSaleNftCard from "./NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { MintContract, web3, SaleNftContract } from "../../contracts/index";
import { S_Button } from "../styles/styledComponent";
import { P_updateMetadataAddCart, P_updateMetadataPurchase, formatPrice, getImageUrl, getIpfsTokenData, getResizeImageUrl, getTargetNftToIpfsData, getTruncatedAccount, pinJsonToIPFSForCart, purchaseNftHandler } from "../hooks/common";
import { useNavigate } from "react-router-dom";
import useAsyncTask from "../hooks/useAsyncTask";
import Swal from "sweetalert2";
import { Confirm, toastSwal } from "../hooks/swal";
import Spinner from "./Spinner";
import { transactWithPurchaseNft } from "../../contracts/interface";
// import Cart from "./onsaleNftCard/Cart";
import useGetTokenData from "../hooks/useGetTokenData";
import loadingImg from "../assets/images/달팽이로딩.png"
import LazyloadComponent from "../hooks/LazyloadComponent";
import Cart from "./button/Cart";

const OnsaleNftCard = ({ nft, gridCss }) => {
  const { nftId, nftName, tokenUrl, nftPrice, previousPrice, owner, isReveal, fileName, collectionIpfs, ext } = nft;

  const _tokenUrl = nft?.isReveal
    ? `${nft.tokenUrl}/${nft.fileName}`
    : nft.tokenUrl;
  const tokenData = useGetTokenData(_tokenUrl);
  const { image } = tokenData;
  const { handleWithLoading } = useAsyncTask();
  const { signer, account } = useContext(GlobalContext);
  const isMyNft = account?.toLowerCase() === owner?.toLowerCase();
  const navigate = useNavigate();

  const purchaseController = async () => {
    if (!signer) {
      toastSwal('메타마스크 지갑을 연결해주세요');
      return;
    }
    if (nftPrice === 0) {
      toastSwal('판매 등록되지 않은 nft입니다');
      return;
    }

    const res = await handleWithLoading(() => purchaseNftHandler(nftId, tokenUrl, nftPrice, signer), 'NFT 구매 중입니다');
    if (res) {
      const result = await Confirm('NFT 구매 성공', 'MyPage로 확인하러 가기');
      if (result.isConfirmed) {
        navigate(`/mypage/${account}`)
      } else {
        window.location.reload();
      }
    }
  };


  // Detail page
  const navigateDetailPage = () => {
    if (collectionIpfs) {
      navigate(`/nft-detail/collection/${tokenUrl}/${nftId}`);
    } else {
      navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    }
  }

  return (
    <Styled.Container>
      {/* <NonSaleNftCard nftHash={nftHash} /> */}
      <ImgWrap $gridCss={gridCss} onClick={navigateDetailPage}>
        {/* <Styled.Img src={imageUrl} alt="NFT image" /> */}
        {image ?
          // <LazyloadComponent>
          <Img
            src={`${getResizeImageUrl(image, ext)}?w=200&h=200`}
            // src={getImageUrl(image)}
            onError={(e) => (e.currentTarget.src = getImageUrl(image))} alt="NFT image" />
          // </LazyloadComponent>
          : <Img src={loadingImg} alt="loading..." />
        }
      </ImgWrap>
      <Content>
        <Styled.Name>{nftName}</Styled.Name>
        <OnsalePriceWrap>
          {nftPrice} ETH ($
          {formatPrice(Number(nftPrice) * 2928)}
          )
        </OnsalePriceWrap>
        <div style={{ color: '#cccccc', marginTop: '5px', fontSize: '12px' }}>
          Last sale: {previousPrice} ETH
        </div>
      </Content>
      {
        !isMyNft ? (
          <ButtonWrap>
            <PurchaseBtn $gridCss={gridCss} onClick={purchaseController}>{gridCss === 5 ? '지금 구매하기' : '구매하기'}</PurchaseBtn>
            {/* <Cart nft={nft} /> */}
            <Cart css={{ btnWidth: '40px', imgWidth: '16px' }}
              metadata={nft}
              account={account}
            />
          </ButtonWrap>) : (
          <div style={{ color: '#cccccc' }}>Ownered by: {getTruncatedAccount(account)}</div>
        )
      }
    </Styled.Container>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */


  /* background-image: url(${props => props.$src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out; */

  /* 이거 화면 width 애매할 때 image 보여주는게 애매해져서 일단 보류 */
  /* background-size: 100%; */
  /* &:hover {
    background-size: 110%;
  } */
  /* @media (max-width: ${({ theme }) => theme.size.mobile}) {
    background-size: cover;
    &:hover {
      background-size: cover;
    }
  } */
`;

const Content = styled.div`
  /* height: 100px; */
  padding-top: 10px;
  padding-bottom: 20px;
`;


export const PurchaseBtn = styled.div`
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

const ImgWrap = styled.div`
  /* width: ${props => props.$gridCss?.cardWidth ? props.$gridCss.cardWidth : '193px'}; */
  width: 100%;
  height: ${props => props.$gridCss?.cardWidth ? props.$gridCss.cardWidth : '193px'};
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`;

const ButtonWrap = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
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
