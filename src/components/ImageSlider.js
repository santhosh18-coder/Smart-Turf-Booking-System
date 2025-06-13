import React from 'react';
import { Swiper, SwiperSlide} from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "./ImageSlider.css"
const ImageSlider = ({images}) =>{
    return(
        <Swiper
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
      className="swiper-cont"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="swiper-img"
            style={{width:'100%',height:'100%'}}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    )
}

export default ImageSlider;