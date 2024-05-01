import styled from "styled-components";

function NftDetail() {
  return (
    <Background>
      <Container>
        <Flex>
          <LeftPart>
            <ImgBox>
              <header>
                <div>
                  {/* 이더리움 등 icon */}
                  <icon />
                </div>
                <div>
                  {/* view original (pinata) */}
                  <icon />
                </div>
                <div>
                  {/* like icon */}
                  <icon />
                </div>
              </header>
              <ImgWrap>
                <img />
              </ImgWrap>
            </ImgBox>
          </LeftPart>
          <RightPart>
            <div>
              <div>
                <h1>nft name</h1>
                <div>Owned by [nft owner]</div>
              </div>
              <div>
                <div>
                  <button>구매하기</button>
                </div>
                <div>
                  <button>장바구니</button>
                </div>
              </div>
            </div>
            <div>
              <div>
                Description
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                vehicula, risus nec tincidunt ultricies, purus nunc laoreet
                turpis, a vehicula felis odio vel libero. Donec vehicula, risus
                nec tincidunt ultricies, purus nunc laoreet turpis, a vehicula
                felis odio vel libero.
              </p>
            </div>
            <div>
              <div>
                Traits
              </div>
              <div>
                <ul>
                  <li>
                    <div>characteristic</div>
                    <div>예술</div>
                  </li>
                  <li>
                    <div>characteristic</div>
                    <div>유명인</div>
                  </li>
                  <li>
                    <div>characteristic</div>
                    <div>게임</div>
                  </li>
                </ul>
              </div>
            </div>
          </RightPart>
        </Flex>
      </Container>
    </Background>
  );
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  padding: 10px 30px;
`;
const LeftPart = styled.div`
  width: 45%;
`;
const ImgBox = styled.div`
  width: 100%;
  height: 550px;
  border: 1px solid rgba(18, 18, 18, 0.12);
  border-radius: 12px;
  background-color: rgb(242, 244, 245);
  header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
`;
const ImgWrap = styled.div`
  width: 100%;
  height: calc(550px - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const RightPart = styled.div`
  width: 55%;
`;

const Background = styled.div`
  /* height: 100%; */
  padding-top: 72px;
  width: 100%;
  background-color: #ffffff;
  background-size: cover;
`;


const Container = styled.div`
  min-height: 100vh;
  overflow: hidden;
  color: rgba(18, 18, 18, 1);
  /* padding: 0 50px 0 30px; */
`;

export default NftDetail; 