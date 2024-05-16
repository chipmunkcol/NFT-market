import styled from "styled-components";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { web3, MintContract, SaleNftContract, SaleNftAddress } from "../../contracts/index";
// import { toWei } from "web3-utils";
import NftCard, * as Styled from "./NftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button } from "../styles/styledComponent";
import { C_setOnsaleNft, P_updateMetadataSetOnsale, getImageUrl, getIpfsTokenData, getTargetNftToIpfsData, ipfsGetOptions, ipfsPutOptions } from "../hooks/common";

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

// nftId, nftName, tokenUrl, nftPrice 
const NonSaleNftCard = ({ nft }) => {
  const { nftId, nftName, tokenUrl } = nft;
  // const { setTrigger } = useContext(GlobalContext) as { setTrigger: (value: boolean) => void };
  const { setOnsaleTrigger, account } = useContext(GlobalContext)

  // const [registerPrice, setRegisterPrice] = useState(0);
  const priceRef = useRef(null);

  const registerForSaleHandler = async () => {
    const price = Number(priceRef.current?.value);
    const ipfsData = await getTargetNftToIpfsData(tokenUrl);
    console.log('ipfsData: ', ipfsData);

    const updateResult = await P_updateMetadataSetOnsale(nftId, ipfsData, price);
    if (!updateResult.ok) return;

    const approveResult = await MintContract.methods.approve(SaleNftAddress, nftId).send({ from: account });
    console.log('result: ', approveResult);
    if (!approveResult.status) return;

    const setOnsaleResult = await C_setOnsaleNft(nftId, price, account);
    if (setOnsaleResult.status) {
      alert("판매 등록이 완료되었습니다.");
      priceRef.current.value = '';
      setOnsaleTrigger(prev => !prev);
    }
  };

  const [, setIpfsData] = useState({
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
      <Styled.ImgWrap>
        {/* <Styled.Img src={imageUrl} alt="NFT image" /> */}
        <Styled.BgImg $src={imageUrl} alt="NFT image" />
      </Styled.ImgWrap>
      <Styled.NftInfo>
        <Styled.Name>{nftName}</Styled.Name>
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
//         alert("판매 등록이 완료되었습니다.");
//         setOnsaleTrigger(prev => !prev);
//       }
//     })
//     .catch((err) => console.error(err));
// }
// }