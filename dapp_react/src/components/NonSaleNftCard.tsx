import styled from "styled-components";
import React, { FC, useRef, useState } from "react";
import { SaleNftContract, web3 } from "../../contracts/index";
// import { toWei } from "web3-utils";
import * as Styled from "./NftCard";
import { S_Button } from "../styles/styledComponent";

interface props {
  nft: {
    nftId: number;
    nftHash: string;
    nftPrice: number;
    nftType: number;
  };
  account: string;
}

const NonSaleNftCard: FC<props> = ({ nft, account }) => {
  const { nftId, nftHash, nftPrice } = nft;

  const [registerPrice, setRegisterPrice] = useState<number>(0);
  const onChangeRegisterPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterPrice(Number(e.target.value));
  };

  const registerForSaleHandler = async () => {
    const weiPrice = web3.utils.toWei(registerPrice, "ether");
    const res = await SaleNftContract.methods.setSaleNft(nftId, weiPrice).send({
      from: account,
    });
    console.log("res: ", res);
    if (res.status) {
      alert("판매 등록이 완료되었습니다.");
      setRegisterPrice(registerPrice);
    }
  };

  const imgUrl = () => {
    const mintHash = import.meta.env.VITE_IPFS_MINT_HASH;
    if (mintHash === nftHash) {
      return `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${nftHash}/${
        nft.nftType
      }.png`;
    } else {
      return `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${nftHash}`;
    }
  };

  return (
    <Styled.Container>
      <Styled.ImgWrap>
        <Styled.Img src={imgUrl()} alt="NFT image" />
      </Styled.ImgWrap>
      <Styled.NftInfo>
        <Styled.Name>NFT {"#"}277</Styled.Name>
        {nftPrice && (
          <Price>
            가격 : {nftPrice} ETH ($
            {(Number(nftPrice) * 2928)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            )
          </Price>
        )}
      </Styled.NftInfo>
      {!nftPrice && (
        <SaleRegistrationWrap>
          <Input
            type="number"
            onChange={onChangeRegisterPrice}
            placeholder="단위: ETH"
          />
          <Button onClick={registerForSaleHandler}>판매 등록</Button>
        </SaleRegistrationWrap>
      )}
    </Styled.Container>
  );
};
const Price = styled.div`
  padding-top: 0.5rem;
`;
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
