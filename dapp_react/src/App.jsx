import styled from "styled-components";
import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
// import bgMain from './assets/images/bg-main.png';
import { GlobalContext } from "./context/GlobalContext";
import { useContext } from "react";

// import { MintContract } from "../contracts/index";
import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { ethers } from 'ethers';
import { S_Button } from "./styles/styledComponent";
import Cart from "./pages/commonComponents/Cart";
import MainSpinner from "./components/MainSpinner";
import { getTruncatedAccount } from "./hooks/common";
import Footer from "./components/Footer";
import Swal from "sweetalert2";

import iconProfile from "./assets/images/icon-profile-bk.png";
import iconCart from "./assets/images/icon-cart.png";
import iconProfileWh from "./assets/images/icon-profile-wh.png";
import iconCartWh from "./assets/images/icon-cart-wh.png";
import { toastSwal } from "./hooks/swal";
import ScrollToTop from "./components/ScrollToTop";
import { MintAddress, MintContract, web3 } from "../contracts";
// import { ReactComponent as opensea } from "./assets/images/opensea-symbol.svg"

// import Slider from "./components/Slider";
// import { useRef } from "react";

// Detect the MetaMask Ethereum provider

function App() {

  const { account, setAccount, setSigner } = useContext(GlobalContext);
  const [balance, setBalance] = useState(0);
  const location = useLocation();
  // console.log('location: ', location);

  const [lastScrollTop, setLastScrollTop] = useState(0);

  const $header = document.getElementById('header');
  const changeheaderCss = (color, bgColor) => {
    const $header = document.getElementById('header');
    if (!$header) return;

    $header.style.color = color;
    $header.style.backgroundColor = bgColor;
    $header.style.transition = 'color 0.5s ease-in-out, background-color 0.5s ease-in-out';
  }

  const changePathOfProfileAndCart = (profileSrc, cartSrc) => {
    if (!account) return;
    const $profile = document.getElementById('profile');
    const $cart = document.getElementById('cart');
    if (!$profile || !$cart) return;

    $profile.src = profileSrc;
    $cart.src = cartSrc;
  }

  const handleScroll = e => {
    const scrollPosition = e.currentTarget.scrollY;

    if (scrollPosition === 0) {
      changeheaderCss('#f0f0f1', '#161618');
      changePathOfProfileAndCart(iconProfileWh, iconCartWh);
    } else if (scrollPosition !== 0 && $header?.style.backgroundColor === 'rgb(22, 22, 24)') {
      changeheaderCss('black', 'white');
      changePathOfProfileAndCart(iconProfile, iconCart);
    }
    setLastScrollTop(scrollPosition);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, location.pathname, account]);

  useEffect(() => {
    if (location.pathname === '/') {
      changeheaderCss('#f0f0f1', '#161618');
      changePathOfProfileAndCart(iconProfileWh, iconCartWh)
    } else if (location.pathname !== '/' && $header?.style.backgroundColor === 'rgb(22, 22, 24)') {
      changeheaderCss('black', 'white');
      changePathOfProfileAndCart(iconProfile, iconCart);
    }
  }, [location.pathname, account]);

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname])


  /**
   * singer injection
   */
  const setterSinger = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setSigner(signer);
  }

  /**
   * connectMetamask
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
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(balance);

      // signer
      setterSinger();
    } else {
      Swal.fire("Please download metamask");
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

        //signer
        if (account) {
          await setterSinger();
        }
        window.ethereum.on("accountsChanged", refreshAccount);
      }
    };

    getProvider();
    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccount);
    };
  }, [account]);

  useEffect(() => {
    async function fetchBalance() {
      if (!account) return;
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(account);
      const ethBalance = web3.utils.fromWei(balance, "ether");
      setBalance(Number(ethBalance).toFixed(2));
    }

    fetchBalance();

  }, [account]);


  // Cart 컴포넌트
  const [cartModal, setCartModal] = useState(false);
  const cartModalOpen = () => {
    setCartModal(true);
  }
  const cartModalClose = () => {
    setCartModal(false);
  }

  const copyHandler = async () => {
    await navigator.clipboard.writeText(account);
    toastSwal("Copied to clipboard");
  }

  return (
    <>
      {/* <ScrollToTop /> */}
      <ScrollRestoration />
      <MainSpinner />
      <Container>
        <Header id="header">
          <Navbar>
            <Link to={'/'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <MainIconWrap>
                  <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="logo"></img>
                </MainIconWrap>
                <div style={{ fontSize: '21px', fontWeight: '900' }}>
                  NFT Sea
                </div>
                <div style={{ height: '30px', borderRight: '1.4px solid #12121214', paddingLeft: '10px' }} />
              </div>
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', fontSize: '13px' }}>
                <MyAccount onClick={copyHandler}>{getTruncatedAccount(account)}</MyAccount>
                <div>ETH {balance}</div>
              </div>
              <Link to={`/mypage/${account}`}>
                <IconWrap>
                  <img id="profile" src={iconProfile} />
                </IconWrap>
              </Link>
              <CartWrap onClick={cartModalOpen}>
                <IconWrap>
                  <img id="cart" src={iconCart} />
                </IconWrap>
              </CartWrap>
            </div>)
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
        <Footer />
      </Container>
    </>
  );
}

const MainIconWrap = styled.div`
    width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;

// const OpenseaSvg = styled(opensea)`
//   width: 40px;
//   height: 40px;
// `;

const CartWrap = styled.div`
  cursor: pointer;
`;

const IconWrap = styled.div`
  border-radius: 12px;
    padding: 0px 12px;
    position: relative;
    height: 48px;
    min-width: 48px;
    border-color: transparent;
    background-color: rgba(18, 18, 18, 0.04);
    ${props => props.theme.variables.flex};
  img {
    width: 25px;
    height: 25px;
  }
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

const MyAccount = styled.div`
  /* font-size: 11px; */
  cursor: pointer;
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
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    font-size: 13px;
  }
`;

export default App;
