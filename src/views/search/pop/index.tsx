import React from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {Popup} from "antd-mobile";
import {CategoryType} from "../../../utils/interface";
import {store} from "../../../redux/store";
import './index.scss';

function Pop(props: {style: string, visible: boolean, onMaskClick: () => void}) {

  const key = decodeURI(useLocation().pathname.split('/')[2]);

  const category = () => {
    const data: CategoryType[] = store.getState().Category.data;
    return data.filter(item => item.style === props.style)[0];
  }

  return (
    <Popup
      position='right'
      visible={props.visible}
      onMaskClick={props.onMaskClick}
      bodyClassName='pop-content'>
      {
        category().categories.map(item =>
          <div className='pop-item' key={item.id}>
            <div className='pop-item-head'>{item.name.split('_')[1]}</div>
            <div className='pop-item-tag'>
              {
                item.tags.map(tag =>
                  <NavLink
                    className={key === tag.title ? 'active' : ''}
                    to={`/search/${tag.title}`}
                    state={props.style}
                    key={tag.id}>
                    {tag.title}
                  </NavLink>
                )
              }
            </div>
          </div>
        )
      }
      <div className='clean-check'>清除选择</div>
    </Popup>
  );
}

export default Pop;