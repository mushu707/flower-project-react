import React from 'react';
import {AutoCenter} from "antd-mobile";
import {HomeType} from "../../../utils/interface";
import GoodsBox from "../../../components/GoodsBox";

function HomeContent(props: {homeList: HomeType[]}) {
  return (
    <>
      {
        props.homeList.map(item =>
          <div key={item.id} className='recommend-area'>
            <AutoCenter className='recommend-area-name'>{item.name + ' / ' + item.desc}</AutoCenter>
            <GoodsBox
              gap={10}
              columns={2}
              item_span={1}
              type='info'
              data={item.data}/>
          </div>
        )
      }
    </>
  );
}

export default HomeContent;