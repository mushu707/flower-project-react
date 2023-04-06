import React from 'react';
import {AutoCenter, Grid, Image} from "antd-mobile";
import {FuncProps} from "../../utils/interface";
import './index.scss';
import {useNavigate} from "react-router-dom";

function FuncBox(props: FuncProps) {

  const navigate = useNavigate();
  const search = (key: string, state: string) => navigate(key, {state});

  return (
    <Grid columns={props.columns} gap={props.gap}>
      {
        props.data.map(item => (
          <Grid.Item key={item.id} onClick={props.cbType ? () => search(`/search/${item.title}`, item.style!) : item.callback}>
            <AutoCenter>
              {
                props.iconType && item.icon
                  ? <Image src={item.icon as string} width={props.iconSize}/>
                  : <div className='func-icon'>{item.icon}</div>
              }
            </AutoCenter>
            <AutoCenter>
              <div className='func-title' style={props.style}>{item.title}</div>
            </AutoCenter>
          </Grid.Item>
        ))
      }
    </Grid>
  );
}

export default FuncBox;