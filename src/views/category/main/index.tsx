import React, {useEffect, useState} from 'react';
import {LayOut} from "../../../utils";
import {Image, SideBar} from "antd-mobile";
import classnames from "classnames";
import FuncBox from "../../../components/FuncBox";
import {getCategory} from "../../../api";
import {CategoryType} from "../../../utils/interface";
import {store} from "../../../redux/store";
import {categoryActiveAction, categoryGetDataAction} from "../../../redux/actions";
import './index.scss';

function Main() {
  
  const [activeKey, setActiveKey] = useState<string>(store.getState().Category.active);
  const [category, setCategory] = useState<CategoryType[]>(store.getState().Category.data);
  const changeActive = (val: string) => {
    store.dispatch(categoryActiveAction(val));
    setActiveKey(val);
  }

  useEffect(() => LayOut({nav_bar: false}), [])

  useEffect(() => {
    getCategory().then(res => {
      const {category} = res.data;
      store.dispatch(categoryGetDataAction(category))
      setCategory(category)
    })
  }, [])

  return (
    <div className='category'>
        <div className='side'>
          <SideBar className='sidebar' activeKey={activeKey} onChange={changeActive}>
            { category.map(item => <SideBar.Item key={item.id} title={item.name}/>) }
          </SideBar>
        </div>

        <div className='main'>
          {
            category.map(item => (
              <div className={classnames('content', activeKey === `${item.id}` && 'active')} key={item.id}>
                <Image className='head-img' src={item.m_img}/>
                {
                  item.categories.map(data => (
                    <div className='item' key={data.id}>
                      <div className='item-title'>{data.name.split('_')[1]}</div>
                      <div className='item-body'>
                        <FuncBox
                          data={data.tags}
                          columns={3} gap={15}
                          style={{color: '#9e9e9e'}}
                          cbType='onClickSearch' iconType iconSize={56}/>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
  );
}

export default Main;