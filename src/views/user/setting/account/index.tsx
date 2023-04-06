import React, {useEffect, useState} from 'react';
import {format, LayOut} from "../../../../utils";
import {Button, DatePicker, Form, ImageUploader, Input, Radio, Toast} from "antd-mobile";
import {getUserInfo, updateUserInfo} from "../../../../api";
import {UserInfoType} from "../../../../utils/interface";
import {store} from "../../../../redux/store";
import {userUpdateAction} from "../../../../redux/actions";
import dayjs from "dayjs";
import axios from "axios";
import './index.scss';

function Account() {

  const [info, setInfo] = useState<UserInfoType>();
  const [visible, setVisible] = useState(false);
  const [sex, setSex] = useState('1');
  const finish = (value: any) => {
    if (value.imageUrl[0]) value.imageUrl = value.imageUrl[0].url;
    else value.imageUrl = null;
    updateUserInfo(value).then(res => {
      if(res.code === 200){
        store.dispatch(userUpdateAction({name: value.name, imageUrl: value.imageUrl}));
        Toast.show({content: '用户信息修改成功 !', icon: 'success'});
      }else Toast.show({content: res.message, icon: 'fail'});
    })
  }
  const labelRender = (type: string, data: number) => {
    switch (type){
      case 'year':
        return data + '年';
      case 'month':
        return data + '月';
      case 'day':
        return data + '日';
    }
  }
  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    let url: string = '';
    formData.append('file', file);
    await axios.post('http://localhost:4000/user', formData, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(res => {
        if (res.data.code === 200) url = res.data.url;
      })
    return {url}
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '个人资料'}}
  ), [])

  useEffect(() => {
    getUserInfo().then(res => {
      setInfo(res.data);
    })
  }, [])

  return (
    <>{
        info ?
          <Form
            layout='horizontal'
            initialValues={{
              name: info.name,
              sex: info.sex,
              phone: info.phone,
              email: info.email,
              imageUrl: [{url: info.imageUrl, key: 1}]}}
            onFinish={finish} footer={
            <Button
              className='update-info-btn'
              type='submit' block
              shape='rounded' size='large'>保存</Button>
          }>
            <Form.Item name='imageUrl'>
              <ImageUploader
                className='user-info-avatar'
                upload={uploadAvatar}
                maxCount={1} preview/>
            </Form.Item>
            <Form.Item name='name' label='用户名'>
              <Input className='info-input' clearable/>
            </Form.Item>
            <Form.Item name='sex' label='性别'>
              <Radio.Group value={sex} onChange={val => setSex(val as string)}>
                <Radio value={1} className='sex-btn'>男</Radio>
                <Radio value={0} className='sex-btn'>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name='phone' label='手机号'>
              <Input className='info-input' clearable/>
            </Form.Item>
            <Form.Item name='email' label='邮箱'>
              <Input inputMode='email' className='info-input' clearable/>
            </Form.Item>
            <Form.Item name='birth' label='生日' trigger='onConfirm' onClick={() => setVisible(true)}>
              <DatePicker
                visible={visible}
                onClose={() => setVisible(false)}
                cancelText=''
                renderLabel={labelRender}>
                {value => value ? dayjs(value).format('YYYY-MM-DD') : format(info?.birth)}
              </DatePicker>
            </Form.Item>
          </Form>
          : <></>
      }</>
  );
}

export default Account;