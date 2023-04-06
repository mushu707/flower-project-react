import React from 'react';
import FuncBox from "../../../components/FuncBox";

function ProductNav() {

  const header = 'http://localhost:4000/assets/mobile/m_home/';

  const productNavData = [
    {id: 1, title: '鲜花', icon: `${header}花店-百合.svg`},
    {id: 2, title: '永生花', icon: `${header}花店-永生花.svg`},
    {id: 3, title: '蛋糕', icon: `${header}蛋糕.svg`},
    {id: 4, title: '礼品', icon: `${header}礼物.svg`},
    {id: 5, title: '装饰', icon: `${header}婚庆.svg`},
    {id: 6, title: '生日祝福', icon: `${header}干杯.svg`},
    {id: 7, title: '表白求婚', icon: `${header}钻戒.svg`},
    {id: 8, title: '商务开业', icon: `${header}欢庆.svg`},
    {id: 9, title: '周年纪念', icon: `${header}婚礼日期.svg`},
    {id: 10, title: '专业摄影', icon: `${header}摄像.svg`},
  ]

  return (
    <div className='product-nav'>
      <FuncBox
        data={productNavData}
        columns={5} gap={10}
        style={{fontWeight: 'bold'}}
        iconType iconSize={45}/>
    </div>
  );
}

export default ProductNav;