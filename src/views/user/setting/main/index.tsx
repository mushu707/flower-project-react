import React, {useEffect} from 'react';
import {LayOut} from "../../../../utils";
import {RightOutline, FrownOutline, SmileOutline} from "antd-mobile-icons";
import {Button, Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import {logout} from "../../../../api";
import {store} from "../../../../redux/store";
import {cartInitAction, collectionInitAction, userLogoutAction} from "../../../../redux/actions";
import PopBar from "../../../../components/NavBar/PopBar";
import './index.scss';

function SettingMain() {

  const navigate = useNavigate();
  const setting = [
    {id: 1, title: '个人资料', link: '/user/setting/account'},
    {id: 2, title: '修改密码', link: '/user/setting/reset_psw'},
    {id: 3, title: '反馈建议', link: ''},
  ];

  const toLink = (link: string) => {
    if (link) navigate(link);
    else Toast.show({content: '抱歉，该功能暂未实现', icon: <FrownOutline />});
  }

  const beforeLogout = () => {
    logout().then(res => {
      if (res.code === 200){
        store.dispatch(userLogoutAction());
        store.dispatch(cartInitAction());
        store.dispatch(collectionInitAction());
        Toast.show({content: `欢迎下次光临`, icon: <SmileOutline/>});
        navigate('/user');
      }else Toast.show({content: '退出账户失败 !', icon: 'fail'})
    });
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {left: '', backArrow: true, title: '设置', right: <PopBar/>}}
  ), [])

  return (
    <div className='setting'>
      {
        setting.map(item =>
          <div className='setting-item' key={item.id} onClick={() => toLink(item.link)}>
            <div className='setting-item-title'>{item.title}</div>
            <div className='setting-item-link'><RightOutline/></div>
          </div>
        )
      }
      <Button
        shape='rounded'
        size='large' block
        className='logout-brn'
        onClick={beforeLogout}>退出账户</Button>
    </div>
  );
}

export default SettingMain;