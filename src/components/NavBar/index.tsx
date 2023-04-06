import React, {useEffect, useState} from 'react';
import {Dialog, NavBar} from "antd-mobile";
import {useLocation, useNavigate} from "react-router-dom";
import {CartType, NavType} from "../../utils/interface";
import {store} from "../../redux/store";
import {updateCart} from "../../api";
import './index.scss';

function TopNav() {

  const [nav, setNav] = useState<NavType>(store.getState().App.nav_data);
  const location = useLocation();
  const navigate = useNavigate();

  const beforeNavigate = async() => {
    const {Cart, User} = store.getState();
    if (location.pathname === '/cart' && Cart.count && User.token){
      const result = await Dialog.confirm({content: '是否保存当前购物车?'});
      if (result) {
        const {data, check} = Cart;
        data.forEach((item: CartType) => {
          console.log(check.includes(item.id), item.name)
          if (check.includes(item.id)) item.isChecked = 1;
          else item.isChecked = 0;
        });
        updateCart(data);
      }
    }
    navigate(-1);
  }

  useEffect(() => {
    store.subscribe(() => {
      setNav(store.getState().App.nav_data)
    })
  }, [location.pathname]);

  return (
    <div className='navBar'>
      <NavBar backArrow={nav.backArrow} left={nav.left} right={nav.right} onBack={() => beforeNavigate()}>
        <span style={{fontSize: 18}}>{nav.title}</span>
      </NavBar>
    </div>
  );
}

export default TopNav;