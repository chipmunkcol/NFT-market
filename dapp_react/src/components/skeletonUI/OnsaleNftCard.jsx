import styled, { keyframes } from "styled-components";
import { SkeletonLoader } from "../../hooks/LazyloadComponent";

const OnsaleNftCard = () => {

  return (
    <Item>
      <div style={{ height: '193px' }}>
        <SkeletonLoader />
      </div>
    </Item>
  )
}

export default OnsaleNftCard;

const Item = styled.div`
  /* position: relative; */
  padding: 5px 5px 0 5px;
  width: 193px;
  height: 289px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  padding-bottom: 1rem;
  padding: 5px 5px 0 5px;
`;