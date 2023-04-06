import React, {useEffect, useState} from 'react';
import {store} from "../../redux/store";
import Main from "./main";
import History from "./history";

function Category() {

  const [isShow, setIsShow] = useState<boolean>(store.getState().Category.showCategory!);

  useEffect(() => {
    let isApiSubscribed = true;
    store.subscribe(() => {
      if (isApiSubscribed)
        setIsShow(store.getState().Category.showCategory!);
    })

    return () => {
      isApiSubscribed = false;
    }
  }, [])

  return (
    <>
      {
        isShow ? <Main/>
          : <History/>
      }
    </>
  );
}

export default Category;