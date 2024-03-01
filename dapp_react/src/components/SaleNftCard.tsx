import styled from "styled-components";
import React, { FC, useRef, useState } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
// import { toWei } from "web3-utils";
import NftCard from "./NftCard";

interface props {
  nft: {
    nftId: number;
    nftType: number;
    nftPrice: string;
  };
  account: string;
}

const SaleNftCard: FC<props> = ({ nft, account }) => {
  const { nftId, nftType, nftPrice } = nft;
  const priceRef = useRef<HTMLInputElement>(null);
  const [onsalePrice, setOnsalePrice] = useState(nftPrice);

  const registerForSaleHandler = async () => {
    const _price = priceRef.current?.value;
    const weiPrice = web3.utils.toWei(_price || "0", "ether");
    const res = await SaleNftContract.methods.setSaleNft(nftId, weiPrice).send({
      from: account,
    });
    console.log("res: ", res);
    if (res.status) {
      alert("판매 등록이 완료되었습니다.");
      setOnsalePrice(_price || "0");
    }
  };

  return (
    <Box>
      <NftCard nftType={nftType} />
      {parseInt(onsalePrice, 0) ? (
        <OnsalePriceWrap>
          가격 : {onsalePrice} ETH ($
          {(Number(onsalePrice) * 2928)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          )
        </OnsalePriceWrap>
      ) : (
        <OnsalePriceWrap>
          <input type="number" ref={priceRef} />
          <button onClick={registerForSaleHandler}>판매 등록</button>
        </OnsalePriceWrap>
      )}
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

export default SaleNftCard;
