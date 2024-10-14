import React from 'react'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function FavBookcard() {
  return (
    <div>
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="https://i.imgur.com/fWVKfe4.png" /></SwiperSlide>
        <SwiperSlide><img src="https://i.imgur.com/ACUCouf.png"/></SwiperSlide>
        
      </Swiper>
    </div>
  )
}

export default FavBookcard
