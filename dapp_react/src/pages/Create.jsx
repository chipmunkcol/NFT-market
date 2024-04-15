import { Link } from "react-router-dom";
import styled from "styled-components";

function TempNav() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <div style={{ width: '100%', padding: '7rem 0.5rem 1.5rem 1.5rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'yellowgreen' }}>
              <i />
            </div>
            <h2>Create</h2>
          </div>
        </div>
        <div style={{ width: '100%', padding: '1rem 0.5rem' }}>
          {/* <Link to={'collection'}> */}
          <Link to={'/create-collection'}>
            <div style={{ border: '1px solid #dedede', borderRadius: '20px', padding: '1rem' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'yellowgreen' }}>
                  <i />
                </div>
                <h2>Collection</h2>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ width: '100%', padding: '1rem 0.5rem' }}>
          <Link to={'/create-mint-nft'}>
            <div style={{ border: '1px solid #dedede', borderRadius: '20px', padding: '1rem' }}>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'yellowgreen' }}>
                  <i />
                </div>
                <h2>Mint an NFT</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div style={{ width: '50%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: 'yellowgreen' }}>
          <Img />
        </div>
      </div>
    </div >
  )
}

function Create() {


  return (
    <Background>
      <Container>
        <TempNav />
        {/* <Outlet /> */}
      </Container>
    </Background>
  )
}

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
  padding: 0 50px 0 30px;
`;

const Img = styled.img`
  width: 100%;
  height: calc(100vh - 100px);
`;

export default Create;