import styled from "styled-components";

export const S_Button = styled.button`
  background-color: tomato;
  border-radius: 8px;
  height: 48px;
  padding: 12px 18px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: rgba(255, 99, 71, 0.8);
  }
`;

export const S_Wallet_Button = styled(S_Button)`
  background-color: ${(props) => (props.$account ? "tomato" : "gray")};
  color: ${(props) => !props.$account && "black"};
`;
