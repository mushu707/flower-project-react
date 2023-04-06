import React from 'react';
import {GoodsType} from "../../../utils/interface";
import {Image, Toast} from "antd-mobile";
import {HeartOutline, SmileOutline} from 'antd-mobile-icons';
import {transSaleCount} from "../../../utils";
import './index.scss';

function Desc(props: {data: GoodsType}) {

  const {img, name, describe, price, slogan, sale_count} = props.data;

  return (
    <div className='desc-data'>
      <Image className='desc-img' src={img}/>
      <div className='desc-info'>
        <div className='desc-title'>{name}</div>
        <div className='desc-describe'>{describe}</div>
        <div className='desc-slogan'>{slogan}</div>
        <div className='desc-price-box'>
          <div className='box-left'>
            <span className='desc-price'>￥{price}</span>
            <span className='desc-payed'>{`已销售${transSaleCount(sale_count)}件`}</span>
          </div>
          <HeartOutline onClick={(a) =>
            Toast.show(
              {content: '点击小红心 !', icon: <SmileOutline/>}
            )} />
        </div>
      </div>
    </div>
  );
}

export default Desc;