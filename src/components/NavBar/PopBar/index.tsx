import React from 'react';
import {Popover} from "antd-mobile";
import {tabs} from "../../TabBar";
import {UnorderedListOutline} from "antd-mobile-icons";
import {useNavigate} from "react-router-dom";

function PopBar() {

  const navigate = useNavigate();

  return (
    <Popover.Menu
      actions={tabs}
      placement='bottom'
      onAction={node => navigate(`${node.key}`)}
      trigger='click'
      destroyOnHide={true}
    >
      <UnorderedListOutline fontSize={22}/>
    </Popover.Menu>
  );
}

export default PopBar;