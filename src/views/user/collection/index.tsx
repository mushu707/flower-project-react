import React, {useEffect, useState} from 'react';
import {LayOut} from "../../../utils";
import PopBar from "../../../components/NavBar/PopBar";
import {addCart, getCollection} from "../../../api";
import {CartType, CollectionType, GoodsType} from "../../../utils/interface";
import {Button, Image, Toast} from "antd-mobile";
import {store} from "../../../redux/store";
import {cartAddAction} from "../../../redux/actions";
import {CheckOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";
import './index.scss';

function Collection() {

  const [collection, setCollection] = useState<CollectionType[]>([]);
  const [Cart] = useState(store.getState().Cart);
  const navigate = useNavigate();
  const AddCart = (g_info: GoodsType) => {
    const info = {
      name: g_info.name,
      img: g_info.img,
      price: g_info.price,
      original_price: g_info.original_price,
      buy_count: 1,
      isChecked: 1
    }
    addCart(info).then(_ => {
      store.dispatch(cartAddAction());
      navigate('/cart');
      Toast.show({content: '添加购物车成功 !', icon: 'success'});
    })
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '我的收藏', right: <PopBar/>}}
  ), [])

  useEffect(() => {
    getCollection().then(res => {
      setCollection(res.data.collectionData);
    })
  }, [])

  return (
    <>
      {
        collection.map(item => <div className='collection-item' key={item.id} onClick={() => navigate(`/goods/${item.g_id}`)}>
          <Image className='collection-img' src={item.g_info.img}/>
          <div className='collection-info'>
            <div className='collection-title'>{item.g_info.name + ' ' + item.g_info.describe}</div>
            <div className='collection-bottom'>
              <div className='collection-price'>
                <span>￥</span>
                <span>{item.g_info.price}</span>
              </div>
              {
                !Cart.data.find((data: CartType) => data.name === item.g_info.name)
                  ? <Button className='collection-addCart' shape='rounded' onClick={() => AddCart(item.g_info)}>加入购物车</Button>
                  : <Button className='collection-addCart' shape='rounded' disabled><CheckOutline /> 已添加购物车</Button>
              }
            </div>
          </div>
        </div>
        )
      }
    </>
  );
}

export default Collection;