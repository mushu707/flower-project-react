import {CATEGORYACTIVE, CATEGORYDATA, CATEGORYHIDE, CATEGORYSHOW, HISTORYADD, HISTORYDELETE} from "../constant";
import {CategoryStateProps} from "../../utils/interface";

const initState: CategoryStateProps = {
  showCategory: true,
  history: [],
  active: '1',
  data: []
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  switch (type){
    case CATEGORYHIDE:
      return {...state, showCategory: false};
    case CATEGORYSHOW:
      return {...state, showCategory: true};
    case CATEGORYDATA:
      return {...state, data}
    case CATEGORYACTIVE:
      return {...state, active: data}
    case HISTORYADD:
      const {history} = state;
      return {...state, history: [...history!, data]};
    case HISTORYDELETE:
      return {...state, history: []};
    default:
      return state;
  }
}

export default reducer;