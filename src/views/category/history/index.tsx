import React, {useEffect, useState} from 'react';
import {Dialog} from "antd-mobile";
import {DeleteOutline} from "antd-mobile-icons";
import {NavLink} from "react-router-dom";
import {LayOut} from "../../../utils";
import {store} from "../../../redux/store";
import {historyDeleteAction} from "../../../redux/actions";
import './index.scss';

function History() {

  const [history, setHistory] = useState(store.getState().Category.history as string[]);
  const hotSearch = [
    {id: 1, title: '爱情鲜花'},
    {id: 2, title: '向日葵'},
    {id: 3, title: '生日蛋糕'},
    {id: 4, title: '玫瑰'},
    {id: 5, title: '满天星'},
  ];
  const cleanHistory = async () => {
    const res = await Dialog.confirm({
      content: '确定要清空历史记录吗?',
      cancelText: '我要再想想',
      closeOnMaskClick: true});
    if (res){
      store.dispatch(historyDeleteAction());
      setHistory([]);
    }
  }

  useEffect(() => LayOut({nav_bar: false, tab_bar: false}), [])

  return (
    <div className='history'>
      {
        history && history.length ? <div className='history-search'>
          <div className='search-head'>
            <span>最近搜索</span>
            <DeleteOutline onClick={cleanHistory}/>
          </div>
          <div className='search-body'>
            {
              history.map((item, index) =>
                <NavLink to={`/search/${item}`} key={index}>{item}</NavLink>
              )
            }
          </div>
        </div> : <></>
      }
      <div className='hot-search'>
        <div className='search-head'>
          <span>热门搜索</span>
        </div>
        <div className='search-body'>
          {
            hotSearch.map(item => <NavLink to={`/search/${item.title}`} key={item.id}>{item.title}</NavLink>)
          }
        </div>
      </div>
    </div>
  );
}

export default History;