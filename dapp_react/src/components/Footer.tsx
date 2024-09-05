import styled from "styled-components";
// import Twitter from "../assets/images/twitter.svg?react";
// import Instagram from "../assets/images/instagram.svg?react";
// import Discord from "../assets/images/discord.svg?react";
// import Youtube from "../assets/images/youtube.svg?react";
// import Tictoc from "../assets/images/tictok.svg?react";

import Twitter from "../assets/images/twitter.png";
import Instagram from "../assets/images/instagram.png";
import Discord from "../assets/images/discord.png";
import Youtube from "../assets/images/youtube.png";
// import Tictoc from "../assets/images/tictok.png";
import Swal from "sweetalert2";
import LazyloadComponent from "../hooks/LazyloadComponent";

export default function Footer() {
  const singupHandle = () => {
    Swal.fire("Coming soon!, Thank you for signing up!");
  };

  return (
    <Container>
      <FlexBoxGap>
        <MailPart>
          <h2>Stay in the loop</h2>
          <p>
            Join our mailing list to stay in the loop with our newest feature{" "}
            <br />
            releases, NFT drops, and tips and tricks for navigating OpenSea.
          </p>
          <div>
            <input type="email" placeholder="Your email address" />
            <button onClick={singupHandle}>Sign up</button>
          </div>
        </MailPart>
        <CommunityPart>
          <h2>Join the community</h2>
          <div>
            <ul>
              <li>
                <a
                  href="https://x.com/opensea"
                  aria-label="Go to opensea's twitter"
                  target="_blank"
                >
                  {/* <SvgWrap>
                    <TwitterSvg />
                  </SvgWrap> */}
                  <SymbolImg>
                    <LazyloadComponent>
                      <img src={Twitter} alt="twitter" />
                    </LazyloadComponent>
                  </SymbolImg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/opensea/"
                  aria-label="Go to opensea's Instagram"
                  target="_blank"
                >
                  {/* <SvgWrap>
                    <InstagramSvg />
                  </SvgWrap> */}
                  <SymbolImg>
                    <LazyloadComponent>
                      <img src={Instagram} alt="Instagram" />
                    </LazyloadComponent>
                  </SymbolImg>
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/invite/opensea"
                  aria-label="Go to opensea's Discord"
                  target="_blank"
                >
                  {/* <SvgWrap>
                    <DiscordSvg />
                  </SvgWrap> */}
                  <SymbolImg>
                    <LazyloadComponent>
                      <img src={Discord} alt="Discord" />
                    </LazyloadComponent>
                  </SymbolImg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/c/OpenSeaTV"
                  aria-label="Go to opensea's Youtube"
                  target="_blank"
                >
                  {/* <SvgWrap>
                    <YoutubeSvg />
                  </SvgWrap> */}
                  <SymbolImg>
                    <LazyloadComponent>
                      <img src={Youtube} alt="Youtube" />
                    </LazyloadComponent>
                  </SymbolImg>
                </a>
              </li>
              {/* <li>
                <a
                  href="https://www.tiktok.com/@opensea?lang=en"
                  target="_blank"
                >
                  <SvgWrap>
                    <TictocSvg />
                  </SvgWrap>
                  <SymbolImg >
                    <img src={Tictoc} alt="Tictoc" />
                  </SymbolImg>
                </a>
              </li> */}
            </ul>
          </div>
        </CommunityPart>
      </FlexBoxGap>
      <Line />
      <FlexBoxPadding>
        <IntroductionPart>
          <div>
            <LogoWrap>
              <LazyloadComponent>
                <img
                  src="https://opensea.io/static/images/logos/opensea-logo.svg?react"
                  alt="logo"
                />
              </LazyloadComponent>
            </LogoWrap>
          </div>
          <h2>NFT Sea</h2>
          <p>
            The world’s first and largest digital <br />
            marketplace for crypto collectibles and <br />
            non-fungible tokens (NFTs). Buy, sell, <br />
            and discover exclusive digital items.
          </p>
        </IntroductionPart>
        <CategoryWrap>
          <MarketPlacePart>
            <h3>Marketplace</h3>
            <ul>
              <li>Art</li>
              <li>Gaming</li>
              <li>Memberships</li>
              <li>PFPs</li>
              <li>Photography</li>
              <li>Music</li>
            </ul>
          </MarketPlacePart>
          <MyAccountPart>
            <h3>My Account</h3>
            <ul>
              <li>Profile</li>
              <li>Activity</li>
              <li>Settings</li>
              <li>Notifications</li>
            </ul>
          </MyAccountPart>
          <ResourcePart>
            <h3>Resources</h3>
            <ul>
              <li>Blog</li>
              <li>Help Center</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </ResourcePart>
          <CompanyPart>
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Press</li>
              <li>OpenSea Token</li>
              <li>OpenSea DAO</li>
            </ul>
          </CompanyPart>
        </CategoryWrap>
      </FlexBoxPadding>
    </Container>
  );
}

const SymbolImg = styled.div`
  /* width: 20px;
  height: 20px; */
  padding: 12px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Line = styled.div`
  /* style={{ width: '100%', height: '1px', borderBottom: '1px solid rgba(229, 232, 235, 0.25)', padding: '2rem' }} */
  width: 100%;
  height: 1px;
  border-bottom: 1px solid rgba(229, 232, 235, 0.25);
  padding: 2rem 0;
  margin-bottom: 2rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 1rem 0;
  }
`;

const CategoryWrap = styled.div`
  gap: 4rem;
  display: flex;
  width: 50%;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
    width: 100%;
  }
`;
const LogoWrap = styled.div`
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const IntroductionPart = styled.div`
  /* display: flex; */
  ${(props) => props.theme.variables.flexGap("column", "1rem")}
  p {
    line-height: 20px;
  }
`;
const MarketPlacePart = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  ul {
    ${(props) => props.theme.variables.flexGap("column", "10px")};
  }
  display: block;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;
const MyAccountPart = styled(MarketPlacePart)``;
const ResourcePart = styled(MarketPlacePart)``;
const CompanyPart = styled(MarketPlacePart)``;

// const SvgWrap = styled.div`
//   ${(props) => props.theme.variables.flex};
//   height: 100%;
// `;
// const TwitterSvg = styled(Twitter)`
//   width: 30px;
//   height: 20px;
// `;
// const InstagramSvg = styled(Instagram)`
//   width: 30px;
//   height: 20px;
// `;

// const DiscordSvg = styled(Discord)`
//   width: 30px;
//   height: 20px;
// `;

// const YoutubeSvg = styled(Youtube)`
//   width: 30px;
//   height: 20px;
// `;

// const TictocSvg = styled(Tictoc)`
//   width: 30px;
//   height: 20px;
// `;

const FlexBoxGap = styled.div`
  display: flex;
  justify-content: space-between;
  /* @media (max-width: ${({ theme }) => theme.size.mobile}) {
  } */
`;
const FlexBoxPadding = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    /* gap: 0;
    flex-direction: column; */
  }
`;

const MailPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    width: 80%;
    height: 35px;
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    margin-right: 5px;
  }
  button {
    height: 35px;
    padding: 0 1rem;
    border: none;
    border-radius: 10px;
    background-color: rgba(32, 129, 226, 1);
    color: white;
    cursor: pointer;
  }

  p {
    line-height: 20px;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    display: none;
  }
`;
const CommunityPart = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ul {
    display: flex;
    gap: 10px;
  }
  li {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    background-color: rgba(32, 129, 226, 1);
    font-size: 14px;
    cursor: pointer;
  }
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    width: 100%;
  }
`;
const Container = styled.div`
  /* ${(props) => props.theme.variables.flex}; */
  color: rgb(255, 255, 255);
  height: auto;
  width: 100%;
  background-color: rgb(24, 104, 183);
  position: absolute;
  /* bottom: 0; */
  z-index: 998;
  padding: 3rem 2rem 3rem 2rem;
  @media (max-width: ${({ theme }) => theme.size.mobile}) {
    padding: 3rem 1rem;
  }
`;
