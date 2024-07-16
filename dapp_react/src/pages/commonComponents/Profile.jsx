import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/GlobalContext";


export default function Profile({ profileModalClose }) {
  const { account, setAccount, setSigner } = useContext(GlobalContext);

  const stopPropagation = e => {
    e.stopPropagation();
  }


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
    <Overlay onClick={profileModalClose}>
      <Container onClick={stopPropagation}>
        <NavBtn>
          <Link to={`/mypage/${account}`} onClick={profileModalClose}>
            Mypage
          </Link>
        </NavBtn>
        <NavBtn style={{ borderRadius: '0 0 0 0' }}>
          <Link target="\_blank" to={'https://cloud.google.com/application/web3/faucet/ethereum/sepolia'} onClick={profileModalClose}>
            Faucet
          </Link>
        </NavBtn>
        <NavBtn style={{ borderRadius: '0 0 10px 10px' }} onClick={logoutController}>
          Logout
        </NavBtn>
      </Container>
    </Overlay>
  );
}

const NavBtn = styled.div`
    height: 30px;
    background-color: #f6f6f6;
    border-radius: 10px 10px 0 0;;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    &:hover {
        background-color: #e9e9e9;
    }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const Container = styled.div`
    width: 100px;
    z-index: 150;
    position: absolute;
    top: 65px;
    right: calc(2rem + 10px);
    border-radius: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    background-color: #ffffff;
    color: #121212;
    justify-content: center;
    overflow: hidden;
    
    /* padding: 2px; */
    display: flex;
    flex-direction: column;
    gap: 2px;
`;