import React, { useContext, useEffect, useRef, useState } from "react";
import { MintContract, SaleNftContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button, S_Wallet_Button } from "../styles/styledComponent";

const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, trigger } = useContext(GlobalContext);
  const { account } = useContext(GlobalContext);

  async function getOnsaleNftList() {
    const res = await SaleNftContract.methods
      .getOnsaleNftList()
      .call();
    console.log("res: ", res);
    if (res?.length < 0) return;

    const onsaleNftList = [];
    res.map((onsaleNft) => {
      const { nftId, nftUrl, price } = onsaleNft;
      const parsedId = parseInt(nftId, 10);
      const parsedType = parseInt(nftUrl, 10);
      const parsedPrice = parseInt(price, 10);
      const etherPrice = web3.utils.fromWei(parsedPrice.toString(), "ether");
      onsaleNftList.push({
        nftId: parsedId,
        nftUrl: parsedType,
        nftPrice: etherPrice,
      });
    });
    // setOnsaleNftList(prev => [...prev, ...onsaleNftList]);
    setOnsaleNftList(onsaleNftList);
  }

  useEffect(() => {
    getOnsaleNftList();
  }, [trigger]);

  const dataRef = useRef({
    name: null,
    desc: null,
  });
  const [file, setFile] = useState();
  const [cid, setCid] = useState();

  const onchangeNameDataRef = (e) => {
    dataRef.current.name = e.target.value;
  }
  const onchangeDescDataRef = (e) => {
    dataRef.current.desc = e.target.value;
  }
  const onchangeHandler = (e) => {
    setFile(e.target.files[0]);
  }

  const validateFormData = () => {
    if (!account) {
      alert("지갑을 연결해주세요");
      return false;
    }
    if (!dataRef.current.name) {
      alert("이름을 입력해주세요");
      return false;
    }
    if (!dataRef.current.desc) {
      alert("설명을 입력해주세요");
      return false;
    }
    if (!file) {
      alert("파일을 선택해주세요");
      return false;
    }
    return true;
  }

  const handleSubmission = async () => {
    try {
      const validateResult = validateFormData();
      if (!validateResult) return;
      const formData = new FormData();

      const jsonData = JSON.stringify({
        name: dataRef.current.name,
        keyvalues: {
          description: dataRef.current.desc,
        }
      });
      formData.append("pinataMetadata", jsonData);
      formData.append("file", file);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      // setCid(resData.IpfsHash);
      const ipfsHash = resData.IpfsHash;
      if (ipfsHash) {
        const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;
        const mintResult = await MintContract.methods.mintByUser(ipfsUrl).send({ from: account });
        if (mintResult.status) {
          alert("NFT 발행 성공");

        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Container>
      <S_Wallet_Button $account={account} onClick={handleSubmission}>Nft 발행하기</S_Wallet_Button>
      <label>이름</label>
      <input type="text" onChange={onchangeNameDataRef} />
      <label>설명</label>
      <input type="text" onChange={onchangeDescDataRef} />
      <input type="file" onChange={onchangeHandler} />
      {/* {cid && (
        <img
          src={`https://ipfs.io/ipfs/${cid}`}
          alt="ipfs image"
          width={100}
          height={100}
        />
      )} */}
      <h1>MarketPlace</h1>
      {
        onsaleNftList.length < 1 ? (<div>판매중인 NFT가 없습니다.</div>) : (
          <MarketWrap>
            {
              onsaleNftList.map(onsaleNft => (
                <OnsaleNftCard key={onsaleNft.nftId} nft={onsaleNft} />
              ))
            }
          </MarketWrap>
        )
      }
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  
  overflow: hidden;
`;

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export default MarketPlace;
