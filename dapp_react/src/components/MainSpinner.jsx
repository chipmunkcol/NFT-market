import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import styled from "styled-components";
import SepliaSymbol from "../assets/images/sepolia-symbol.png"

const MainSpinner = () => {
  const { loadingState } = useContext(GlobalContext);
  const { isLoading, message } = loadingState;


  useEffect(() => {
    const $body = document.querySelector('body');
    $body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  if (isLoading) {
    return (
      <BgWrap>
        <SpinnerBox>
          <TitleBox>
            <h4>This app is powered by</h4>
            <Icon>
              <img src={SepliaSymbol} alt="seplia-symbol" />
            </Icon>
            <h3>SEPOLIA</h3>
          </TitleBox>
          <Spinner />
          <MessageBox>
            <FadeMessage style={{ fontSize: '18px' }}>Interacting with a smart contract...</FadeMessage>
            <NeonMessage>{message}, 잠시만 기다려주세요.</NeonMessage>
          </MessageBox>
        </SpinnerBox>
      </BgWrap>
    )
  }
}

export default MainSpinner;

const TitleBox = styled.div`
  ${props => props.theme.variables.flexColumn};
  gap: 10px;
  h4 {
    color: #cccccc;
    font-size: 14px;
    font-weight: 400;
  }
  h3 {
    color: #6c6c6c;
    font-size: 16px;
  }
  margin-bottom: 50px;
`;
const Icon = styled.div`
  width: 30px;
  height: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const BgWrap = styled.div`
  /* position: absolute; */
  position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: #00000066;
/* text-align: center; */
z-index: 999;

`;

/* .BgWrap.hide {
  display: none;
} */

const SpinnerBox = styled.div`
  position: relative;
  height: 100%;
  ${props => props.theme.variables.flexColumn};
  transform: translateY(-40px);
  gap: 20px;
`;

// .SpinnerBox.active {
//   transform: translate(0, -11 %);
// }



const Spinner = styled.div`
width: 70px;
height: 70px;
border: 5px solid #f3f3f3; /* Light grey */
border-top: 5px solid #383636; /* Black */
border-radius: 50%;
animation: spinner 0.7s linear infinite;
display: inline-block;
margin-bottom: 10px;
/* position: absolute; */

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;


// .spinner - progress {
//   font - size: 18px;
//   color: #f3f3f3;
//   transform: translateX(1px) translateY(1px);
//   position: absolute;
// }

const MessageBox = styled.div`
  /* position: relative; */
  /* top: 90px; */
  /* height: 55px; */
  ${props => props.theme.variables.flexColumn}
  gap: 10px;
`;

const Message = styled.div`
color: white;
  font-size: 14px;
`;
const FadeMessage = styled(Message)`
  /* margin-bottom: 15px; */
  animation: fadeEffect 5s infinite;

@keyframes fadeEffect {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
`;

const NeonMessage = styled(Message)`
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;

