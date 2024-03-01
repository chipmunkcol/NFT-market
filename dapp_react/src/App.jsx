import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import bgMain from './assets/images/bg-main.png';

// Detect the MetaMask Ethereum provider

function App() {

  // const updateWallet = async (accounts: any) => {
  //   setWallet({ accounts })
  // }

  // const handleConnect = async () => {
  //   let accounts = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   })
  //   updateWallet(accounts)
  // }
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = e => {
    const scrollPosition = e.currentTarget.scrollY;
    const $header = document.getElementById('header');
    if (scrollPosition > lastScrollTop && $header.style.opacity !== 0) {
      $header.style.opacity = '0';
      $header.style.visibility = 'hidden';
    } else if (scrollPosition < lastScrollTop && $header.style.opacity !== '1') {
      $header.style.opacity = '1';
      $header.style.visibility = 'visible';
      $header.style.transition = 'opacity 2s ease-in-out, visibility 2s ease-in-out';
    }
    setLastScrollTop(scrollPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <Container>
      <Header id="header">
        <Logo>
          <Link to={'/'}>
            <img src="vite.svg" alt="logo" />
          </Link>
        </Logo>
        <Navbar>
          <Link to={'/'}>
            <Nav>Home</Nav>
          </Link>
          <Link to={'/market_place'}>
            <Nav>Marketplace</Nav>
          </Link>
          <Link to={'/mypage'}>
            <Nav>MyPage</Nav>
          </Link>
        </Navbar>
        <div>
          <button style={{ color: '#F6F9F0' }}>Connect Wallet</button>
        </div>
      </Header>
      {/* path에 따라 Outlet 만 변하고 Nav와 Footer은 고정 */}
      <ContainerHome>
        <Background>

          <div>
            <h1>NFT 구매부터 판매, 전시까지</h1>
            <h3>인기 크리에이터와 각종 브랜드 NFT를 다양하게 만나보세요</h3>
            <h4>Logo 만의 오리지널 NFT 민팅</h4>
            <div>
              <button>마켓플레이스 보기</button>
              <button>NFT 민팅하기</button>
            </div>
          </div>
          <Slider>
            Slider 캐러셀 영역
          </Slider>
          <div>
            <h1>인기 크리에이터</h1>
            {
              <ul style={{ display: 'flex', gap: '10px' }}>
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
            <h1>인기 NFT</h1>
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
        </Background>
      </ContainerHome>
      <Outlet />
      {/* path에 따라 Outlet 만 변하고 Nav와 Footer은 고정 */}
      <Footer>
        Footer 영역입니다
      </Footer>
    </Container>
  );
}

const ContainerHome = styled.div`
  width: 100%;
  height: 100%;
`;
const Background = styled.div`
  height: 100%;
  padding-top: 100px;
  background-image: url(${bgMain});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const Slider = styled.div`
  height: 300px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  /* position: relative; */
`;

const Header = styled.div`
  position: fixed;
  height: 100px;
  width: 100%;
  z-index: 999;
  /* margin-top: 100px; */
  padding: 0 10px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Navbar = styled.div`
  display: flex;
  gap: 100px;
`;

const Nav = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const Logo = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Footer = styled.div`
  height: 100px;
  background-color: ${({ theme }) => theme.color.bg.mainColor};
`;

export default App;
