import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
// import bgMain from './assets/images/bg-main.png';
import { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";

// import { MintContract } from "../contracts/index";
import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { S_Button } from "./styles/styledComponent";
import Cart from "./pages/commonComponents/Cart";
import MainSpinner from "./components/MainSpinner";
import { getTruncatedAccount } from "./hooks/common";
// import Slider from "./components/Slider";
// import { useRef } from "react";

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
  // const [lastScrollTop, setLastScrollTop] = useState(0);

  // const handleScroll = e => {
  //   const scrollPosition = e.currentTarget.scrollY;
  //   const $header = document.getElementById('header');
  //   if (scrollPosition > 100 && scrollPosition > lastScrollTop && $header.style.opacity !== 0) {
  //     $header.style.opacity = '0';
  //     $header.style.visibility = 'hidden';
  //   } else if (scrollPosition < lastScrollTop && $header.style.opacity !== '1') {
  //     $header.style.opacity = '1';
  //     $header.style.visibility = 'visible';
  //     $header.style.transition = 'opacity 1s ease-in-out, visibility 1s ease-in-out';
  //   }
  //   setLastScrollTop(scrollPosition);
  // };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [lastScrollTop]);

  /**
   * connectMetamask
   */
  const { account, setAccount } = useContext(GlobalContext);

  /**
   * onClick 지갑 연결
   */
  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();

      //show the first connected account in the react page
      setAccount(accounts[0]);
    } else {
      alert("Please download metamask");
    }
  }

  /**
   * 자동 metamast 지갑 확인
   */
  useEffect(() => {
    const refreshAccount = (account) => {
      if (account?.length > 0) {
        setAccount(account[0]);
      } else {
        // if length 0, user is disconnected
        // setAccount("연결된 계정이 없습니다");
        setAccount(null);
      }
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccount(accounts);
        window.ethereum.on("accountsChanged", refreshAccount);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccount);
    };
  }, [account]);


  // async function connectSaleNftOnMintContract() {
  //   await MintContract.methods.setSaleNft(SaleAddress).send({ from: account });
  // }

  // useEffect(() => {
  //   if (!account) return;
  //   connectSaleNftOnMintContract();
  // }, [account])

  // Cart 컴포넌트
  const [cartModal, setCartModal] = useState(false);
  const cartModalOpen = () => {
    setCartModal(true);
  }
  const cartModalClose = () => {
    setCartModal(false);
  }

  return (
    <>
      <MainSpinner />
      <Container>
        <Header id="header">
          <Navbar>
            <Link to={'/'}>
              <img src="vite.svg" alt="logo" />
            </Link>
            <Link to={'/market-place/nft'}>
              <Nav>Marketplace</Nav>
            </Link>
            <Link to={'/create'}>
              <Nav>Create</Nav>
            </Link>
          </Navbar>
          {!account ? (
            <ButtonWrap>
              <S_Button onClick={connectMetamask}>Connect Wallet</S_Button>
            </ButtonWrap>) : (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
              <div style={{ fontSize: '11px' }}>{getTruncatedAccount(account)}</div>
              <Link to={`/mypage/${account}`}>
                <Nav>MyPage</Nav>
              </Link>
              <div>|</div>
              <CartWrap onClick={cartModalOpen}>Cart</CartWrap>
            </div>
          )
          }
          <Menubar>
            ☰
          </Menubar>
          {/* Cart Component */}
          {cartModal && <Cart cartModalClose={cartModalClose} />}
        </Header>
        {/* path에 따라 Outlet 만 변하고 Nav와 Footer은 고정 */}
        <ContainerHome>
          {/* <Background> */}
          {/* path에 따라 Outlet 만 변하고 Nav와 Footer은 고정 */}
          <Outlet />
          {/* </Background> */}
        </ContainerHome>
        <Footer>
          Footer 영역입니다
        </Footer>
      </Container>
    </>
  );
}

const CartWrap = styled.div`
  cursor: pointer;
`;

const ContainerHome = styled.div`
  width: 100%;
  /* height: 100%; */
`;
// const Background = styled.div`
//   /* height: 100%; */
//   padding-top: 100px;
//   width: 100%;
//   background-image: url(${bgMain});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// `;

const Container = styled.div`
  /* position: relative; */
  /* width: 100vw; */
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  height: 72px;
  width: 100vw;
  z-index: 998;
  /* margin-top: 100px; */
  padding: 0 50px 0 2rem;
  /* background-color: rgba(0, 0, 0, 0.7); */
  background-color: #ffffff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Menubar = styled.div`
  display: none;
  font-size: 36px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: block;
  }
`;
const ButtonWrap = styled.div`
  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
    gap: 30px;
  }
`;

const Nav = styled.div`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    font-size: 13px;
  }
`;

const Footer = styled.div`
  height: 100px;
  background-color: ${({ theme }) => theme.color.bg.mainColor};
`;

export default App;
