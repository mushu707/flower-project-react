import React from 'react';
import {Empty, Image} from "antd-mobile";
import {EmptyBoxProps} from "../../utils/interface";
import './index.scss';

function EmptyBox(props: EmptyBoxProps) {

  const item = [
    {title: '购物车内暂时没有商品', image: 'cart'},
    {title: '检测您尚未登录账户，请先进行登录', image: 'info'},
    {title: '抱歉，暂无该商品', image: 'search'},
  ];

  const toShow = () => {
    switch (props.type){
      case "cart":
        if (props.token) return item[0]
        else return item[1];
      case "list":
        return item[2];
    }
  }

  return (
    <Empty
      className='empty-cart'
      description={<span>{toShow().title}</span>}
      image={<Image src={`http://localhost:4000/assets/mobile/m_empty/${toShow().image}.svg`} width={250}/>}
    />
  );
}

export default EmptyBox;