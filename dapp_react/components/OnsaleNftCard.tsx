/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from "react";
import styled from "styled-components";
import NftCard from "./NftCard";

interface props {
  nft: {
    nftId: number;
    nftType: number;
    nftPrice: string;
  };
  account: string;
}

const OnsaleNftCard: FC<props> = ({ nft, account }) => {
  const { nftId, nftType, nftPrice } = nft;

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
    </Box>
  );
};

const Box = styled.div`
  /* height: 300px; */
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default OnsaleNftCard;
