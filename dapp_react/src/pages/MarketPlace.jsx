import React, { useContext, useEffect, useRef, useState } from "react";
// import { MintContract, web3 } from "../../contracts/index";
import styled from "styled-components";
import { SaleNftContract } from "../../contracts/index"
import OnsaleNftCard from "../components/OnsaleNftCard";
import { GlobalContext } from "../context/GlobalContext";
// import { S_Button, S_Wallet_Button } from "../styles/styledComponent";
import bgMain from '../assets/images/bg-main.png';
import { ReactComponent as iconFind } from '../assets/images/icon-find.svg';
import iconGrid4 from '../assets/images/icon-grid4.png';
import iconGrid9 from '../assets/images/icon-grid9.png';
import iconList from '../assets/images/icon-list.png';
// import { useNavigate, useHref, useMatch, useParams, useSearchParams } from 'react-router-dom'
// import { useInView } from 'react-intersection-observer';

// const dummyData = [{ name: '111', price: 3, isOnsale: true }, { name: '222', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }, { name: 'test', price: 3, isOnsale: true }];
const MarketPlace = () => {
  const { onsaleNftList, setOnsaleNftList, account, onsaleTrigger, purchaseTrigger } = useContext(GlobalContext);
  const getAllonsaleNftListRef = useRef(null);
  // const getPartOnsaleNftListRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const allNftCount = useRef(0);

  const [onsaleNftIdsInContract, setOnsaleNftIdsInContract] = useState([]);

  // let offset = 1;

  // const { ref, inView, entr } = useInView({
  //   threshold: 0,
  // })
  const searchRef = useRef('');
  const encodedOffset = encodeURIComponent(
    offset
  );

  const encodedSearchQuery = encodeURIComponent(
    // `{"value":"${searchRef.current}&", "op":"iLike"}`
    searchRef.current
  );


  useEffect(() => {
    async function fetchOnsaleNftIdsInContract() {
      const _onsaleNftIdsInContract = await SaleNftContract.methods.getOnsaleNfts().call();
      const onsaleIds = _onsaleNftIdsInContract.map(onsaleNft => parseInt(onsaleNft.nftId));
      setOnsaleNftIdsInContract(onsaleIds);
    }
    fetchOnsaleNftIdsInContract();
  }, [onsaleTrigger]);

  const getNewOnsaleNfts = ipfsNftsList => {
    const newOnsaleNfts = [];
    ipfsNftsList.forEach(data => {
      const nftName = data.metadata.name;
      const tokenUrl = data.ipfs_pin_hash;
      const metaData = data.metadata.keyvalues;
      newOnsaleNfts.push({ ...metaData, nftName, tokenUrl });
    })
    return newOnsaleNfts;
  }

  const checkContractNftsToIpfsNfts = (onsaleNftIdsInContract, onsaleNftsInIpfs) => {
    const commonNfts = onsaleNftsInIpfs.filter(ipfsNft => onsaleNftIdsInContract.some(contractNftId => contractNftId === ipfsNft.nftId));
    return commonNfts
  }

  function getOnsaleNftList() {
    const options = {
      method: "GET",
      headers: { Authorization: `Bearer ${import.meta.env.VITE_IPFS_JWT}` },
    };

    if (searchRef.current) {
      fetch(`https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&metadata[name]=${encodedSearchQuery}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"}}`)
        .then((response) => response.json())
        .then((response) => {
          const ipfsDatas = response.rows;
          // allNftCount.current = response.count;
          const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
          const commonNfts = checkContractNftsToIpfsNfts(onsaleNftIdsInContract, newOnsaleNfts)
          setOnsaleNftList(commonNfts);
          console.log('newOnsaleNfts: ', newOnsaleNfts);
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`https://api.pinata.cloud/data/pinList?pageOffset=${encodedOffset}&metadata[keyvalues]={"isOnsale":{"value":"true","op":"eq"}}`, options)
        .then((response) => response.json())
        .then((response) => {
          const ipfsDatas = response.rows;
          // allNftCount.current = response.count;
          const newOnsaleNfts = getNewOnsaleNfts(ipfsDatas);
          const commonNfts = checkContractNftsToIpfsNfts(onsaleNftIdsInContract, newOnsaleNfts)

          setOnsaleNftList(prev => [...prev, ...commonNfts]);
          console.log('newOnsaleNfts: ', newOnsaleNfts);
        })
        .catch((err) => console.error(err));
    }
  }

  useEffect(() => {
    if (allNftCount.current !== 0 && allNftCount.current - 10 <= offset * 10) return;
    // if (onsaleNftList.length - 10 <= offset * 10) return;
    if (onsaleNftIdsInContract.length < 1) return;

    getOnsaleNftList();
  }, [onsaleNftIdsInContract, offset, onsaleTrigger, purchaseTrigger]);

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

  // search 구현
  // const navigate = useNavigate();

  const searchNfts = async () => {
    setOffset(0);
  };

  const onKeydownHandler = e => {
    e.key === 'Enter' && searchNfts();
  }

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

  // 무한스크롤 구현
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  // const { a } = useParams();
  // const [searchParams] = useSearchParams();
  // const quereyParam = searchParams.get('query');
  // console.log('quereyParam: ', quereyParam);
  // console.log('a: ', a);

  const infiniteScrollHandler = () => {
    setIsLoading(true);
    setOffset(prev => prev + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entryies) => {
      if (entryies[0].isIntersecting && !isLoading && getAllonsaleNftListRef.current?.length > 0) {
        infiniteScrollHandler();
      }
    }, { threshold: 1 });

    observerRef.current = observer;
    observer.observe(document.querySelector('#observer-target'));

    return () => observer.disconnect();
  }, [isLoading]);

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
              <div id="observer-target" style={{ width: '100%', height: '100px', backgroundColor: 'red' }}></div>
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