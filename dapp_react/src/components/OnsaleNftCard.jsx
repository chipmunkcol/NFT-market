/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import * as Styled from './NftCard'
// import NonSaleNftCard from "./NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { MintContract, web3, SaleNftContract } from "../../contracts/index";
import { S_Button } from "../styles/styledComponent";
import { P_updateMetadataAddCart, P_updateMetadataPurchase, formatPrice, getImageUrl, getIpfsTokenData, getTargetNftToIpfsData, getTruncatedAccount, pinJsonToIPFSForCart } from "../hooks/common";
import iconCart from "../assets/images/icon-cart-wh.png";
import { useNavigate } from "react-router-dom";
import useAsyncTask from "../hooks/useAsyncTask";
import Swal from "sweetalert2";
import { Confirm, toastSwal } from "../hooks/swal";
import Spinner from "./Spinner";
import { transactWithPurchaseNft } from "../../contracts/interface";
// interface props {
//   nft: {
//     nftId: number;
//     nftHash: number;
//     nftPrice: string;
//   }
// }


// const OnsaleNftCard: FC<props> = ({ nft }) => {

// nftId, nftName, tokenUrl, nftPrice 
const OnsaleNftCard = ({ nft, account, gridCss }) => {
  const { nftId, nftName, tokenUrl, nftPrice, previousPrice, owner, isReveal, fileName, collectionIpfs } = nft;

  const { handleWithLoading } = useAsyncTask();
  const { signer } = useContext(GlobalContext);
  const isMyNft = account?.toLowerCase() === owner?.toLowerCase();
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const navigate = useNavigate();

  const purchaseController = async () => {
    if (nftPrice === 0) {
      toastSwal('판매 등록되지 않은 nft입니다');
      return;
    }

    const res = await handleWithLoading(() => purchaseNftHandler(nftId), 'NFT 구매 중입니다');
    if (res) {
      // toastSwal('NFT 구매에 성공했습니다.');
      // const result = window.confirm(`NFT 구매 성공 \nMyPage로 확인하러 가기`);
      const result = await Confirm('NFT 구매 성공', 'MyPage로 확인하러 가기');
      if (result.isConfirmed) {
        navigate(`/mypage/${account}`)
      } else {
        window.location.reload();
      }
    }
  };


  async function purchaseNftHandler(nftId) {

    try {
      const ipfsData = await getTargetNftToIpfsData(tokenUrl);
      const updateResult = await P_updateMetadataPurchase(nftId, ipfsData, account);
      if (!updateResult.ok) return;

      const weiPrice = web3.utils.toWei(nftPrice, 'ether');
      // const res = await SaleNftContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      const res = await transactWithPurchaseNft(signer, nftId, weiPrice);
      // console.log('res: ', res);
      if (res.status) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log('err: ', err);
      return false;
    }
  }

  // 장바구니에 담기
  const addCartHandler = async nft => {
    setIsLoadingCart(true);

    try {
      let cartIpfsHash = localStorage.getItem(`cart-${account}`);
      if (!cartIpfsHash) {
        cartIpfsHash = await pinJsonToIPFSForCart(account, nft);
        cartIpfsHash && localStorage.setItem(`cart-${account}`, JSON.stringify(cartIpfsHash));
      } else {
        const paredCartIpfsHash = JSON.parse(cartIpfsHash);
        const updateMetadataResult = await P_updateMetadataAddCart(paredCartIpfsHash, nft);

        if (!updateMetadataResult.ok) return;
        toastSwal('장바구니에 담겼습니다.');
      }
    } finally {
      setIsLoadingCart(false);
    }
  };

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
        let tokenData;
        if (isReveal) {
          const revealedTokenUrl = `${tokenUrl}/${fileName}`;
          tokenData = await getIpfsTokenData(revealedTokenUrl);
        } else {
          // const revealedTokenUrl = `${tokenUrl}/${fileName}`;
          // tokenData = await getIpfsTokenData(revealedTokenUrl);
          tokenData = await getIpfsTokenData(tokenUrl);
        }
        setIpfsData(tokenData);
        setImageUrl(getImageUrl(tokenData.image));
      } catch (error) {
        console.error('Error fetching IPFS data:', error);
      }
    }

    fetchIpfsData();
  }, [tokenUrl]);

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
        <BgImg $src={imageUrl} alt="NFT image" />
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
            <CartBtn onClick={() => addCartHandler(nft)} >
              <CartImg>
                {isLoadingCart ? <Spinner _custom={{
                  color: '#3498db',
                  size: '16px',
                  height: '100%'
                }} /> :
                  <img src={iconCart} alt="장바구니" />}
              </CartImg>
            </CartBtn>
          </ButtonWrap>) : (
          <div style={{ color: '#cccccc' }}>Ownered by: {getTruncatedAccount(account)}</div>
        )
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
