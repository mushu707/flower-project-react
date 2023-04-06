import React, {useEffect, useState} from 'react';
import EmptyCart from "./empty";
import ExistAccount from "./exist";
import {LayOut} from "../../utils";
import {store} from "../../redux/store";
import {appInitAction} from "../../redux/actions";

function Cart() {

  const [token] = useState<string>(store.getState().User.token);
  const [cartCount] = useState<number>(store.getState().Cart.count);

  useEffect(() => {
    if (token) LayOut({tab_bar: false, nav_data: {backArrow: true, title: '购物车'}});
    else LayOut({nav_data: {backArrow: true, title: '购物车'}});

    return () => {
      store.dispatch(appInitAction());
    }
  }, [token])

  return (
    <div className='cart'>
      {
        token && cartCount ?
          <ExistAccount/>
          : <EmptyCart token={token}/>
      }
    </div>
  );
}

export default Cart;