import styled from "styled-components";

export const S_Button = styled.button`
  background-color: tomato;
  border-radius: 8px;
  height: 40px;
  padding: 0 13px;
`;

export const S_Wallet_Button = styled(S_Button)`
  background-color: ${(props) => (props.$account ? "tomato" : "gray")};
  color: ${(props) => (props.$account ? "white" : "black")};
`;
