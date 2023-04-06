import {USERLOGIN, USERLOGOUT, USERUPDATE} from "../constant";
import {UserStateProps} from "../../utils/interface";

const initState: UserStateProps = {
  name: '',
  imageUrl: '',
  token: '',
  identity: '',
  loginTime: '',
  cartCount: 0,
}

const reducer = (state = initState, action: any) => {
  const {type, data} = action;
  switch (type){
    case USERLOGIN:
      return {...state, ...data};
    case USERLOGOUT:
      return {...initState};
    case USERUPDATE:
      return {...state, ...data};
    default:
      return state;
  }
}

export default reducer;