import React, {useEffect, useState} from 'react';
import {addCart, getDetailInfo, addCollection, deleteCollection, addHistory} from "../../api";
import {CartType, GoodsType} from "../../utils/interface";
import {Button, Image, Toast} from "antd-mobile";
import {StarOutline, UserSetOutline, KoubeiOutline,
  ExclamationTriangleOutline, StarFill} from "antd-mobile-icons";
import {LayOut, transSaleCount} from "../../utils";
import FuncBox from "../../components/FuncBox";
import {useLocation, useNavigate} from "react-router-dom";
import {store} from "../../redux/store";
import {cartAddAction, collectionAddAction, collectionDeleteAction} from "../../redux/actions";
import Comment from "./comment";
import Details from "./details";
import Location from "./location";
import PopBar from "../../components/NavBar/PopBar";
import './index.scss';

function Goods() {

  const [goodsInfo, setGoodsInfo] = useState<GoodsType>();
  const [isCollect, setIsCollect] = useState<boolean | number>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nav = [
    {id: 1, title: '客服', icon: <UserSetOutline fontSize={18} />},
    {id: 2, title: '购物车', icon: <KoubeiOutline fontSize={18}/>, callback: () => navigate('/cart')}
  ];

  const AddCart = () => {
    const {Cart, User} = store.getState();
    if (User.token && !Cart.data.find((item: CartType) => item.name === goodsInfo!.name)) {
      const info = {
        name: goodsInfo?.name,
        img: goodsInfo?.img,
        price: goodsInfo?.price,
        original_price: goodsInfo?.original_price,
        buy_count: 1,
        isChecked: 1
      }
      addCart(info).then(res => {
        if (res.code === 200){
          store.dispatch(cartAddAction());
          Toast.show({content: '添加购物车成功 !', icon: 'success'});
        }else Toast.show({content: '购物车中已存在该商品 !', icon: <ExclamationTriangleOutline />});
      })
    } else Toast.show({content: `请先登录账户 !`, icon: <ExclamationTriangleOutline />});
  }
  const AddCollection = () => {
    const {User} = store.getState();
    if (User.token)
      addCollection({g_id: goodsInfo!.id}).then(res => {
        if (res.code === 200){
          store.dispatch(collectionAddAction(goodsInfo!.id));
          setIsCollect(true);
          Toast.show({content: '添加收藏成功 !', icon: 'success'});
        }
        else Toast.show({content: '该商品已存在收藏夹中 !', icon: 'fail'});
      })
    else Toast.show({content: '请先登录账户', icon: <ExclamationTriangleOutline />})
  }
  const CancelCollected = () => {
    deleteCollection({g_id: goodsInfo!.id}).then(res => {
      if (res.code === 200){
        store.dispatch(collectionDeleteAction(goodsInfo!.id));
        setIsCollect(0);
        Toast.show({content: '取消收藏成功 !', icon: 'success'});
      }else Toast.show({content: res.message, icon: 'fail'});
    })
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '商品', right: <PopBar/>}}
    ), []);

  useEffect(() => {
    const subPath = location.pathname.split('/')[2];
    getDetailInfo({hua_id: subPath}).then(res => {
      const {goodsInfo} = res.data;
      setGoodsInfo(goodsInfo);
    })
    if (store.getState().User.token) addHistory({g_id: subPath});
  }, [location.pathname]);

  return (
    <div className='goods'>
      <div className='pro-goods'>
        <Image className='pro-img' src={goodsInfo ? goodsInfo.img : ''}/>
        <div className='pro-info'>
          <div className='pro-info-top'>
            <div className='title'>
              <span>{goodsInfo ? `${goodsInfo.name} ${goodsInfo.describe}` : ''}</span>
              <span>{goodsInfo?.slogan}</span>
            </div>
            <div className='icon'>
              {
                store.getState().Collection.collection.includes(goodsInfo?.id) || isCollect
                  ? <StarFill color='#ff7485' onClick={CancelCollected}/>
                  : <StarOutline onClick={AddCollection}/>
              }
            </div>
          </div>
          <div className='pro-info-bottom'>
            <div className='price'>
              <span>￥{goodsInfo?.price}</span>
              <span>￥{goodsInfo?.original_price}</span>
            </div>
            <div className='sale-count'>已售{goodsInfo?.sale_count ? transSaleCount(goodsInfo.sale_count) : 0}件</div>
          </div>
        </div>
      </div>

      <Location/>

      <Details goodsInfo={goodsInfo!}/>

      <Comment/>

      <div className='goods-nav'>
        <div className='goods-nav-left'>
          <FuncBox data={nav} columns={2} style={{padding: 0}}/>
        </div>
        <div className='goods-nav-right'>
          <Button className='goods-nav-addCart' onClick={AddCart}>添加购物车</Button>
          <Button className='goods-nav-buyBtn'>立即购买</Button>
        </div>
      </div>
    </div>
  );
}

export default Goods;
