import React, {useEffect, useState} from 'react';
import {LocationOutline, MoreOutline} from "antd-mobile-icons";
import {Cascader} from "antd-mobile";
import {CascaderOption} from "antd-mobile/es/components/cascader-view";
import axios from "axios";
import './index.scss';

function Location() {

  const [visible, setVisible] = useState(false);
  const [city, setCity] = useState<CascaderOption[]>([]);
  const data = new Date();

  useEffect(() => {
    axios.get('http://localhost:4000/city',
      {headers: {'Content-Type': 'application/json; utf-8'}}).then(res => {
      setCity(res.data.data);
    })
  }, [])

  return (
    <>
      <div className='location' onClick={() => setVisible(true)}>
        <div className='location-left'>配送至</div>
        <div className='location-center'>
          <LocationOutline/>
          <Cascader
            options={city}
            visible={visible}
            onClose={() => setVisible(false)}
            cancelText=''
          >
            {item => {
              if (item.every(i => i === null)) return '请选择配送地区';
              else return <>
                {item.map(item => item?.label).join(' ')}
              <div>现在下单，最快<span>今天{data.getHours() + 5}点前</span>送达</div>
              </>
            }}
          </Cascader>
        </div>
        <div className='location-right'>
          <MoreOutline/>
        </div>
      </div>
    </>
  );
}

export default Location;