import styled from "styled-components"

import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { S_Button } from "../../styles/styledComponent";
import * as Styled from "../../components/Header"

export default function Menubar({ menubarClose, cartModalOpen, connectMetamask, headerTheme }) {
  const { account, setAccount, setSigner } = useContext(GlobalContext);


  function removeAccount() {
    setAccount(null);
    setSigner(null);
  }

  async function revokeMetamaskHandler() {
    await window.ethereum.request({
      "method": "wallet_revokePermissions",
      "params": [
        {
          "eth_accounts": {}
        }
      ]
    });
    removeAccount();
  }

  function logoutController() {
    revokeMetamaskHandler();
    profileModalClose();
  }

  return (
    <Container $headertheme={headerTheme}>
      <Header>
        <div>
          <Link to={'/'} onClick={menubarClose}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Styled.MainIconWrap>
                <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="logo"></img>
              </Styled.MainIconWrap>
              <div style={{ fontSize: '21px', fontWeight: '900' }}>
                NFT Sea
              </div>
            </div>
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {
            !account &&
            <Styled.ButtonWrap>
              <S_Button onClick={connectMetamask}>Wallet</S_Button>
            </Styled.ButtonWrap>
          }
          <CloseBtn onClick={menubarClose} >X</CloseBtn>
        </div>
      </Header>
      {/* 원래 header 부분 */}
      <Dropdown>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to={'/'} onClick={menubarClose}><li>Home</li></Link>
          <Link to={'/market-place/nft'} onClick={menubarClose}><li>Marketplace</li></Link>
          <Link to={'/create'} onClick={menubarClose}><li>Create</li></Link>
          {
            account &&
            <>
              <Link to={`/mypage/${account}`} onClick={menubarClose}><li>Mypage</li></Link>
              <li onClick={() => { cartModalOpen(); menubarClose() }}>Cart</li>
              <Link target="\_blank" to={'https://cloud.google.com/application/web3/faucet/ethereum/sepolia'} onClick={menubarClose} >
                <li>
                  Faucet
                </li>
              </Link>
              <li onClick={logoutController}>Logout</li>
            </>
          }
        </ul>
      </Dropdown>
    </Container>
  )
}

const ButtonWrap = styled.div`
span {
    display: block;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    span {
      display: none;
    }
  }
`;
const CloseBtn = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const Header = styled.div`
justify-content: space-between;
    height: 72px;
    display: flex;
    align-items: center;
`;

const Container = styled.div`
position: fixed;
  top: 0;
  /* height: 72px; */
  width: 100vw;
  z-index: 998;
  /* margin-top: 100px; */
  padding: 0 50px 1rem 1rem;
  /* background-color: rgba(67, 46, 46, 0.7); */
  background-color: ${props => props.$headertheme === 'dark' ? '#161618' : '#ffffff'};
  color: ${props => props.$headertheme === 'dark' ? '#f0f0f1' : '#161618'};
  display: flex;
  flex-direction: column;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
`;
const Dropdown = styled.div`
  /* transition: all 0.3s; */
  li {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 10px;
    border-bottom: 1px solid gray;
    text-align: center;
    cursor: pointer;
    &:hover {
      color: rgba(32, 129, 226, 1);
    }
  }
`;


const MainIconWrap = styled.div`
    width: 40px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
`;