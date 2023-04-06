import React from 'react';
import {Image} from "antd-mobile";
import {GoodsType} from "../../../utils/interface";
import {transSaleCount} from '../../../utils/index';
import './index.scss';

function Info(props: {data: GoodsType}) {

  return (
    <>
      <Image className='info-img' src={props.data.img} fit='fill'/>
      <div className='info-info'>
        <div className='info-title'>
          {'[' + props.data.name + '] ' + props.data.describe}
        </div>
        <div className='info-price-box'>
          <span className='info-icon'>￥</span>
          <span className='info-price'>{props.data.price}</span>
          <span className='info-payed'>{transSaleCount(props.data.sale_count) + '人已购买'}</span>
        </div>
      </div>
    </>
  );
}

export default Info;