/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useRef, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { MintContract } from "../../contracts/index";
import NftCard from "../components/NftCard";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import bgMain from '../assets/images/bg-main.png';
import Slider from "../components/Slider";
import { S_Button } from "../styles/styledComponent";

// Detect the MetaMask Ethereum provider

function Home() {
  //state to store and show the connected account
  // const [account, setAccount] =
  //   useState("연결된 계정이 없습니다");
  const { account, setAccount } = useContext(GlobalContext);
  const [nftType, setNftType] = useState(null);

  const onClickMint = async () => {
    try {
      const result = await MintContract.methods
        .mintAnimalToken().send({ from: account });

      console.log('result: ', result);
      if (result.status) {
        const balanceLenth = await MintContract.methods.balanceOf(account).call();

        const nftId = await MintContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLenth, 10) - 1).call();

        const nftType = await MintContract.methods.nftTypes(nftId).call();

        setNftType(parseInt(nftType, 10));
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
    <>

      <div style={{ textAlign: 'center', padding: '20px 0px' }}>
        <h1 style={{ fontSize: '36px' }}>NFT 구매부터 판매, 전시까지</h1>
        <h3 style={{ fontSize: '24px', marginTop: '20px' }}>인기 크리에이터와 각종 브랜드 NFT를 다양하게 만나보세요</h3>
      </div>
      {/* Slider 컴포넌트 */}
      <Slider sliderRef={sliderRef} />
      {/* <button style={{ color: 'tomato' }} onClick={handlePrev}>{'<-'}</button>
          <button style={{ color: 'tomato' }} onClick={handleNext}>{'->'}</button> */}
      <h4 style={{ fontSize: '18px', marginTop: '10px' }}>Nft.com 만의 오리지널 NFT 민팅</h4>
      <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '50px' }}>
        <S_Button>NFT 민팅하기</S_Button>
        <S_Button>마켓플레이스 보기</S_Button>
      </div>
      <div style={{ width: '100%' }} >
        <h2 style={{ fontSize: '24px' }}>인기 크리에이터</h2>
        {
          <ul style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[1, 2, 3, 4].map((_, index) => {
              return (<div key={`top-creator-${index}`} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px' }}>
                  <img style={{ width: '100%', height: '100%', borderRadius: '50%' }} src="https://via.placeholder.com/150" alt="크리에이터 이미지" />
                </div>
                <h4>크리에이터 이름</h4>
                <h5>$2,000,000+</h5>
              </div>)
            })}
          </ul>
        }
      </div>
      <div>
        <h2 style={{ fontSize: '24px' }}>인기 NFT</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <span>정렬 기준</span>
            <select>
              <option>최신순</option>
              <option>인기순</option>
              <option>낮은 가격순</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>오늘</div>
            <div>지난 7일</div>
            <div>지난 30일</div>
            <div>전체</div>
          </div>
        </div>
        {
          <ul style={{ display: 'flex', gap: '10px', justifyContent: 'center', overflow: 'hidden' }}>
            {[1, 2, 3, 4].map((_, index) => {
              return (<div key={`top-nft-${index}`} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                <div style={{ width: '150px', height: '150px' }}>
                  <img style={{ width: '100%', height: '100%' }} src="https://via.placeholder.com/150" alt="NFT 이미지" />
                </div>
                <h4>NFT 이름</h4>
                <h5>$2,000,000+</h5>
              </div>)
            })}
          </ul>
        }
      </div>
    </>
  );
}

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
// `;
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
      {nftType && <NftCard nftType={nftType} />} */}