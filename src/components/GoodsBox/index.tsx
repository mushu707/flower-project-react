import React from 'react';
import {Grid} from "antd-mobile";
import {GoodsBoxProps} from "../../utils/interface";
import Info from "./Info";
import Desc from "./Desc";
import {useNavigate} from "react-router-dom";

function GoodsBox(props: GoodsBoxProps) {

  const navigate = useNavigate();

  return (
    <Grid columns={props.columns ? props.columns : 1} gap={props.gap}>
      {
        props.data.map(data =>
          <Grid.Item key={data.id} span={props.item_span} onClick={() => navigate(`/goods/${data.id}`)}>
            {
              props.type === 'info' ? <Info data={data}/>
                : <Desc data={data}/>
            }
          </Grid.Item>
        )
      }
    </Grid>
  );
}

export default GoodsBox;