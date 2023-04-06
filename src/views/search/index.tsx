import React, {useEffect, useState} from 'react';
import classnames from "classnames";
import {GoodsType, SearchModeProps} from "../../utils/interface";
import {getMoreData, getSearchList} from "../../api";
import GoodsBox from "../../components/GoodsBox";
import {FilterOutline} from 'antd-mobile-icons';
import {LayOut, sortSearchList} from "../../utils";
import {useLocation} from "react-router-dom";
import EmptySearch from "./empty";
import Pop from "./pop";
import {InfiniteScroll} from "antd-mobile";
import PopBar from "../../components/NavBar/PopBar";
import './index.scss';

function Search() {

  const [activeKey, setActiveKey] = useState(1);
  const [resList, setResList] = useState<GoodsType[]>([]);
  const [popVisible, setPopVisible] = useState(false);
  const [begin, setBegin] = useState(0);
  const [count] = useState(7);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const key = decodeURI(location.pathname.split('/')[2]);
  const style = location.state;
  const filter: SearchModeProps[] = [
    {id: 1, title: '综合', func: () => sortSearchList(resList, 'id', 0)},
    {id: 2, title: '销量', func: () => sortSearchList(resList, 'sale_count', 1)},
    {id: 3, title: '价格', func: () => sortSearchList(resList, 'price', 1)},
  ];

  const handleActive = (item: SearchModeProps) => {
    setActiveKey(item.id);
    if (item.func) item.func();
  }
  const loadMoreData = async () => {
    if (resList.length >= count){
      const res: GoodsType[] = await getMoreData({key, style, begin, count});
      setBegin(prev => prev + count);
      setResList(prev => [...prev, ...res]);
      if (res.length === 0) setHasMore(false);
    }else setHasMore(false);
  }

  useEffect(() => LayOut(
    {tab_bar: false, nav_data: {backArrow: true, title: '相关商品', right: <PopBar/>}}
  ), []);

  useEffect(() => {
    getSearchList({key, style, begin: 0, count}).then(res => {
      setResList(res.data.searchList);
      setBegin(prev => prev + count);
    });
  }, [key, style])

  return (
    <>
      <div className='search-content'>
        <div className='search-type'>
          <div className='filter'>
            {
              filter.map(item =>
                <div className={classnames('filter-item', activeKey === item.id && 'active')}
                     key={item.id}
                     onClick={() => handleActive(item)}>
                  {item.title}
                  {/*{item.icon}*/}
                </div>
              )}
            {
              style ? <div className='filter-item' onClick={() => setPopVisible(true)}>
                筛选 <FilterOutline fontSize={16}/>
              </div>
                : <></>
            }
          </div>
          <div className='purpose'/>
        </div>
        {
          resList.length
            ? <>
              <GoodsBox data={resList} type='desc'/>
              <InfiniteScroll loadMore={loadMoreData} hasMore={hasMore}/>
            </>
            : <EmptySearch/>
        }
      </div>

      {
        style ?
          <Pop
            style={style as string}
            visible={popVisible}
            onMaskClick={() => setPopVisible(false)}/>
          : <></>
      }
    </>
  );
}

export default Search;