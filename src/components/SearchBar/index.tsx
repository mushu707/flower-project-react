import React, {useRef} from 'react';
import {Button, SearchBar} from "antd-mobile";
import {LeftOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
import {SearchBarRef} from "antd-mobile/es/components/search-bar";
import {store} from "../../redux/store";
import {categoryHideAction, categoryShowAction, historyAddAction} from "../../redux/actions";
import './index.scss';

function MySearchBar() {

  const ref = useRef<SearchBarRef>(null);
  const navigate = useNavigate();

  const toSearch = () => {
    const key = ref.current!.nativeElement!.value;
    if (key){
      store.dispatch(historyAddAction(key));
      navigate(`/search/${key}`, {state: null}); // state为空则后台会根据key值查询数据
    }else navigate('/search/guess', {state: null});
  }
  const toHistory = () => {
    if (store.getState().Category.showCategory) store.dispatch(categoryHideAction());
  }
  const toBack = () => {
    if (store.getState().Category.showCategory) navigate(-1);
    else store.dispatch(categoryShowAction());
  }

  return (
    <div className='my-search-bar'>
      <div className='back-btn'>
        <LeftOutline fontSize={24} onClick={toBack}/>
      </div>

      <SearchBar
        ref={ref}
        placeholder={'搜索鲜花、蛋糕、礼品'}
        className='search-bar'
        onFocus={toHistory}
        onSearch={toSearch}/>

      <Button
        className='search-btn'
        shape='rounded'
        size='mini'
        onClick={toSearch}>搜索</Button>
    </div>
  );
}

export default MySearchBar;