/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import mainImage from "../../assets/images/create-main-image.webp"
import mainImage2 from "../../assets/images/create-main-image2.webp"
import mainImage3 from "../../assets/images/create-main-image3.webp"


const Slider = () => {

  return (
    <Container>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        speed={1000}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        style={{ height: '100%' }}
      >
        <SwiperSlide>
          <SliderBox>
            <img src={mainImage} alt="create-slider" />
          </SliderBox>
        </SwiperSlide>
        <SwiperSlide>
          <SliderBox>
            <img src={mainImage2} alt="create-slider" />
          </SliderBox>
        </SwiperSlide>
        <SwiperSlide>
          <SliderBox>
            <img src={mainImage3} alt="create-slider" />
          </SliderBox>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

const SliderBox = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;


// const BannerImg = styled.div`
// background-image: url(${Banner1});
// background-position: center;
// background-size: cover;
// height: 100%;
// width: 100%;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
`;
const Box = styled.div`
  width: 858px;
  height: 130px;
  margin: 0 auto;
`;

export default Slider;