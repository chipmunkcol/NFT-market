import styled from "styled-components";
import React, { FC, useRef, useState } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
// import { toWei } from "web3-utils";
import NftCard from "./NftCard";
import { S_Button } from "../styles/styledComponent";

interface props {
  nft: {
    nftId: number;
    nftUrl: string;
    nftPrice: string;
  };
  account: string;
}

const SaleNftCard: FC<props> = ({ nft, account }) => {
  const { nftId, nftUrl, nftPrice } = nft;
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
      <NftCard nftUrl={nftUrl} />
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
          <input
            type="number"
            ref={priceRef}
            style={{ width: "90px" }}
            placeholder="단위: ETH"
          />
          <Button onClick={registerForSaleHandler}>판매 등록</Button>
        </OnsalePriceWrap>
      )}
    </Box>
  );
};

const Box = styled.div`
  /* height: 300px; */
`;

const Button = styled.button`
  background-color: rgba(32, 129, 226, 1);
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 48px;
  padding: 12px 18px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: rgba(32, 129, 226, 0.8);
  }
`;

const OnsalePriceWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default SaleNftCard;
