import styled from "styled-components";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { MintContract, SaleNftAddress } from "../../contracts/index";
// import { toWei } from "web3-utils";
import * as Styled from "./NftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button } from "../styles/styledComponent";
import { C_setOnsaleNft, P_updateMetadataSetOnsale, getTargetNftToIpfsData, ipfsGetOptions, ipfsPutOptions } from "../hooks/common";
import useAsyncTask from "../hooks/useAsyncTask";
import useGetTokenData from "../hooks/useGetTokenData";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toastSwal } from "../hooks/swal";
import { transactWithApprove } from "../../contracts/interface";


// nftId, nftName, tokenUrl, nftPrice 
const NonSaleNftCard = ({ nft }) => {
  const { nftId, nftName, tokenUrl, nftPrice, collectionIpfs, fileName } = nft;
  const toeknUrlRevealedCheck = (collectionIpfs && tokenUrl !== collectionIpfs) ? `${tokenUrl}/${fileName}` : tokenUrl;
  const tokenData = useGetTokenData(toeknUrlRevealedCheck);

  const { description, image, attributes } = tokenData;
  const { setMyNfts, account, myNfts, signer } = useContext(GlobalContext);
  const { handleWithLoading } = useAsyncTask();

  // const [registerPrice, setRegisterPrice] = useState(0);
  const priceRef = useRef(null);

  const updateMyNfts = () => {
    const newMyNfts = myNfts.map((nft) => {
      if (nft.nftId === nftId) {
        return {
          ...nft,
          nftPrice: Number(priceRef.current.value),
          owner: account,
        };
      }
      return nft;
    });
    setMyNfts(newMyNfts);
  }

  const setOnsaleController = async () => {
    const res = await handleWithLoading(() => registerSetOnsale(), '판매 등록 중입니다');
    if (res) {
      updateMyNfts();
      priceRef.current.value = '';
      toastSwal("판매 등록이 완료되었습니다.");
    }
  }


  const validatePrice = () => {
    if (!priceRef.current?.value) {
      Swal.fire('가격을 입력해주세요');
      return false;
    }
    return true;
  }

  const registerSetOnsale = async () => {
    if (!validatePrice()) return;

    try {
      const price = Number(priceRef.current?.value);
      const approveResult = await transactWithApprove(signer, nftId);
      if (!approveResult.status) return;

      const setOnsaleResult = await C_setOnsaleNft(signer, nftId, price);
      if (!setOnsaleResult.status) return;

      const ipfsData = await getTargetNftToIpfsData(tokenUrl);
      const updateResult = await P_updateMetadataSetOnsale(nftId, ipfsData, price);
      if (!updateResult.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error setting onsale:', error);
      return false;
    }
  };

  const navigate = useNavigate();
  const navigateDetailPage = () => {
    if (collectionIpfs) {
      navigate(`/nft-detail/collection/${tokenUrl}/${nftId}`);
    }
    else {
      navigate(`/nft-detail/${tokenUrl}/${nftId}`);
    }
  }

  const truncatedDes = description?.length > 15 ? description?.slice(0, 15) + '...' : description;


  return (
    <Styled.Container>
      <ImgWrap onClick={navigateDetailPage}>
        {/* <Styled.Img src={imageUrl} alt="NFT image" /> */}
        <Styled.BgImg $src={image} alt="NFT image" />
      </ImgWrap>
      <Content>
        <Styled.Name>{nftName}</Styled.Name>
        <div style={{ marginTop: '5px' }}>{truncatedDes}</div>
      </Content>
      <SaleRegistrationWrap>
        <Input
          type="number"
          ref={priceRef}
          // onChange={onChangePrice}
          placeholder="단위: ETH"
        />
        <Button onClick={setOnsaleController}>판매 등록</Button>
      </SaleRegistrationWrap>
    </Styled.Container>
  );
};

const Content = styled.div`

padding-top: 10px;
  padding-bottom: 20px;
`;

const ImgWrap = styled.div`
width: 193px;
  height: 193px;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;

  cursor: pointer;
`;
// const Price = styled.div`
//   padding-top: 0.5rem;
// `;
const Input = styled.input`
  width: calc(100% - 80px);
  border-bottom-left-radius: 0.75rem;
  border: none;
  border-top: 1px solid #e9e9e9;
  padding-left: 12px;
`;
const Button = styled.button`
  background-color: rgba(32, 129, 226, 1);
  border-bottom-right-radius: 8px;
  width: 90px;
  height: 35px;
  padding: 0px 12px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;

const SaleRegistrationWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default NonSaleNftCard;

// const registerForSaleHandler = async () => {
// const result = await MintContract.methods.approve(SaleNftAddress, nftId).send({ from: account });
// console.log('result: ', result);

// const price = Number(priceRef.current?.value);
// const weiPrice = web3.utils.toWei(price, "ether");
// const res = await SaleNftContract.methods
//   .setOnsaleNft(nftId, weiPrice)
//   .send({
//     from: account,
//   });
// // console.log("res: ", res);
// if (res.status) {
//   const result = await getTargetNftToIpfsData(tokenUrl);
//   console.log('result: ', result);
//   const jsonKeyvalues = JSON.stringify({
//     ipfsPinHash: tokenUrl,
//     name: nftName,
//     keyvalues: {
//       nftId,
//       owner: account,
//       isOnsale: String(true),
//       nftPrice: price,
//       // numberOfSales:
//       // priceHistory: [{
//       //   owner:'',
//       //   price:
//       // }]
//     },
//   });

//   await fetch("https://api.pinata.cloud/pinning/hashMetadata", ipfsPutOptions(jsonKeyvalues))
//     .then((res) => {
//       if (res.ok) {
//         toastSwal("판매 등록이 완료되었습니다.");
//         setOnsaleTrigger(prev => !prev);
//       }
//     })
//     .catch((err) => console.error(err));
// }
// }