import React from 'react';
import {GoodsType} from "../../../utils/interface";

import './index.scss';

function Details(props: {goodsInfo: GoodsType}) {

  const details:{id: number, title: string, target?: 'huayu' | 'material' | 'packing', text?: string}[] = [
    {id: 1, title: '花语', target: 'huayu'},
    {id: 2, title: '材料', target: 'material'},
    {id: 3, title: '包装', target: 'packing'},
    {id: 4, title: '配送', text: '全国配送，请提前一天预定'},
    {id: 5, title: '附送', text: '下单填写留言，即免费赠送精美贺卡！'},
  ];

  return (
    <div className='details'>
      {
        details.map(item =>
          <div className='details-info' key={item.id}>
            <div className='details-title'>{item.title}</div>
            <div className='details-desc'>{(props.goodsInfo && item.target) ? props.goodsInfo[item.target] : item.text}</div>
          </div>
        )
      }
    </div>
  );
}

export default Details;