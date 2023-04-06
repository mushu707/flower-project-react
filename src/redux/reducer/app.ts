import {APPLAYOUT, APPINIT} from "../constant";
import {AppStateProps} from "../../utils/interface";

const initState: AppStateProps = {
  nav_bar: true,
  tab_bar: true,
  nav_data: {left: '', right: '', title: '', backArrow: true}
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  switch (type){
    case APPLAYOUT:
      return {...state, ...data};
    case APPINIT:
      return {...initState};
    default:
      return state;
  }
}

export default reducer;