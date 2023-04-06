import React, {useEffect, useRef} from 'react';
import {Button, Form, Input, Toast} from "antd-mobile";
import {LayOut} from "../../../../utils";
import {InputRef} from "antd-mobile/es/components/input";
import {resetPassword} from "../../../../api";
import {useNavigate} from "react-router-dom";
import './index.scss';

function ResetPsw() {

  const psw = useRef<InputRef>(null);
  const navigate = useNavigate();

  const rules = [{
    required: false, validator: (rule: any, value: string) => {
      switch (rule.fullField) {
        case 'oldPsw':
          return checkPsw(value, '请输入旧密码');
        case 'newPsw':
          return checkPsw(value, '请输入新密码');
        case 'checkNewPsw':
          if (psw.current!.nativeElement!.value !== value)
            return Promise.reject('两次输入新密码不一致，请重新输入');
          else return Promise.resolve();
      }
    }
  }];

  const checkPsw = (value: string, message: string) => {
    if (value === '' || value === undefined) return Promise.reject(message);
    else if (value.includes(' ')) return Promise.reject('密码不能含有空格');
    else return Promise.resolve();
  }

  const finish = (value: any) => {
    resetPassword(value).then(res => {
      if (res.code === 200) {
        Toast.show({content: '修改密码成功 !', icon: 'success'});
        navigate(-1);
      } else Toast.show({content: res.message, icon: 'fail'});
    })
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '重置密码'}}
  ), [])

  return (
    <div className='reset-content'>
      <Form
        onFinish={finish}
        footer={<>
          <Button type='submit' shape='rounded' block size='large' className='reset-psw-btn'>确认</Button>
          <div className='forget-psw'>忘记密码</div>
        </>}>
        <Form.Item name='oldPsw' label='旧密码' rules={rules}>
          <Input className='psw-input' type='password'/>
        </Form.Item>
        <Form.Item name='newPsw' label='新密码' rules={rules}>
          <Input className='psw-input' type='password' ref={psw}/>
        </Form.Item>
        <Form.Item name='checkNewPsw' label='再次确认新密码' rules={rules} dependencies={['newPsw']}>
          <Input className='psw-input' type='password'/>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPsw;