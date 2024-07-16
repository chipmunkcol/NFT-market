import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalContext } from "../context/GlobalContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { Confirm, toastSwal } from "../hooks/swal";
import Profile from "../pages/commonComponents/Profile";
import Cart from "../pages/commonComponents/Cart";
import Menubar from "../pages/commonComponents/Menubar";
import { S_Button } from "../styles/styledComponent";
import { getTruncatedAccount } from "../hooks/common";
import iconProfile from "../assets/images/icon-profile-bk.png";
import iconCart from "../assets/images/icon-cart.png";
import iconProfileWh from "../assets/images/icon-profile-wh.png";
import iconCartWh from "../assets/images/icon-cart-wh.png";

export default function Header() {

  const { account, setAccount, setSigner } = useContext(GlobalContext);
  const [balance, setBalance] = useState(0);
  const location = useLocation();
  console.log('location: ', location);
  const navigate = useNavigate();

  const [headerTheme, setHeaderTheme] = useState('light');
  const myFunctionTimerRef = useRef(null);

  useEffect(() => {
    if (location.pathname === '/') {
      setHeaderTheme('dark');
      window.addEventListener('scroll', handleScroll);
    } else {
      setHeaderTheme('light');
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition === 0) {
      setHeaderTheme('dark');
    } else {
      setHeaderTheme('light');
    }

    if (myFunctionTimerRef.current) {
      clearTimeout(myFunctionTimerRef.current);
    }
    myFunctionTimerRef.current = setTimeout(() => {
      console.log('scroll');
    }, 100);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

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
  async function setterAccountAndBalance(web3, accounts) {
    setAccount(accounts);
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(balance);
  }


  async function connectMetamask() {
    //check metamask is installed
    if (window.ethereum) {
      // instantiate Web3 with the injected provider
      const web3 = new Web3(window.ethereum);

      //request user to connect accounts (Metamask will prompt)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      //get the connected accounts
      const accounts = await web3.eth.getAccounts();
      setterAccountAndBalance(web3, accounts[0]);

      // signer
      setterSinger();
    } else {
      const res = await Confirm("메타마스크 지갑이 필요합니다", "지갑을 다운로드 하시겠습니까?");
      if (!res.isConfirmed) return;
      const isMobile = /Mobi/i.test(window.navigator.userAgent);
      if (isMobile) {
        window.open("https://metamask.app.link/dapp/nft-market-m271.vercel.app/", "_blank");
      } else {
        window.open("https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko", "_blank");
      }

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

  // Profile 컴포넌트 (mypage & faucet)
  const [profileModal, setProfileModal] = useState(false);
  const profileModalOpen = () => {
    setProfileModal(true);
  }
  const profileModalClose = () => {
    setProfileModal(false);
  }

  // 메뉴바 드롭다운
  const [menubar, setMenubar] = useState(false);
  const menubarToggle = () => {
    setMenubar(prev => !prev);
  }
  const menubarClose = () => {
    setMenubar(false);
  }
  return (
    <>
      <Container id="header" $headertheme={headerTheme}>
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
          <Link to={'/market-place/nft'} id="nav-marketplace">
            <Nav>Marketplace</Nav>
          </Link>
          <Link to={'/create'} id="nav-create">
            <Nav>Create</Nav>
          </Link>
        </Navbar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {account && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', fontSize: '13px' }}>
                <MyAccount onClick={copyHandler}>{getTruncatedAccount(account)}</MyAccount>
                <div>ETH {balance}</div>
              </div>
              {/* <Link to={`/mypage/${account}`}> */}
              <ProfileWrap onClick={profileModalOpen}>
                <IconWrap>
                  {/* <img id="profile" src={headerTheme === 'dark' ? iconProfileWh : iconProfile} /> */}
                  <div id="profile" $headertheme={headerTheme} />
                </IconWrap>
              </ProfileWrap>
              {/* </Link> */}
              <CartWrap onClick={cartModalOpen}>
                <IconWrap>
                  {/* <img id="cart" src={headerTheme === 'dark' ? iconCart : iconCartWh} /> */}
                  <div id="cart" $headertheme={headerTheme} />
                </IconWrap>
              </CartWrap>
            </div>)
          }
          {/* Profile Component */}
          {profileModal && <Profile profileModalClose={profileModalClose} />}
          {/* Cart Component */}
          {cartModal && <Cart cartModalClose={cartModalClose} />}
          {!account && (
            <ButtonWrap>
              <S_Button onClick={connectMetamask}><span>Connect</span> Wallet</S_Button>
            </ButtonWrap>)}
          <MenubarBtn onClick={menubarToggle}>
            ☰
          </MenubarBtn>
        </div>
      </Container>
      {/* Menubar Component */}
      {menubar && <Menubar menubarClose={menubarClose} cartModalOpen={cartModalOpen} connectMetamask={connectMetamask} headerTheme={headerTheme} />}
    </>
  )
}

export const MainIconWrap = styled.div`
    width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  height: 72px;
  width: 100%;
  z-index: 998;
  padding: 0 2rem 0 2rem;
  background-color: ${props => props.$headertheme === 'dark' ? '#161618' : '#ffffff'};
  color: ${props => props.$headertheme === 'dark' ? '#f0f0f1' : '#161618'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
  padding: 0 1rem 0 1rem;
  }
`;
export const CartWrap = styled.div`
  cursor: pointer;
  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;
export const ProfileWrap = styled.div`
  cursor: pointer;
  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

export const IconWrap = styled.div`
  border-radius: 12px;
    padding: 0px 12px;
    position: relative;
    height: 48px;
    min-width: 48px;
    border-color: transparent;
    background-color: rgba(18, 18, 18, 0.04);
    ${props => props.theme.variables.flex};
  #profile {
    width: 25px;
    height: 25px;
    background-image: ${props => props.children.props.$headertheme === 'dark' ? `url(${iconProfileWh})` : `url(${iconProfile})`};
    background-position: center;
    background-size: cover;
    transition: background-image 0.2s ease-in-out;
  }
  #cart {
    width: 25px;
    height: 25px;
    /* background-image: ${props => props.children.props.$headertheme === 'dark' ? `url(${iconCartWh})` : `url(${iconCart})`}; */
    background-image: url(${props => props.children.props.$headertheme === 'light' ? iconCart : iconCartWh});
    background-position: center;
    background-size: cover;
    transition: background-image 0.2s ease-in-out;
  }
`;

export const MyAccount = styled.div`
  /* font-size: 11px; */
  cursor: pointer;
`;

export const MenubarBtn = styled.div`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: block;
  }
`;

export const ButtonWrap = styled.div`
  span {
    display: contents;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    span {
      display: none;
    }
  }
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  
  #nav-marketplace {
    @media (max-width: ${({ theme }) => theme.size.mobile}) {
      display: none;
      gap: 30px;
    }
  }
  #nav-create {
    @media (max-width: ${({ theme }) => theme.size.mobile}) {
      display: none;
      gap: 30px;
    }
  }
`;

export const Nav = styled.div`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    font-size: 13px;
  }
`;


