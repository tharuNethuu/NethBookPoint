import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Bannercard.css';

// import required modules
import {  Autoplay,EffectCoverflow, Pagination } from 'swiper/modules';
function Bannercard() {
  return (
    <div>
     <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
          
        }}
        pagination={true}
        modules={[Autoplay,EffectCoverflow, Pagination]}
        className="mySwiper"
      > <SwiperSlide>
        <img className='w-full md:w-3/4 lg:w-2/3' src="https://i.imgur.com/frfWgih.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full md:w-3/4 lg:w-2/3' src="https://i.imgur.com/DacOrZ0.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <img className='w-full md:w-3/4 lg:w-2/3' src="https://i.imgur.com/11WZKXU.jpeg" />
        </SwiperSlide>
       
      </Swiper>
    </div>
  )
}

export default Bannercard
