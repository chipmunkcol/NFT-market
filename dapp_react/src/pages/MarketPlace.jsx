import React, { useContext, useEffect, useRef, useState } from "react";
import { MintContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
import { S_Button, S_Wallet_Button } from "../styles/styledComponent";
import bgMain from '../assets/images/bg-main.png';
import { ReactComponent as iconFind } from '../assets/images/icon-find.svg';
import iconGrid4 from '../assets/images/icon-grid4.png';
import iconGrid9 from '../assets/images/icon-grid9.png';
import iconList from '../assets/images/icon-list.png';

const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, account, trigger } = useContext(GlobalContext);
  const getAllonsaleNftListRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const encodedOffset = encodeURIComponent(
    offset
  );
  const encodedIsOnsale = encodeURIComponent(
    `{"value":"true", "op":"eq"}`
  )

  // }
  async function getOnsaleNftList() {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}` },
    };
    fetch(
      // `https://api.pinata.cloud/data/pinList?metadata[keyvalues][isOnsale]=${encodedIsOnsale}&pageOffset=0`,
      `https://api.pinata.cloud/data/pinList?metadata[keyvalues][isOnsale]=${encodedIsOnsale}&pageLimit=100`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        const ipfsDatas = response.rows;
        const newOnsaleNfts = [];
        ipfsDatas.forEach(data => {
          const name = data.metadata.name;
          const metaData = data.metadata.keyvalues;
          newOnsaleNfts.push({ ...metaData, name });
        })
        setOnsaleNftList(newOnsaleNfts);
        getAllonsaleNftListRef.current = newOnsaleNfts;
        console.log('newOnsaleNfts: ', newOnsaleNfts);
      })
      .catch((err) => console.error(err));

  }

  useEffect(() => {
    getOnsaleNftList();
  }, [offset]);

  const searchRef = useRef('');
  const onChangeSearch = e => {
    searchRef.current = e.target.value;
  }

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

  const searchNfts = () => {
    const searchQuery = searchRef.current;
    if (searchQuery === '') {
      setOnsaleNftList(getAllonsaleNftListRef.current);
      return;
    }
    const newOnsaleNftList = getAllonsaleNftListRef.current.filter(nft => nft.name.includes(searchQuery));
    setOnsaleNftList(newOnsaleNftList);
  }

  const onKeydownHandler = e => {
    e.key === 'Enter' && searchNfts();
  }

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
        <h1 style={{ padding: '10px 0 20px 0', borderBottom: '1px solid #cccccc' }}>MarketPlace</h1>
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
              {
                onsaleNftList.length < 1 ? (<div>판매중인 NFT가 없습니다.</div>) : (
                  <MarketWrap $grid={grid}>
                    {
                      onsaleNftList.map(onsaleNft => (
                        <OnsaleNftCard key={`marketplace-${onsaleNft.nftId}`} nft={onsaleNft} account={account} cardWidth={cardWidth} />
                      ))
                    }
                  </MarketWrap>
                )
              }
            </RightPart>
          </FlexWrap>
        </div>
      </Container>
    </Background>
  );
};

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

const MarketWrap = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$grid};
  gap: 10px;
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
//   }

// const searchNfts = async () => {
//   const options = {
//     method: "GET",
//     headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}` },
//   };
//   const metadataQuery = encodeURIComponent(
//     // `{"value":"${searchRef.current}&", "op":"iLike"}`
//     searchRef.current
//   );
//   fetch(
//     `https://api.pinata.cloud/data/pinList?metadata[name]=${metadataQuery}&metadata[keyvalues][isOnsale]=${encodedIsOnsale}&pageOffset=0`,
//     options
//   )
//     // fetch('https://api.pinata.cloud/data/pinList', options)
//     .then((response) => response.json())
//     .then((response) => {
//       const ipfsDatas = response.rows;
//       const newOnsaleNfts = [];
//       ipfsDatas.forEach(data => {
//         const name = data.metadata.name;
//         const metaData = data.metadata.keyvalues;
//         newOnsaleNfts.push({ ...metaData, name });
//       })
//       setOnsaleNftList(newOnsaleNfts);
//       console.log('newOnsaleNfts: ', newOnsaleNfts);
//     })
//     .catch((err) => console.error(err));
// };