import styled from "styled-components";
import React, { FC, useContext, useRef, useState } from "react";
import { web3, MintContract } from "../../contracts/index";
// import { toWei } from "web3-utils";
import NftCard, * as Styled from "./NftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button } from "../styles/styledComponent";

// interface props {
//   nft: {
//     id: number;
//     name: string;
//     description: string;
//     image: string;
//     // nftHash: string;
//     // registerPrice: number;
//     // nftType: number;
//   };
//   account: string;
// }

// const NonSaleNftCard: FC<props> = ({ nft, account }) => {
const NonSaleNftCard = ({ nft }) => {
  const { id, name, image, description, attributes } = nft;
  // const { setTrigger } = useContext(GlobalContext) as { setTrigger: (value: boolean) => void };
  const { setTrigger, account } = useContext(GlobalContext)

  // const [registerPrice, setRegisterPrice] = useState(0);
  const priceRef = useRef(null);

  const registerForSaleHandler = async () => {
    const price = Number(priceRef.current?.value);
    const weiPrice = web3.utils.toWei(price, "ether");
    const res = await MintContract.methods
      .setSaleController(id, weiPrice)
      .send({
        from: account,
      });
    console.log("res: ", res);
    if (res.status) {
      const jsonKeyvalues = JSON.stringify({
        ipfsPinHash: image,
        name,
        keyvalues: {
          id,
          owner: account,
          description: description,
          image,
          isOnsale: String(true),
          price,
          attributes,
        },
      });
      const options = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
          "Content-Type": "application/json",
        },
        body: jsonKeyvalues,
      };

      await fetch("https://api.pinata.cloud/pinning/hashMetadata", options)
        .then((res) => {
          if (res.ok) {
            alert("판매 등록이 완료되었습니다.");
            setTrigger(prev => !prev);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const imgUrl = () => {
    return `${import.meta.env.VITE_GATEWAY_URL
      }/ipfs/${image}?pinataGatewayToken=${import.meta.env.VITE_GATEWAY_TOKEN}`;
  };

  return (
    <Styled.Container>
      <Styled.ImgWrap>
        <Styled.Img src={imgUrl()} alt="NFT image" />
      </Styled.ImgWrap>
      <Styled.NftInfo>
        <Styled.Name>{name}</Styled.Name>
        {/* {registerPrice !== 0 && (
          <Price>
            가격 : {registerPrice} ETH ($
            {(Number(registerPrice) * 2928)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            )
          </Price>
        )} */}
      </Styled.NftInfo>
      <SaleRegistrationWrap>
        <Input
          type="number"
          ref={priceRef}
          // onChange={onChangePrice}
          placeholder="단위: ETH"
        />
        <Button onClick={registerForSaleHandler}>판매 등록</Button>
      </SaleRegistrationWrap>
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
