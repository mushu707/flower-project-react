import React, {useEffect, useState} from 'react';
import {AutoCenter, Avatar, Button, Card, Tag, Toast} from "antd-mobile";
import {BillOutline, ClockCircleOutline, CouponOutline, ExclamationTriangleOutline,
  HandPayCircleOutline, HistogramOutline, MessageOutline, PayCircleOutline,
  QuestionCircleOutline, RightOutline, SetOutline, SmileOutline, StarOutline,
  TagOutline, TravelOutline, TruckOutline, UserSetOutline
} from "antd-mobile-icons";
import FuncBox from "../../../components/FuncBox";
import {useNavigate} from "react-router-dom";
import {UserStateProps} from "../../../utils/interface";
import {store} from "../../../redux/store";
import {LayOut} from "../../../utils";
import './index.scss';

function UserMain() {

  const navigate = useNavigate();
  const [user, setUser] = useState<UserStateProps>(store.getState().User);
  const orderItem = [
    {id: 1, title: '待付款', icon: <HandPayCircleOutline />},
    {id: 2, title: '待收货', icon: <TruckOutline />},
    {id: 3, title: '待评价', icon: <MessageOutline />}
  ]
  const func = [
    {id: 1, title: '优惠券', icon: <CouponOutline />},
    {id: 2, title: '权益卡', icon: <BillOutline />},
    {id: 3, title: '余额', icon: <PayCircleOutline />},
    {id: 4, title: '收货地址', icon: <TravelOutline />},
    {id: 5, title: '生日纪念', icon: <ClockCircleOutline />},
    {id: 6, title: '收藏', icon: <StarOutline />, callback: () => beforeToLink('/user/collection')},
    {id: 7, title: '浏览记录', icon: <TagOutline />, callback: () => beforeToLink('/user/history')}
  ]
  const setting = [
    {id: 1, title: '在线客服', icon: <UserSetOutline />},
    {id: 2, title: '帮助中心', icon: <QuestionCircleOutline />},
    {id: 3, title: '关于我们', icon: <SmileOutline />},
    {id: 4, title: '设置', icon: <SetOutline />, callback: () => beforeToLink('/user/setting')},
  ]

  const beforeToLink = (to: string) => {
    if (user.token) navigate(to);
    else Toast.show({content: '请先登录', icon: <ExclamationTriangleOutline/>});
  }

  useEffect(() => LayOut({tab_bar: true, nav_data: {backArrow: true, title: '我的信息'}}), [])

  useEffect(() => {
    store.subscribe(() => {
      setUser(store.getState().User);
    })
  }, [])

  return (
    <>
      <div className='userInformation'>
        <AutoCenter className='user-login'>
          {
            user.token !== '' ?
              <div style={{display: "flex"}}>
                <Avatar src={user.imageUrl as string} style={{'--size': '60px'}}/>
                <div className='user-info' onClick={() => navigate('/user/setting/account')}>
                  <span className='name'>{user.name}</span>
                  <Tag round color={'#87CEFAFF'} className='score'>
                    <HistogramOutline fontSize={14} style={{marginRight: 7}}/>
                    999
                  </Tag>
                </div>
              </div>
              : <div>
                <p className='title'>Hi,welcome to Flower</p>
                <p className='login'>
                  <Button shape='rounded' className='btn-login' onClick={() => {
                    navigate('/login');
                  }}>登录/注册</Button>
                </p>
              </div>
          }
        </AutoCenter>
      </div>

      <div className='userOrder'>
        <Card title='我的订单' extra={
          <div>
            全部订单
            <RightOutline/>
          </div>}>
          <FuncBox data={orderItem} columns={3} gap={10}/>
        </Card>
      </div>

      <div className='userFunc'>
        <Card>
          <FuncBox data={func} columns={4} gap={30}/>
        </Card>
      </div>

      <div className='userSetting'>
        <Card>
          <FuncBox data={setting} columns={4} gap={30}/>
        </Card>
      </div>
    </>
  );
}

export default UserMain;