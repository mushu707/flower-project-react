import React, {useEffect, useState} from 'react';
import {getHomeInfo} from "../../api";
import HomeSwiper from "./swiper";
import ProductNav from "./productNav";
import HomeContent from "./content";
import {BannerType, HomeType} from "../../utils/interface";
import {LayOut} from "../../utils";
import {CheckOutline, LinkOutline, UnorderedListOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import {Image, Toast} from "antd-mobile";
import './index.scss';

function Home() {

  const [data, setData] = useState<{banner: BannerType[], home: HomeType[]}>({banner: [], home: []})
  const navigate = useNavigate();

  useEffect(() => LayOut(
    {tab_bar: true, nav_data: {
        backArrow: false,
        left: <UnorderedListOutline fontSize={22} style={{marginLeft: -12}} onClick={() => navigate('/category')}/>,
        right: <LinkOutline fontSize={22} onClick={() => Toast.show({content: '复制分享链接成功 !', icon: <CheckOutline/>})}/>,
        title: <Image src={'http://localhost:4000/assets/home/m_logo.png'} style={{margin: '0 auto', height: 40, width: 190}}/>
    }}), [navigate])

  useEffect(() => {
    getHomeInfo().then(res => {
      const {homeList, bannerList, goodsList} = res.data;
      const newBanner = bannerList.filter((item: BannerType) => item.isShow === 1);
      homeList.forEach((data: HomeType) => data.data = goodsList[data.style])
      setData({banner: newBanner, home: homeList});
    })
  }, []);

  return (
    <div className='home'>
      <HomeSwiper bannerList={data.banner}/>

      <ProductNav/>

      <HomeContent homeList={data.home}/>
    </div>
  );
}

export default Home;
