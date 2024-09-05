import { Helmet } from "react-helmet-async";

export default function Index() {
  return (
    <Helmet>
      <title>NFT Marketplace</title>
      <meta name="description" content="다양한 NFT 및 컬렉션을 탐색하고 검색하세요." />
      <meta name="keywords" content="NFT, 컬렉션, 암호화폐, 예술, 게임" />
      <meta property="og:title" content="MarketPlace" />
      <meta property="og:description" content="다양한 NFT 및 컬렉션을 탐색하고 검색하세요." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://opensea.io/static/images/logos/opensea-logo.svg?react" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:url" content="https://dztwi6z9vov5x.cloudfront.net/" />
    </Helmet>
  )
}   