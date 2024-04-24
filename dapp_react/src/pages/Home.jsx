/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useRef, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { MintContract } from "../../contracts/index";
import NonSaleNftCard from "../components/NonSaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import bgMain from '../assets/images/bg-main.png';
import test1 from '../assets/images/test/1.gif';
import test2 from '../assets/images/test/2.png';
import test3 from '../assets/images/test/3.png';
import test4 from '../assets/images/test/4.png';

import Slider from "../components/Slider";
import { S_Button } from "../styles/styledComponent";

// Detect the MetaMask Ethereum provider

function Home() {
  //state to store and show the connected account
  // const [account, setAccount] =
  //   useState("연결된 계정이 없습니다");
  const { account } = useContext(GlobalContext);
  const [mintNft, setMintNft] = useState({
    ipfsHash: "",
    nftType: 0,
  });

  const onClickMint = async () => {
    try {
      const ipfsHash = `${import.meta.env.VITE_IPFS_MINT_HASH}`;
      const result = await MintContract.methods
        .mintAnimalToken(ipfsHash).send({ from: account });

      console.log('result: ', result);
      if (result.status) {
        const balanceLenth = await MintContract.methods.balanceOf(account).call();

        const nftId = await MintContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLenth, 10) - 1).call();

        const nftHashPlusType = await MintContract.methods.nftHashs(nftId).call();
        const nftType = parseInt(nftHashPlusType.split('/')[1]);
        setMintNft({
          ipfsHash,
          nftType,
        });
        const jsonKeyvalues = JSON.stringify({
          ipfsPinHash: ipfsHash,
          keyvalues: {
            owner: account,
            nftType,
          },
        });
        const options = {
          method: 'PUT',
          headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}`, 'Content-Type': 'application/json' },
          body: jsonKeyvalues
        };

        fetch('https://api.pinata.cloud/pinning/hashMetadata', options)
          .then(response => console.log(response))
          .catch(err => console.error(err));
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };


  const sliderRef = useRef(null);

  // const handleNext = () => {
  //   sliderRef.current.slideNext();
  // }
  // const handlePrev = () => {
  //   sliderRef.current.slidePrev();
  // }

  return (
    <Background>
      <Container>
        <S_Background $bgColor="#161618" >
          <Slider sliderRef={sliderRef} />
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem', padding: '2rem 0' }}>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].map((item, index) => (
                    <ImgWrap>
                      <Img key={index} src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].reverse().map((item, index) => (
                    <ImgWrap>
                      <Img key={index} src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <div style={{ width: '50%', padding: '3rem 1rem' }}>
              <div style={{ display: 'flex' }}>
                <h2>NFT 랭킹</h2>
                <h4>2024.04.23 13:15 기준</h4>
              </div>
              <div style={{ width: '100%', height: '100%', padding: '0.5rem', backgroundColor: '#212226' }}>

              </div>
            </div>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].map((item, index) => (
                    <ImgWrap>
                      <Img key={index} src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
            <TestWrap>
              <TestMovingBg>
                {
                  [test1, test2, test3, test4, test1, test2, test3, test4].reverse().map((item, index) => (
                    <ImgWrap>
                      <Img key={index} src={item} alt="test" />
                    </ImgWrap>
                  ))
                }
              </TestMovingBg>
            </TestWrap>
          </div>
        </S_Background>
        <div style={{ marginTop: '-2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <TopPicksBox>
              <div style={{ textAlign: 'center' }}>
                <div>
                  <i />👍
                </div>
                <h2>TOP 컬렉터가 구매했어요</h2>
                <p>NFT에 진심인 그들의 선택은?</p>
              </div>
              <div>
                <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                  {
                    [1, 2, 3].map(item => (
                      <li style={{ backgroundColor: 'yellowgreen' }}>
                        <div><img /></div>
                        <h3>{item} name</h3>
                        <p>price</p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </TopPicksBox>
            <HighestPriceBox></HighestPriceBox>
          </div>
        </div>
      </Container>
    </Background>
  );
}

const HighestPriceBox = styled.div`
  width: 432px;
  height: 620px;
  background: linear-gradient(
    to bottom,
    rgba(255, 190, 0, 0.16) 0%,
    rgba(255, 190, 0, 0.024) 30.73%,
    rgba(255, 190, 0, 0) 100%
  ), linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  border-radius: 8px;
`;
const TopPicksBox = styled.div`
  width: 672px;
  height: 620px;
  padding: 0 2rem;
  background: linear-gradient(
    to bottom,
    rgba(85, 0, 255, 0.08) 0%,
    rgba(85, 0, 255, 0.01) 30.73%,
    rgba(85, 0, 255, 0) 100%
  ), linear-gradient(to bottom, rgb(247, 247, 250), rgb(247, 247, 250));
  border-radius: 8px;
`;


const ImgWrap = styled.div`
  width: 100px;
  height: 148px;
`;
const Img = styled.img`
  width: 100%;
  height: 148px;
  object-fit: cover;
  border-radius: 10px;
  filter: brightness(0.2);
  transition: filter 0.3s ease;

  animation: move-image 30s linear infinite;
  cursor: pointer;
  &:hover {
      filter: brightness(1);
  }

@keyframes move-image {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
`;
const TestWrap = styled.div`
  /* width: 100px; */
  height: 800px;
  background-color: #161618;
`;

const TestMovingBg = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-image: url('');
  background-size: cover;
  background-repeat: repeat-y;
  animation: move-background 5s linear infinite;

  @keyframes move-background {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0 ;
      /* background-position: 0 100%; */
`;

const S_Background = styled.div`
  width: 100%;
  background-color: ${props => props.$bgColor ? props.$bgColor : '#ffffff'};
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  color: #f0f0f1;
  /* padding: 0 50px 0 50px; */
`;
// const Background = styled.div`
//   height: 100%;
//   padding-top: 100px;
//   background-image: url(${bgMain});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;
// const Slider = styled.div`
//   height: 300px;
//   background-color: rgba(0, 0, 0, 0.5);
// `;
export default Home;
{/* Button to trigger Metamask connection */ }
{/* <button onClick={() => connectMetamask()}>Connect to Metamask</button> */ }

{/* Display the connected account */ }
{/* <h2>{account}</h2>
      <button onClick={onClickMint}>Mint 버튼</button>
      {nftHash && <NonSaleNftCard nftHash={nftHash} />} */}