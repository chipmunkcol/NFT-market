import { Link } from "react-router-dom";
import styled from "styled-components";
import openseaSymbol from "../assets/images/opensea-symbol.svg?react";
import imageSymbol from "../assets/images/image-symbol.svg?react";
import gridSymbol from "../assets/images/grid4-symbol.svg?react";
import Slider from "./Create/Slider";
import { useEffect } from "react";

function Create() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Background>
      <Container>
        <div style={{ display: "flex" }}>
          <NavPart>
            <TitlwBox>
              <TitleWrap>
                <div>
                  <OpenseaSymbol />
                </div>
                <h1>Create</h1>
              </TitleWrap>
            </TitlwBox>
            <div style={{ width: "100%" }}>
              {/* <Link to={'collection'}> */}
              <Link to={"/create-collection/step-1"}>
                <CollectionBox>
                  <div style={{ display: "flex" }}>
                    <CollectionWrap>
                      <CollectionTitle>
                        <div>
                          <GridSymbol />
                        </div>
                        <h2>Collection 드롭</h2>
                      </CollectionTitle>
                      <p>컬렉션을 생성하고 지갑에 직접 NFT를 mint하세요.</p>
                    </CollectionWrap>
                    <div
                      style={{
                        width: "6%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                      }}
                    >
                      {">"}
                    </div>
                  </div>
                </CollectionBox>
              </Link>
            </div>
            <div style={{ width: "100%" }}>
              <Link to={"/create-mint-nft"}>
                <ImageBox>
                  <div style={{ display: "flex" }}>
                    <NftWrap>
                      <ImageTitle>
                        <div>
                          <ImageSymbol />
                        </div>
                        <h2>NFT mint 하기</h2>
                      </ImageTitle>
                      <p>
                        다른 사람들이 mint할 수 있도록 NFT 컬렉션을 출시하세요.
                      </p>
                    </NftWrap>
                    <div
                      style={{
                        width: "6%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px",
                      }}
                    >
                      {">"}
                    </div>
                  </div>
                </ImageBox>
              </Link>
            </div>
          </NavPart>
          <SliderPart>
            {/* <div style={{ width: '100%', height: '100%', backgroundColor: 'yellowgreen' }}>
          <Img />
        </div> */}
            <Slider />
          </SliderPart>
        </div>
      </Container>
    </Background>
  );
}

const NavPart = styled.div`
  /* div style={{ width: '50%', paddingRight: '4rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} */
  width: 50%;
  padding-right: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
    padding: 0;
  }
`;

const SliderPart = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;

const CollectionBox = styled.div`
  /* style={{ border: '1px solid #dedede', borderRadius: '20px', padding: '24px 32px 24px 24px' }} */
  /* border: 1px solid #dedede; */
  border-radius: 20px;
  padding: 24px 32px 24px 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 16px;
`;
const ImageBox = styled(CollectionBox)``;

const TitlwBox = styled.div`
  width: 100%;
  padding: 7rem 0.5rem 0rem 1.5rem;
  margin-bottom: 1rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 1rem 0 0 0;
  }
`;

const CollectionWrap = styled.div`
  /* div style={{ width: '94%' }} */
  width: 94%;
  p {
    display: block;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    p {
      display: none;
    }
  }
`;
const NftWrap = styled(CollectionWrap)``;

const TitleWrap = styled.div`
  ${(props) => props.theme.variables.flexGap("row", "1rem")};
  align-items: end;
  h1 {
    font-size: 48px;
    font-weight: 700;
  }
`;
const CollectionTitle = styled(TitleWrap)`
  /* align-items: baseline; */
  align-items: center;
  padding: 0.5rem 4px;
  gap: 10px;
`;
const ImageTitle = styled(TitleWrap)`
  /* align-items: flex-start; */
  align-items: center;
  padding: 0.5rem 0px;
  gap: 10px;
`;
const OpenseaSymbol = styled(openseaSymbol)`
  width: 40px;
  height: 40px;
`;
const ImageSymbol = styled(imageSymbol)`
  width: 20px;
  height: 20px;
`;
const GridSymbol = styled(gridSymbol)`
  width: 14px;
  height: 14px;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 100px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;

const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  padding: 0 0 0 30px;
  margin-bottom: 0;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 0 1rem;
    min-height: 50vh;
  }
`;

export default Create;
