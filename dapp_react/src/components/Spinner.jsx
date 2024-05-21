import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Spinner = ({ _custom }) => {
  const [custom, setCustom] = useState({
    color: '#3498db',
    size: '20px',
    height: '210px'
  })

  useEffect(() => {
    if (_custom) {
      setCustom(_custom)
    }
  }, [])

  return (
    <Container $custom={custom}>
      <Main $custom={custom} />
    </Container>
  )
}

export default Spinner;

const Container = styled.div`
  ${props => props.theme.variables.flex}
  width: 100%;
  height: ${props => props.$custom.height};
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Main = styled.div`
border: 3px solid #f3f3f3; /* Light grey */
    border-top: 3px solid ${props => props.$custom.color}; /* Blue */
    border-radius: 50%;
    width: ${props => props.$custom.size};
    height: ${props => props.$custom.size};
    animation: ${spin} 1s linear infinite;
    /* margin-right: 10px; */
`;