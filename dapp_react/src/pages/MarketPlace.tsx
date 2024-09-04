import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import iconFind from "../assets/images/icon-find.svg";
import iconFind from "../assets/images/icon-find.png";
import iconGrid4 from "../assets/images/icon-grid4.png";
import iconGrid9 from "../assets/images/icon-grid9.png";
import iconList from "../assets/images/icon-list.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { commingSoon } from "../hooks/common";

const MarketPlace = () => {
  const navigate = useNavigate();
  const searchRef = useRef("");
  const location = useLocation();
  const isNftPath = location.pathname.includes("nft");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchRef.current = e.target.value;
  };

  const localStorageGrid = Number(localStorage.getItem("grid"));
  const [grid, setGrid] = useState(localStorageGrid ? localStorageGrid : 5);
  const [gridCss, setGridCss] = useState({
    grid,
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px", // '5px',
    cardWidth: "193px", // '123px',
    fontSize: "14px", // '12px',
  });
  const grid5Hander = () => {
    localStorage.setItem("grid", "5");
    setGrid(5);
  };
  // const grid7Hander = () => {
  //   localStorage.setItem('grid', '8');
  //   setGrid(8);
  // }

  useEffect(() => {
    setGridCss({
      grid,
      gridTemplateColumns: `repeat(${grid}, 1fr)`,
      gap: grid === 5 ? "10px" : "5px",
      cardWidth: grid === 5 ? "193px" : "123px",
      fontSize: grid === 5 ? "14px" : "12px",
    });
  }, [grid]);

  const searchNfts = async () => {
    if (searchRef.current === "" && isNftPath) {
      navigate("/market-place/nft");
    } else if (searchRef.current === "" && !isNftPath) {
      navigate("/market-place/collection");
    } else if (isNftPath) {
      navigate(`/market-place/nft?query=${searchRef.current}`);
    } else {
      navigate(`/market-place/collection?query=${searchRef.current}`);
    }
  };

  const onKeydownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && searchNfts();
  };

  const categoryHandler = (e: any) => {
    // const _category = e.currentTarget?.innerHTML;
    // if (!_category) return;
    // const category = _category.split(" ").join("");
    const category = e.currentTarget?.innerHTML;
    navigate(`?category=${category}`);
  };

  const collectionCategoryHandler = (e: any) => {
    // const _category = e.currentTarget?.innerHTML;
    // if (!_category) return;
    // const category = _category.split(" ").join("");
    const category = e.currentTarget?.innerHTML;
    navigate(`/market-place/collection?query=${category}`);
  };

  // nft 갯수
  const [count, setCount] = useState(0);

  // 카테고리 숨기기
  // const [categoryHidden, setCategoryHidden] = useState(false);
  // const toggleCategoryHidden = () => {
  //   setCategoryHidden(prev => !prev);
  // }

  return (
    <Background>
      <Container>
        <FixArea>
          <TitleBox>
            <h1>MarketPlace</h1>
            <div>
              <Link to={"nft"}>
                <NavMain style={{ color: isNftPath ? "#007bff" : "black" }}>
                  NFT
                </NavMain>
              </Link>
            </div>
            <div>
              <Link to={"collection"}>
                <NavMain style={{ color: !isNftPath ? "#007bff" : "black" }}>
                  COLLECTION
                </NavMain>
              </Link>
            </div>
          </TitleBox>
          <div style={{ padding: "10px 0" }}>
            <FlexWrap>
              <NftCount>결과 {count}개</NftCount>
              <InputWrap>
                <Input
                  type="text"
                  placeholder="이름 또는 태그로 검색"
                  onChange={onChangeSearch}
                  onKeyDown={onKeydownHandler}
                />
                <IconWrap onClick={searchNfts}>
                  {/* <IconFind /> */}
                  <FindImg>
                    <img src={iconFind} alt="find-icon" />
                  </FindImg>
                </IconWrap>
              </InputWrap>
              <SelectBox>
                <Select onClick={commingSoon}>
                  <option value="updated">최신순</option>
                  <option value="row">낮은 가격순</option>
                  <option value="high">높은 가격순</option>
                </Select>
              </SelectBox>
              <IconContainer>
                <IconBox
                  style={{
                    borderTopLeftRadius: "0.75rem",
                    borderBottomLeftRadius: "0.75rem",
                  }}
                >
                  <IconList onClick={commingSoon} $iconPath={iconList} />
                </IconBox>
                <IconBox onClick={grid5Hander}>
                  <IconList $iconPath={iconGrid4} />
                </IconBox>
                <IconBox
                  onClick={commingSoon}
                  style={{
                    borderTopRightRadius: "0.75rem",
                    borderBottomRightRadius: "0.75rem",
                  }}
                >
                  <IconList $iconPath={iconGrid9} />
                </IconBox>
              </IconContainer>
            </FlexWrap>
          </div>
        </FixArea>
        <div style={{ paddingTop: "130px" }}>
          <MainBox>
            <LeftPart>
              <CategoryBox>
                <div>
                  <ul>
                    <h3>카테고리</h3>
                    {[
                      "예술",
                      "유명인",
                      "게임",
                      "음악",
                      "가상자산",
                      "프로필 사진",
                    ].map((category) => (
                      <li key={`category-${category}`}>
                        <NavButton onClick={categoryHandler}>
                          {category}
                        </NavButton>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul>
                    <h3>컬렉션</h3>
                    {["pudge penguin", "fake funks"].map((collection) => (
                      <li key={`category-collection-${collection}`}>
                        <NavButton onClick={collectionCategoryHandler}>
                          {collection}
                        </NavButton>
                      </li>
                    ))}
                  </ul>
                </div>
              </CategoryBox>
            </LeftPart>
            <RightPart>
              <Outlet context={[gridCss, setCount]} />
            </RightPart>
          </MainBox>
        </div>
      </Container>
    </Background>
  );
};

const FindImg = styled.div`
  width: 24px;
  height: 24px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SelectBox = styled.div`
  width: 240px;
  height: 48px;
  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

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
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    min-width: 100px;
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

const TitleBox = styled.div`
  /* div style={{ display: 'flex', alignItems: 'end', gap: '50px', padding: '10px 0 20px 0', borderBottom: '1px solid #cccccc' }} */
  display: flex;
  align-items: end;
  gap: 50px;
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #cccccc;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    gap: 20px;
  }
`;

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 92%;
    h1 {
      font-size: 24px;
    }
  }
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
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

const InputWrap = styled.div`
  /* style={{ position: 'relative', width: '400px', height: '48px' }} */
  position: relative;
  height: 48px;
  width: 400px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 68%;
  }
`;

const IconWrap = styled.div`
  position: absolute;
  top: 25%;
  left: 0.75rem;
  cursor: pointer;
`;
// const IconFind = styled(iconFind)`
//   width: 24px;
//   height: 24px;
// `;
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

const IconList = styled.div<{ $iconPath: string }>`
  background-image: url(${(props) => props.$iconPath && props.$iconPath});
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

const NftCount = styled.div`
  width: 77px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    font-size: 14px;
  }
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* @media (max-width: ${({ theme }) => theme.size.mobile}) {
    justify-content: normal;
  } */
`;

const MainBox = styled.div`
  display: flex;
  gap: 20px;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
`;

const LeftPart = styled.div`
  /* width: 16%; */
  width: 175px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: auto;
  }
`;
const RightPart = styled.div`
  /* width: 84%; */
  /* padding-left: 1rem; */
  text-align: center;
  width: calc(100% - 175px);
  padding-bottom: 1rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: black;

  padding: 0rem 2rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 0rem 1rem;
  }
`;

export default MarketPlace;
