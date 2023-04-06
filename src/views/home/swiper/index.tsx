import React from 'react';
import {BannerType} from "../../../utils/interface";
import {Image, Skeleton, Swiper} from "antd-mobile";

function HomeSwiper(props: {bannerList: BannerType[]}) {

  return (
    <>
      {
        props.bannerList.length ?
          <Swiper className='product-swiper' indicatorProps={{color: 'white'}} defaultIndex={1} autoplay loop>
            {
              props.bannerList.map(item =>
                <Swiper.Item key={item.id}>
                  <Image className='swiper-item' src={item.img}/>
                </Swiper.Item>
              )
            }
          </Swiper>
          : <Skeleton animated style={{width: '95vw', height: '22.4vh', margin: '55px 0 20px'}}/>
      }
    </>
  )
}

export default HomeSwiper;