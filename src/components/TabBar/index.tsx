import React, {useEffect, useState} from 'react';
import {AppOutline, UnorderedListOutline, KoubeiOutline, UserOutline, ExclamationTriangleOutline} from 'antd-mobile-icons'
import {TabBar, Toast} from "antd-mobile";
import {useLocation, useNavigate} from "react-router-dom";
import {TabsProps} from "../../utils/interface";
import {store} from "../../redux/store";
import './index.scss';

export const tabs: TabsProps[] = [
  {key: '/', icon: <AppOutline />, text: '首页'},
  {key: '/category', icon: <UnorderedListOutline />, text: '分类'},
  {key: '/cart', icon: <KoubeiOutline />, text: '购物车'},
  {key: '/user', icon: <UserOutline />, text: '我的'},
];

function BottomNav() {

  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState<number>(store.getState().Cart.count);

  useEffect(() => {
    let isApiSubscribed = true;
    if (!cartCount)
      setCartCount(store.getState().Cart.count);
    else{
      store.subscribe(() => {
        // ※ 添加isApiSubscribed条件减少useEffect的异步操作，避免重复多余更新组件状态
        if (cartCount !== store.getState().Cart.count && isApiSubscribed){
          setCartCount(store.getState().User.cartCount)
          console.log('设置了CartCount', cartCount, store.getState().Cart.count)
        }
      })
    }
    return () => {
      isApiSubscribed = false;
      console.log('tabBar组件销毁')
    }
  }, [cartCount])

  return (
    <div className='tabBar'>
      <TabBar activeKey={location.pathname} onChange={(path: string) => {
        if (location.pathname !== path) navigate(path);
        else Toast.show({content: '请勿重复跳转该页面', icon: <ExclamationTriangleOutline />});
      }}>
        {tabs.map(item =>
          <TabBar.Item
            key={item.key}
            icon={item.icon}
            title={item.text}
            badge={item.key === '/cart' && cartCount ? cartCount : null}/>
        )}
      </TabBar>
    </div>
  );
}

export default BottomNav;