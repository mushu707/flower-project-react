import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Image, Stepper, Toast} from "antd-mobile";
import {CloseOutline} from "antd-mobile-icons";
import {CheckboxValue} from "antd-mobile/es/components/checkbox";
import {getCartList, deleteCart} from "../../../api";
import {CartType} from "../../../utils/interface";
import {format} from '../../../utils';
import {store} from "../../../redux/store";
import {cartDeleteAction, cartUpdateInfoAction} from "../../../redux/actions";
import './index.scss';

function ExistAccount() {

  const [check, setCheck] = useState<CheckboxValue[]>(store.getState().Cart.check);
  const [sum, setSum] = useState<{total: number, count: number}>({total: 0, count: 0});
  const [cartList, setCartList] = useState<CartType[]>(store.getState().Cart.data);

  // 根据选中状态获取总数和总金额
  const getSum = (list: CartType[]) => {
    let total:number = 0, count:number = 0;
    check.forEach(val => {
      const data = list.find(item => item.id === val);
      if (data !== undefined){
        total += data.price * data.buy_count;
        count += data.buy_count;
      }
    })
    setSum({total, count});
  }

  // 更新数据前修改选中状态
  const beforeSetChecked = (list: CartType[]) =>
    list.reduce((pre: CheckboxValue[], cur: CartType) => {
      if (cur.isChecked === 1)
        return [...pre, cur.id];
      else return [...pre];
    }, []);

  // 删除购物车
  const handleDelete = (delName: string) => {
    Toast.show({content: '删除中...', icon: 'loading'});
    setTimeout(() => {
      deleteCart({name: delName}).then(_ => {
        const newList = cartList.filter(item => delName !== item.name);
        store.dispatch(cartDeleteAction({list: newList}));
        Toast.clear();
        setCartList(newList);
        Toast.show({content: '删除成功 !', icon: 'success', duration: 300});
      })
    }, 400)
  }

  useEffect(() => {
    const {isGetData} = store.getState().Cart;
    // 根据isGetData状态获取后台数据，否则进行计算数量和金额
    if (isGetData)
      getCartList().then(res => {
        const {cartList} = res.data;
        const check = beforeSetChecked(cartList);
        store.dispatch(cartUpdateInfoAction({data: cartList, isGetData: false, check}));
        setCheck(check);
        setCartList(cartList);
      })
    else {
      getSum(cartList);
      // 保存选中状态
      store.dispatch(cartUpdateInfoAction({check}));
    }
  }, [check, cartList])

  return (
    <div className='my-cart'>
      <Checkbox.Group value={check} onChange={val => setCheck(val)}>
        {
          cartList.map(item => (
            <div className='list-item' key={item.name}>
              <Checkbox className='item-check' value={item.id}/>
              <Image className='item-img' fit='contain' src={item.img}/>
              <div className='item-info'>
                <div className='item-name'>{item.name}</div>
                <div className='item-time'>
                  添加时间
                  <span>{format(item.create_time)}</span>
                </div>
                <div className='item-count'>
                  数量
                  <Stepper min={1} defaultValue={item.buy_count} onChange={val => {
                    item.buy_count = val;
                    getSum(cartList);
                  }}/>
                </div>
                <div className='item-price'>
                  <span>￥{item.original_price}</span>
                  <span>￥{item.price}</span>
                </div>
              </div>
              <CloseOutline className='item-close' onClick={() => handleDelete(item.name)}/>
            </div>
          ))
        }
      </Checkbox.Group>

      <div className='cart-bar'>
        <div className='buy-total'>
          合计: <span>￥{sum.total}</span>
        </div>
        <Button className='buy-btn'>去结算 {sum.count !== 0 ? `(${sum.count})` : ''}</Button>
      </div>
    </div>
  );
}

export default ExistAccount;