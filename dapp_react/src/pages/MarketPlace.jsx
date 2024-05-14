import React, { useContext, useEffect, useRef, useState } from "react";
// import { MintContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import { SaleNftContract } from "../../contracts/index"
import { GlobalContext } from "../context/GlobalContext";
// import { S_Button, S_Wallet_Button } from "../styles/styledComponent";
import bgMain from '../assets/images/bg-main.png';
import { ReactComponent as iconFind } from '../assets/images/icon-find.svg';
import iconGrid4 from '../assets/images/icon-grid4.png';
import iconGrid9 from '../assets/images/icon-grid9.png';
import iconList from '../assets/images/icon-list.png';
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useNavigate, useHref, useMatch, useParams, useSearchParams } from 'react-router-dom'
// import { useInView } from 'react-intersection-observer';

// const dummyData = [{ name: '111', price: 3, isOnsale: true }, { name: '222', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }];
const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, getAllonsaleNftListRef, account, onsaleTrigger, purchaseTrigger } = useContext(GlobalContext);
  const navigate = useNavigate();
  const searchRef = useRef('');

  const onChangeSearch = e => {
    searchRef.current = e.target.value;
  }
  // grid 5, 7
  const [grid, setGrid] = useState('1fr 1fr 1fr 1fr 1fr');
  const [cardWidth, setCardWidth] = useState('200px');
  const grid5Hander = () => {
    setGrid('1fr 1fr 1fr 1fr 1fr');
    setCardWidth('200px');
  }
  const grid7Hander = () => {
    setGrid('1fr 1fr 1fr 1fr 1fr 1fr 1fr');
    setCardWidth('180px');
  }

  const searchNfts = async () => {
    navigate(`/market-place/nft?query=${searchRef.current}`);
  };

  const onKeydownHandler = e => {
    e.key === 'Enter' && searchNfts();
  }

  // search 구현
  // const navigate = useNavigate();

  // sort 구현
  const onChangeSort = e => {
    const sortType = e.target.value;
    if (sortType === 'updated') {
      setOnsaleNftList(getAllonsaleNftListRef.current);
    } else if (sortType === 'row') {
      sortAsceNfts();
    } else if (sortType === 'high') {
      sortDescNfts();
    }
  }
  const sortAsceNfts = () => {
    const sortedNfts = [...getAllonsaleNftListRef.current].sort((a, b) => a.price - b.price);
    setOnsaleNftList(sortedNfts);
  }
  const sortDescNfts = () => {
    const sortedNfts = [...getAllonsaleNftListRef.current].sort((a, b) => b.price - a.price);
    setOnsaleNftList(sortedNfts);
  }


  return (
    <Background>
      <Container>
        <h1 style={{ padding: '10px 0 20px 0', borderBottom: '1px solid #cccccc' }}>MarketPlace
          <Link to={'nft'}>
            <span style={{ fontSize: '14px', marginLeft: '10px' }}>NFT</span>
          </Link>
          <Link to={'collection'} >
            <span style={{ fontSize: '14px', marginLeft: '10px' }}>COLLECTION</span>
          </Link>
        </h1>
        <div style={{ padding: '10px 0' }}>
          <FlexWrap>
            <div>결과 {onsaleNftList?.length}개</div>
            <div style={{ position: 'relative', width: '400px', height: '48px' }}>
              <Input type="text" placeholder="이름 또는 태그로 검색" onChange={onChangeSearch} onKeyDown={onKeydownHandler} />
              <IconWrap onClick={searchNfts}>
                <IconFind />
              </IconWrap>
            </div>
            <div style={{ width: '240px', height: '48px' }}>
              <Select onChange={onChangeSort}>
                <option value='updated'>최신순</option>
                <option value='row'>낮은 가격순</option>
                <option value='high'>높은 가격순</option>
              </Select>
            </div>
            <IconContainer>
              <IconBox style={{ borderTopLeftRadius: '0.75rem', borderBottomLeftRadius: '0.75rem' }}>
                <IconList $iconPath={iconList} />
              </IconBox>
              <IconBox onClick={grid5Hander}>
                <IconList $iconPath={iconGrid4} />
              </IconBox>
              <IconBox onClick={grid7Hander} style={{ borderTopRightRadius: '0.75rem', borderBottomRightRadius: '0.75rem' }}>
                <IconList $iconPath={iconGrid9} />
              </IconBox>
            </IconContainer>
          </FlexWrap>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <FlexWrap>
            <LeftPart>
              <div>
                <ul>
                  <h3>카테고리</h3>
                  <li>예술</li>
                  <li>유명인</li>
                  <li>게임</li>
                  <li>스포츠</li>
                  <li>음악</li>
                  <li>가상자산</li>
                  <li>프로필 사진</li>
                </ul>
              </div>
              <div>
                <ul>
                  <h3>컬렉션</h3>
                  <li>사용자 1</li>
                  <li>사용자 2</li>
                  <li>사용자 3</li>
                  <li>사용자 4</li>
                  <li>사용자 5</li>
                  <li>사용자 6</li>
                  <li>사용자 7</li>
                </ul>
              </div>
            </LeftPart>
            <RightPart>
              <Outlet context={[grid, cardWidth]} />
            </RightPart>
          </FlexWrap>
        </div>
      </Container>
    </Background>
  );
}


const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.125rem;
  height: 48px;
  padding: 0.125rem;
  background-color: #f8f8f8;
  border-radius: 0.75rem;
`;
const IconWrap = styled.div`
  position: absolute;
  top: 25%;
  left: 0.75rem;
  cursor: pointer;
`;
const IconFind = styled(iconFind)`
  width: 24px;
  height: 24px;
`
const IconBox = styled.div`
  width: 44px;
  height: 44px;
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  &:hover {
    background-color: #f8f8f8;
  }
  cursor: pointer;
`;

const IconList = styled.div`
  background-image: url(${props => props.$iconPath && props.$iconPath});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 24px;
  height: 24px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.75rem 0.75rem 0.75rem 3rem;
  border-radius: 0.75rem;
  border: none;
  border: 1px solid #cccccc;
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
  border-radius: 0.75rem;
  padding: 0 0.75rem !important;
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
  /* background-image: url(${bgMain});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
`;

const LeftPart = styled.div`
  width: 16%;
`;
const RightPart = styled.div`
  width: 84%;
  padding-left: 1rem;
  text-align: center;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: black;

  padding: 1rem 2rem;
`;


export default MarketPlace;


// async function getOnsaleNftList() {
//   if (!account) return;

//   try {
//     const resultNfts = await MintContract.methods.getOnsaleNfts().call();
//     if (resultNfts.length < 1) return;

//     const newOnsaleNfts = [];
//     resultNfts.forEach(onsaleMyNft => {
//       const { id, name, description, image, isOnsale, price, owner } = onsaleMyNft;
//       const parsedId = parseInt(id, 10);
//       const parsedPrice = parseInt(price, 10);
//       const etherPrice = Number(web3.utils.fromWei(parsedPrice.toString(), 'ether'));
//       newOnsaleNfts.push({ id: parsedId, name, description, image, isOnsale, price: etherPrice, owner });
//     });

//     setOnsaleNftList(newOnsaleNfts);
//     console.log('newMyNfts: ', newOnsaleNfts);
//   } catch (error) {
//     console.log(error);