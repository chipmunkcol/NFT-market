import styled, { keyframes } from "styled-components";
import { SkeletonLoader } from "../../hooks/LazyloadComponent";
import OnsaleNftCard from "../../components/skeletonUI/OnsaleNftCard";

const Marketplace = () => {
  const dummyList = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <Container>
      {
        dummyList.map((item, index) => (
          <OnsaleNftCard key={`skeleton-Marketplace-${index}`} />
        ))}
    </Container>
  )
}

export default Marketplace;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;