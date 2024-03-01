/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
// import detectEthereumProvider from "@metamask/detect-provider";
import { Web3 } from "web3";
import { MintContract } from "../../contracts/index";
import NftCard from "../components/NftCard";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import bgMain from '../assets/images/bg-main.png';

// Detect the MetaMask Ethereum provider

function Home() {
  //state to store and show the connected account
  // const [account, setAccount] =
  //   useState("연결된 계정이 없습니다");
  const { account, setAccount } = useContext(GlobalContext);
  const [nftType, setNftType] = useState(null);

  const onClickMint = async () => {
    try {
      const result = await MintContract.methods
        .mintAnimalToken().send({ from: account });

      console.log('result: ', result);
      if (result.status) {
        const balanceLenth = await MintContract.methods.balanceOf(account).call();

        const nftId = await MintContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLenth, 10) - 1).call();

        const nftType = await MintContract.methods.nftTypes(nftId).call();

        setNftType(parseInt(nftType, 10));
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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

  return (
    <></>
  );
}
const Container = styled.div`
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
export default Home;
{/* Button to trigger Metamask connection */ }
{/* <button onClick={() => connectMetamask()}>Connect to Metamask</button> */ }

{/* Display the connected account */ }
{/* <h2>{account}</h2>
      <button onClick={onClickMint}>Mint 버튼</button>
      {nftType && <NftCard nftType={nftType} />} */}