/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cube';
import Banner1 from "../assets/images/banner-main2.gif";
import Banner2 from "../assets/images/banner-main3.gif";
import Banner3 from "../assets/images/banner-main1.png";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


const Slider = ({ sliderRef }) => {
  // const [slider, setSlider] = useState(null);
  // const sliderRef = useRef(null);

  // useEffect(() => {
  //   if (slider) {

  //   }
  // }, [slider])

  return (
    <Container>
      <Swiper
        // modules={[Navigation, Pagination, Scrollbar, A11y]}
        modules={[EffectCube]}
        effect="cube"
        style={{ height: '300px' }}
        spaceBetween={50}
        slidesPerView={1}
        onActiveIndexChange={(e) => console.log(e.realIndex)}
        onSwiper={(swiper) => sliderRef.current = swiper}
        loop={true}
        speed={1000}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {/* <div>Slide1 입니다</div>
        <div>Slide2 입니다</div>
        <div>Slide3 입니다</div> */}
        <SwiperSlide>
          <BannerWrap>
            <BannerImg />
          </BannerWrap>
        </SwiperSlide>
        <SwiperSlide>
          <BannerWrap>
            <BannerImg2 />
          </BannerWrap>
        </SwiperSlide>
        <SwiperSlide>
          <BannerWrap>
            <BannerImg3 />
          </BannerWrap>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
}

const BannerWrap = styled.div`
  width: 35%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
`;

const BannerImg = styled.div`
background-image: url(${Banner1});
background-position: center;
background-size: cover;
height: 100%;
width: 100%;
`;
const BannerImg2 = styled.div`
background-image: url(${Banner2});
background-position: center;
background-size: cover;
height: 100%;
width: 100%;
`;
const BannerImg3 = styled.div`
background-image: url(${Banner3});
background-position: center;
background-size: cover;
height: 100%;
width: 100%;
`;
const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

export default Slider;