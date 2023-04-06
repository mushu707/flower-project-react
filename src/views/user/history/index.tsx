import React, {useEffect, useState} from 'react';
import {LayOut} from "../../../utils";
import PopBar from "../../../components/NavBar/PopBar";
import {deleteHistory, getHistory} from "../../../api";
import {HistoryType} from "../../../utils/interface";
import {formatTimestampToDay, dateResort} from "../../../utils";
import {Button, Checkbox, Image, Toast} from "antd-mobile";
import {useNavigate} from "react-router-dom";
import classnames from "classnames";
import './index.scss';

function ViewHistory() {

  const [history, setHistory] = useState<{date: string, data: HistoryType[]}[]>([]);
  const [value, setValue] = useState<string[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const getHistoryData = () => {
    getHistory().then(res => setHistory(dateResort(res.data.history)));
  }
  const beforeDeleteHistory = () => {
    if (value.length){
      deleteHistory(value).then(res => {
        if (res.code === 200) getHistoryData()
        else Toast.show({content: res.message, icon: 'fail'});
      }).catch(err => Toast.show({content: err}));
    }
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '历史浏览记录', right: <div className='top-right'>
          <span className='edit' onClick={() => setIsEdit(pre => !pre)}>编辑</span>
          <PopBar/>
        </div>}}
  ), [])

  useEffect(getHistoryData, [])

  return (
    <>
      {history.map(item =>
        <div className='view-item' key={item.date}>
          <div className='date'>{formatTimestampToDay(item.date)}</div>
          {item.data.map(data =>
            <Checkbox.Group value={value} key={data.g_id} onChange={val => setValue(val as string[])}>
              <div className='data'>
                <Checkbox className={classnames('data-check', !isEdit ? 'hidden' : '')} value={data.g_id}/>
                <div className='data-body' onClick={() => navigate(`/goods/${data.g_id}`)}>
                  <Image className='data-img' src={data.g_info.img}></Image>
                  <div className='data-info'>
                    <div className='data-info-title'>
                      <span>{data.g_info.name}</span>
                      <span>{data.g_info.material}</span>
                    </div>
                    <div className='data-info-price'>
                      <span>￥</span>
                      <span>{data.g_info.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Checkbox.Group>
          )}
        </div>
      )}
      <div className={classnames('bottom-bar', !isEdit ? 'hidden' : '')}>
        <Button className='delete-btn' onClick={beforeDeleteHistory}>删除</Button>
      </div>
    </>
  );
}

export default ViewHistory;