import React, {useEffect} from 'react';
import {ErrorBlock} from "antd-mobile";
import {LayOut} from "../../utils";

function NotFound() {
  const url = 'http://localhost:4000/assets/mobile/m_404/404.svg';

  useEffect(() => LayOut({tab_bar: false, nav_data: {backArrow: true, title: '404'}}), [])

  return (
    <ErrorBlock image={url} style={{'--image-height-full-page': '250px'}} fullPage/>
  );
}

export default NotFound;