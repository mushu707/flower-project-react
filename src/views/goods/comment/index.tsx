import React from 'react';
import {LocationOutline, RightOutline} from "antd-mobile-icons";
import {Image, ImageViewer, Rate} from "antd-mobile";
import './index.scss';

function Comment() {

  const comments = [
    {
      id: 1,
      user: '闪*',
      avatar: 'https://img.hua.com/Avatar/ThirdLogo/2022/2/24/3832713.jpg',
      comment: '服务赞赞赞 花也特别好看 名字也很阳光',
      commentImg: [
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/f52f3ea6d1354a7f802838db8a5794a1.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/6616febc1f2845cb902dd5fb6771de43.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/03/03/11a80c2053834a8c890f5f34290a4d81.jpg'
      ],
      score: 5,
      address: '北京朝阳区'},
    {
      id: 2,
      user: '梦*晓',
      avatar: 'https://img.hua.com/Avatar/ThirdLogo/2017/1/2/1693649.jpg',
      comment: '新鲜粉粉的很漂亮，闺蜜非常喜欢',
      commentImg: [
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/ec99daf5ef844ea4a4c315ddc91c8571.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/db4ef7c3966e462ea5f77df90fc4c80e.jpg',
        'https://img.hua.com/reviewpic/wxmp/2022/01/25/861676ce3e794732a404db1fd805ac1b.jpg'
      ],
      score: 4.5,
      address: '广东深圳市龙华区'},
    {
      id: 3,
      user: '谷*',
      avatar: 'https://img02.hua.com/pc/assets/img/avatar_default_04.jpg',
      comment: '满意，挺好看的',
      commentImg: [
        'https://img.hua.com/reviewpic/m/2020/12/14/fe8bc32402a34ebd9f0127e74491d382.jpg',
        'https://img.hua.com/reviewpic/m/2020/12/14/7e1697480835447591a14b042b675ca9.jpg',
        'https://img.hua.com/reviewpic/m/2020/12/14/cd14c6a10af04cc3ba268535997aed80.jpg'
      ],
      score: 4.7,
      address: '湖北武汉市武昌区'},
  ];

  const ShowImageViewList = (item: any, index: number) => {
    ImageViewer.Multi.show(
      {images: item.commentImg, defaultIndex: index}
    )
  }

  return (
    <div className='comments'>
      <div className='comments-head'>
        <div className='comments-head-title'>晒单与评价</div>
        <div className='comments-head-link'>
          最近已有{(Math.random() * 10000 + 1).toFixed(0)}条评论
          <RightOutline/>
        </div>
      </div>
      {
        comments.map(item =>
          <div className='comments-item' key={item.id}>
            <div className='comments-item-head'>
              <div className='comments-item-head-user'>
                <img src={item.avatar} className='comments-item-head-user-avatar' alt=''/>
                <span>{item.user}</span>
              </div>
              <Rate readOnly allowHalf value={item.score} className='comments-item-head-score'/>
            </div>
            <div className='comments-item-content'>{item.comment}</div>
            <div className='comments-item-imgList'>
              {
                item.commentImg.map((img, index) =>
                  <Image
                    key={index}
                    src={img}
                    fit='cover'
                    className='comments-item-imgList-img'
                    onClick={() => ShowImageViewList(item, index)}/>
                )
              }
            </div>
            <div className='comments-item-address'>
              <LocationOutline/>
              {item.address}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Comment;