import styled from "styled-components";
import Cart from "./Cart";
import Purchase from "./Purchase";
import { JsonRpcSigner } from "ethers";
// import { NftMetadata } from "../../../type";

// interface PurchaseAndCartProps {
//   addCartController: (metadata: NftMetadata, account: string) => Promise<void>;
//   purchaseController: (
//     nftId: number,
//     tokenUrl: string,
//     nftPrice: number,
//     signer: JsonRpcSigner,
//     account: string
//   ) => Promise<void>;
// }

const PurchaseAndCart = () => {

  return (
    <Container>
      <Purchase />
      <Cart />
    </Container>
  );
};

export default PurchaseAndCart;

export const Container = styled.div`
  width: 300px;
  height: 45px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  color: white;
`;
