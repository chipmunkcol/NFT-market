import styled from "styled-components";
import { ReactComponent as twitter } from "../assets/images/twitter.svg"
import { ReactComponent as instagram } from "../assets/images/instagram.svg"
import { ReactComponent as discord } from "../assets/images/discord.svg"
import { ReactComponent as youtube } from "../assets/images/youtube.svg"
import { ReactComponent as tictoc } from "../assets/images/tictok.svg"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";



export default function Footer() {

  const singupHandle = () => {
    Swal.fire('Coming soon!, Thank you for signing up!');
  };

  return (
    <Container>
      <FlexBox style={{ gap: '10rem' }}>
        <MailPart>
          <h2>Stay in the loop</h2>
          <p>
            Join our mailing list to stay in the loop with our newest feature <br />
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
                <a href="https://x.com/opensea" target="_blank">
                  <SvgWrap>
                    <TwitterSvg />
                  </SvgWrap>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/opensea/" target="_blank">
                  <SvgWrap>
                    <InstagramSvg />
                  </SvgWrap>
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/opensea" target="_blank">
                  <SvgWrap>
                    <DiscordSvg />
                  </SvgWrap>
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/c/OpenSeaTV " target="_blank">
                  <SvgWrap>
                    <YoutubeSvg />
                  </SvgWrap>
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@opensea?lang=en" target="_blank">
                  <SvgWrap>
                    <TictocSvg />
                  </SvgWrap>
                </a>
              </li>
            </ul>
          </div>
        </CommunityPart>
      </FlexBox>
      <div style={{ width: '100%', height: '1px', borderBottom: '1px solid rgba(229, 232, 235, 0.25)', padding: '2rem' }}></div>
      <FlexBox style={{ padding: '4rem 6rem 0 0', justifyContent: 'space-between' }}>
        <IntroductionPart>
          <div>
            <LogoWrap>
              <img src="https://opensea.io/static/images/logos/opensea-logo.svg" alt="logo" />
            </LogoWrap>
          </div>
          <h2>OpenSea</h2>
          <p>
            The world’s first and largest digital <br />
            marketplace for crypto collectibles and <br />
            non-fungible tokens (NFTs). Buy, sell, <br />
            and discover exclusive digital items.
          </p>
        </IntroductionPart>
        <div style={{ display: 'flex', gap: '4rem' }}>
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
        </div>
      </FlexBox>
    </Container>
  )
}
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
  ${props => props.theme.variables.flexGap('column', '1rem')}
  p {
    line-height: 20px;
  }
`;
const MarketPlacePart = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  ul {
    ${props => props.theme.variables.flexGap('column', '10px')};
  }
`;
const MyAccountPart = styled(MarketPlacePart)``;
const ResourcePart = styled(MarketPlacePart)``;
const CompanyPart = styled(MarketPlacePart)``;

const SvgWrap = styled.div`
  ${props => props.theme.variables.flex};
  height: 100%;
`;
const TwitterSvg = styled(twitter)`
  width: 30px;
  height: 20px;
`;
const InstagramSvg = styled(instagram)`
width: 30px;
  height: 20px;
`;

const DiscordSvg = styled(discord)`
width: 30px;
  height: 20px;
`;

const YoutubeSvg = styled(youtube)`
width: 30px;
  height: 20px;
`;

const TictocSvg = styled(tictoc)`
width: 30px;
  height: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  /* justify-content: space-between; */
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
`;
const CommunityPart = styled(MailPart)`
  ul {
      ${props => props.theme.variables.flex};
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
`;
const Container = styled.div`
    /* ${props => props.theme.variables.flex}; */
    color: rgb(255, 255, 255);
    height: auto;
    width: 100%;
    padding: 3rem 2rem 3rem 2rem;
    background-color: rgb(24, 104, 183);
    position: absolute;
    /* bottom: 0; */
    z-index: 998;
`;