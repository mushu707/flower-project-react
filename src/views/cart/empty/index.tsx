import React, {useEffect, useState} from 'react';
import {AutoCenter, Button, NoticeBar, SpinLoading} from "antd-mobile";
import {FingerdownOutline} from 'antd-mobile-icons';
import GoodsBox from "../../../components/GoodsBox";
import {useNavigate} from "react-router-dom";
import {GoodsType} from "../../../utils/interface";
import {getGuessGoods} from "../../../api";
import EmptyBox from "../../../components/EmptyBox";
import './index.scss';

function EmptyCart(props: {token: string}) {

  const navigate = useNavigate();
  const [guessList, setGuessList] = useState<GoodsType[]>();

  useEffect(() => {
    getGuessGoods({num: 6}).then(res => {
      setGuessList(res.data.guessList);
    });
  }, []);

  return (
    <>
      {
        props.token ? <div style={{height: 12}}/>
          : <NoticeBar content='登录后将同步您的购物车信息' className='cart-notice' extra={
            <Button
              className='cart-login-btn'
              shape='rounded'
              fill='outline'
              size='mini' onClick={() => {
              navigate('/login');
            }}>登录</Button>
          }/>
      }

      <EmptyBox type='cart' token={props.token}/>

      <div className='guess'>
        <div className='guess-title'>
          <FingerdownOutline />
          &nbsp;猜你喜欢
        </div>
        <div className='guess-goods'>
          {
            guessList ?
              <GoodsBox gap={10} columns={2} item_span={1} data={guessList} type='info'/> :
              <AutoCenter><SpinLoading style={{'--size': '32px'}}/></AutoCenter>
          }
        </div>
      </div>
    </>
  );
}

export default EmptyCart;