import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";

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

  return (
    <>
      <Header>
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
          <button >Connect Wallet</button>
        </div>
      </Header>
      <Outlet />
    </>
  );
}

const Header = styled.div`
  height: 100px;
  padding: 0 10px;
  background-color: #d4d19d;
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

export default App;
