import React, { useContext, useEffect, useRef, useState } from "react";
// import { MintContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
// import { S_Button, S_Wallet_Button } from "../styles/styledComponent";
import bgMain from '../assets/images/bg-main.png';
import { ReactComponent as iconFind } from '../assets/images/icon-find.svg';
import iconGrid4 from '../assets/images/icon-grid4.png';
import iconGrid9 from '../assets/images/icon-grid9.png';
import iconList from '../assets/images/icon-list.png';
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useNavigate, useHref, useMatch, useParams, useSearchParams } from 'react-router-dom'
// import { useInView } from 'react-intersection-observer';

// const dummyData = [{ name: '111', price: 3, isOnsale: true }, { name: '222', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }];
const MarketPlace = () => {
  // const { onsaleNftListLength } = useContext(GlobalContext);
  const navigate = useNavigate();
  const searchRef = useRef('');
  const location = useLocation();
  const isNftPath = location.pathname.includes('nft');

  const onChangeSearch = e => {
    searchRef.current = e.target.value;
  }

  const localStorageGrid = Number(localStorage.getItem('grid'));
  const [grid, setGrid] = useState(localStorageGrid ? localStorageGrid : 5);
  const [gridCss, setGridCss] = useState({
    grid,
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px', // '5px',
    cardWidth: '193px', // '123px',
    fontSize: '14px', // '12px',
  });
  const grid5Hander = () => {
    localStorage.setItem('grid', 5);
    setGrid(5);
  }
  const grid7Hander = () => {
    localStorage.setItem('grid', 8);
    setGrid(8);
  }

  useEffect(() => {
    setGridCss({
      grid,
      gridTemplateColumns: `repeat(${grid}, 1fr)`,
      gap: grid === 5 ? '10px' : '5px',
      cardWidth: grid === 5 ? '193px' : '123px',
      fontSize: grid === 5 ? '14px' : '12px',
    });
  }, [grid]);

  const searchNfts = async () => {
    if (searchRef.current === '' && isNftPath) {
      navigate('/market-place/nft');
    } else if (searchRef.current === '' && !isNftPath) {
      navigate('/market-place/collection');
    } else if (isNftPath) {
      navigate(`/market-place/nft?query=${searchRef.current}`);
    } else {
      navigate(`/market-place/collection?query=${searchRef.current}`);
    }
  };

  const onKeydownHandler = e => {
    e.key === 'Enter' && searchNfts();
  };

  const categoryHandler = (e) => {
    if (e.target.nodeName !== 'BUTTON') return;

    const category = e.target.innerText;
    navigate(`?category=${category}`);
  };

  const collectionCategoryHandler = (e) => {
    if (e.target.nodeName !== 'BUTTON') return;

    const category = e.target.innerText;
    navigate(`/market-place/collection?query=${category}`);
  };

  // nft 갯수
  const [count, setCount] = useState(0);

  return (
    <Background>
      <Container>
        <FixArea>
          <div style={{ display: 'flex', alignItems: 'end', gap: '50px', padding: '10px 0 20px 0', borderBottom: '1px solid #cccccc' }}>
            <h1>MarketPlace</h1>
            <div>
              <Link to={'nft'}>
                <NavMain style={{ color: isNftPath ? '#007bff' : 'black' }}>NFT</NavMain>
              </Link>
            </div>
            <div>
              <Link to={'collection'} >
                <NavMain style={{ color: !isNftPath ? '#007bff' : 'black' }}>COLLECTION</NavMain>
              </Link>
            </div>
          </div>
          <div style={{ padding: '10px 0' }}>
            <FlexWrap>
              <div style={{ width: '77px' }}>결과 {count}개</div>
              <div style={{ position: 'relative', width: '400px', height: '48px' }}>
                <Input type="text" placeholder="이름 또는 태그로 검색" onChange={onChangeSearch} onKeyDown={onKeydownHandler} />
                <IconWrap onClick={searchNfts}>
                  <IconFind />
                </IconWrap>
              </div>
              <div style={{ width: '240px', height: '48px' }}>
                <Select >
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
        </FixArea>
        <div style={{ paddingTop: '130px' }}>
          <FlexWrap style={{ alignItems: 'normal' }} >
            <LeftPart>
              <CategoryBox>
                <div>
                  <ul onClick={categoryHandler}>
                    <h3>카테고리</h3>
                    {['예술', '유명인', '게임', '음악', '가상자산', '프로필 사진'].map(category => (
                      <li key={`category-${category}`}>
                        <NavButton>
                          {category}
                        </NavButton>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul onClick={collectionCategoryHandler}>
                    <h3>컬렉션</h3>
                    {
                      ['pudge penguin', 'fake punks', '컬렉션 3', '컬렉션 4'].map(collection => (
                        <NavButton key={`collection-category-${collection}`}>
                          {collection}
                        </NavButton>
                      ))
                    }
                  </ul>
                </div>
              </CategoryBox>
            </LeftPart>
            <RightPart>
              <Outlet context={[gridCss, setCount]} />
            </RightPart>
          </FlexWrap>
        </div>
      </Container>
    </Background>
  );
}

const NavButton = styled.button`
  padding: 12px 24px;
  display: inline-block;
  border-radius: 0.75rem;
  min-width: 180px;
  font-weight: 700;

  &:hover {
    background-color: rgba(18, 18, 18, 0.04);
    /* border: 1px solid #f6f6f6; */
  }
`;

const NavMain = styled.span`
  /* margin-left: 50px; */
  /* padding: 12px 24px; */
  display: inline-block;
  /* min-width: 180px; */
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #2081e2cc;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 5Px;
  }

  h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  li {
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: #007bff;
    }
  
  }
`;

const FixArea = styled.div`
  width: 95%;
  position: fixed;
  background-color: white;
  z-index: 1;
`;

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
  /* padding-left: 1rem; */
  text-align: center;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: black;

  padding: 0rem 2rem;
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