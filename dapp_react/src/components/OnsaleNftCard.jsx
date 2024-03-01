/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NftCard from "./NftCard";
import { GlobalContext } from "../context/GlobalContext";
import { SaleNftContract, MintContract, web3 } from "../../contracts/index";
// interface props {
//   nft: {
//     nftId: number;
//     nftType: number;
//     nftPrice: string;
//   }
// }


// const OnsaleNftCard: FC<props> = ({ nft }) => {
const OnsaleNftCard = ({ nft }) => {
  const { nftId, nftType, nftPrice } = nft;
  const { myNfts, account, setTrigger } = useContext(GlobalContext);
  const [isMyNft, setIsMyNft] = useState(false);

  function checkMyNft(nftId) {
    const res = myNfts.some((myNft) => myNft.nftId === nftId);
    setIsMyNft(res);
  }

  useEffect(() => {
    checkMyNft(nftId);
  }, [myNfts]);

  async function purchaseNftHandler(nftId) {
    try {
      const weiPrice = web3.utils.toWei(nftPrice, 'ether');
      const res = await SaleNftContract.methods.purchaseNft(nftId).send({ from: account, value: weiPrice });
      // console.log('res: ', res);
      if (res.status) {
        alert('NFT 구매에 성공했습니다.');
      }
      setTrigger(prev => !prev);

    } catch (err) {
      console.log('err: ', err);
    }
  }

  return (
    <Box>
      <NftCard nftType={nftType} />

      <OnsalePriceWrap>
        가격 : {nftPrice} ETH ($
        {(Number(nftPrice) * 2928)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        )
      </OnsalePriceWrap>
      {!isMyNft && <ButtonWrap>
        <button onClick={() => purchaseNftHandler(nftId)}>구매하기</button>
      </ButtonWrap>}
    </Box>
  );
};

const Box = styled.div`
  /* height: 300px; */
`;
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
