import styled from "styled-components";

export const NftInfo = styled.div`
  height: 64px;
  padding: 1rem;
`;
export const Name = styled.div`
  font-weight: bold;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;

export const Container = styled.div`
  position: relative;
  /* min-width: 193px; */
  width: 193px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  padding-bottom: 1rem;
  font-size: 14px;
  text-align: center;
`;

export const BgImg = styled.div`
  width: 100%;
  height: 100%;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
  /* object-fit: cover; */
  background-image: url(${(props) => props.$src});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease-in-out;
  /* background-size: 100%;
  &:hover {
    background-size: 110%;
  } */
`;

export const ImgWrap = styled.div`
  width: 193px;
  height: 200px;
  border-top-right-radius: 0.75rem;
  border-top-left-radius: 0.75rem;
`;
