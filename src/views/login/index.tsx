import React, {useEffect, useState} from 'react';
import {AutoCenter, Button, Divider, Form, Image, Input, Toast} from "antd-mobile";
import FuncBox from "../../components/FuncBox";
import {LayOut} from "../../utils";
import {login} from "../../api";
import {useNavigate} from "react-router-dom";
import {cartUpdateInfoAction, collectionUpdateAction, userLoginAction} from "../../redux/actions";
import {store} from "../../redux/store";
import {UserStateProps} from "../../utils/interface";
import './index.scss';
import PopBar from "../../components/NavBar/PopBar";

function Login() {

  const navigate = useNavigate();
  const header = 'http://localhost:4000/assets/mobile/m_login/';
  const logo_url = 'http://localhost:4000/assets/home/m_logo.png';
  const rules = [
    {
      required: true, validator: (rule: any, value: string) => {
        switch (rule.fullField) {
          case 'name':
            if (value === '') return Promise.reject('用户名不能为空!');
            else if (/[ ]/.exec(value)) return Promise.reject('用户名不能含有空格符号!');
            else return Promise.resolve();
          case 'password':
            if (value === '') return Promise.reject('密码不能为空!');
            else if (/[/\\\\*:?"<>| ]/.exec(value)) {
              return Promise.reject('密码不能含有空格、特殊符号!')
            } else return Promise.resolve();
        }
      }
    }
  ];
  const login_way = [
    {id: 1, title: 'QQ', icon: <Image src={header + 'qq.svg'}/>},
    {id: 2, title: '微信', icon: <Image src={header + 'wechat.svg'}/>},
    {id: 3, title: 'bilibili', icon: <Image src={header + 'bilibili.svg'}/>},
    {id: 4, title: 'Google', icon: <Image src={header + 'google.svg'}/>},
  ];

  const [user] = useState<UserStateProps>(store.getState().User);

  const Login = async(value: any) => {
    await login({...value, identity: 'customer', mobile: true}).then((res) => {
      if (res.code === 200) {
        store.dispatch(userLoginAction({name: value.name, ...res.data}));
        store.dispatch(cartUpdateInfoAction({count: res.data.count.cartCount, isGetData: true}));
        store.dispatch(collectionUpdateAction({collection: res.data.collection}));
        Toast.show({content: '登录成功 !', icon: 'success'});
        navigate('/user');
      }else Toast.show({content: '用户名或者密码错误 !', icon: 'fail'});
    }).catch(_ => Toast.show({content: '该用户不存在 !', icon: 'fail'}));
  };

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '登录 / 注册', right: <PopBar/>}}
  ), []);

  useEffect(() => {
    if (user.token)
      navigate('/user');
  }, [user.token, navigate])

  return (
    <div className='loginPage'>
      <div className='logo'>
        <AutoCenter>
          <Image src={logo_url} width={200}/>
        </AutoCenter>
      </div>

      <div className='action-form'>
        <Form
          name='form'
          style={{'--border-top': 'none', '--border-bottom': 'none'}}
          onFinish={val => Login(val)}
          footer={
            <>
              <Button shape='rounded' block type='submit' size='large' className='action-btn'>登录 / 注册</Button>
              <AutoCenter>
                <div className='action-phone'>手机短信登录</div>
              </AutoCenter>
            </>
          }>
          <Form.Item name='name' label='用户名' rules={rules}>
            <Input placeholder='请输入用户名' clearable/>
          </Form.Item>
          <Form.Item name='password' label='密码' rules={rules}>
            <Input placeholder='请输入密码' clearable type='password'/>
          </Form.Item>
        </Form>
      </div>

      <div className='other-way'>
        <Divider>其他登录方式</Divider>
        <FuncBox data={login_way} columns={4} gap={10}/>
      </div>
    </div>
  )
}

export default Login;