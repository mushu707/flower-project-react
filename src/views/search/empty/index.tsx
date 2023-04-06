import React from 'react';
import EmptyBox from "../../../components/EmptyBox";
import {Image} from "antd-mobile";
import {NavLink} from "react-router-dom";
import './index.scss';

function EmptySearch() {

  const recommend = ['母爱', '韩式', '永生花', '长辈', '爱情', '玫瑰', '红色', '粉色', '礼盒'];

  return (
    <>
      <EmptyBox type='list'/>

      <div className='recommend'>
        <div className='recommend-head'>换个词试一试</div>
        <div className='recommend-body'>
          {
            recommend.map((item, index) => <NavLink to={`/search/${item}`} key={index}>{item}</NavLink>)
          }
        </div>
        <Image src={'http://localhost:4000/assets/home/m_logo.png'} className='recommend-logo'/>
      </div>
    </>
  );
}

export default EmptySearch;