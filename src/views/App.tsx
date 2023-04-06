import React, {useEffect, useState} from 'react';
import TopNav from "../components/NavBar";
import BottomNav from "../components/TabBar";
import MySearchBar from "../components/SearchBar";
import {store} from "../redux/store";
import {Toast} from "antd-mobile";

function App(props: any) {

  const [app, setApp] = useState(store.getState().App);

  Toast.config({duration: 700});

  useEffect(() => {
    store.subscribe(() => {
      setApp(store.getState().App);
    });
  }, [])

  return (
    <>
      { app.nav_bar ? <TopNav/> : <MySearchBar/>}
      { props.children }
      { app.tab_bar && <BottomNav/> }
    </>
  );
}

export default App;