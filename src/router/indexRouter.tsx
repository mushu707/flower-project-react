import React from 'react';
import {useLocation, useRoutes} from 'react-router-dom';
import {AutoCenter, DotLoading} from "antd-mobile";
import User from "../views/user";
import {store} from "../redux/store";
import './index.scss';

function IndexRouter(){

  const location = useLocation();

  const LazyLoad = (callback: any) => {
    const Comp = React.lazy(callback);
    return (
      <React.Suspense fallback={<AutoCenter style={{marginTop: 20}}><DotLoading style={{fontSize: 30}} color='#e8486c'/></AutoCenter>}>
        <Comp/>
      </React.Suspense>
    )
  }

  const router = useRoutes([
    {path: '/', element: LazyLoad(() => import('../views/home'))},
    {path: '/login', element: LazyLoad(() => import('../views/login'))},
    {path: '/search/:key', element: LazyLoad(() => import('../views/search'))},
    {path: '/category', element: LazyLoad(() => import('../views/category'))},
    {path: '/cart', element: LazyLoad(() => import('../views/cart'))},
    {path: '/user', element: <User/>, children: [
        {path: '', element: LazyLoad(() => import('../views/user/main'))},
        {path: 'collection', element: LazyLoad(() => import('../views/user/collection'))},
        {path: 'history', element: LazyLoad(() => import('../views/user/history'))},
        {path: 'setting', element: LazyLoad(() => import('../views/user/setting')), children: [
            {path: '', element: LazyLoad(() => import('../views/user/setting/main'))},
            {path: 'account', element: LazyLoad(() => import('../views/user/setting/account'))},
            {path: 'reset_psw', element: LazyLoad(() => import('../views/user/setting/resetPsw'))}
          ]},
      ]},
    {path: '/goods/:id', element: LazyLoad(() => import('../views/goods'))},
    {path: '*', element: LazyLoad(() => import('../components/404'))},
  ])

  const changeStyleByPath = () => {
    const {Cart, User} = store.getState();
    const path = location.pathname;
    if ((path === '/cart' && Cart.count === 0 && User.token) || path === '/category' || path.includes('/search')) return false;
    else return true;
  }

  return (
    <div className={ changeStyleByPath() ? 'content' : 'tab-bar-hidden-content'}>
      {router}
    </div>
  )
}

export default IndexRouter;