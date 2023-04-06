import {
  APPLAYOUT, APPINIT, USERLOGIN, USERLOGOUT, CARTINIT, CARTADD, CARTDELETE, CARTUPDATE, CATEGORYHIDE,
  CATEGORYSHOW, HISTORYADD, HISTORYDELETE, CATEGORYACTIVE, CATEGORYDATA, USERUPDATE, COLLECTIONADD,
  COLLECTIONDELETE, COLLECTIONUPDATE, COLLECTIONINIT,
} from "./constant";
import {
  ActionStateProps, AppStateProps, UserStateProps, CartStateProps, CartType, CategoryType, CollectionStateProps,
} from "../utils/interface";

export const appLayoutAction = (data: AppStateProps): ActionStateProps => ({type: APPLAYOUT, data});
export const appInitAction = (): ActionStateProps => ({type: APPINIT});

export const userLoginAction = (data: UserStateProps): ActionStateProps => ({type: USERLOGIN, data});
export const userLogoutAction = (): ActionStateProps => ({type: USERLOGOUT});
export const userUpdateAction = (data: {name: string, imageUrl: string}): ActionStateProps => ({type: USERUPDATE, data});

export const cartAddAction = (): ActionStateProps => ({type: CARTADD});
export const cartDeleteAction = (data: {list: CartType[]}): ActionStateProps => ({type: CARTDELETE, data});
export const cartUpdateInfoAction = (data: CartStateProps): ActionStateProps => ({type: CARTUPDATE, data});
export const cartInitAction = (): ActionStateProps => ({type: CARTINIT});

export const categoryHideAction = (): ActionStateProps => ({type: CATEGORYHIDE});
export const categoryShowAction = (): ActionStateProps => ({type: CATEGORYSHOW});
export const categoryGetDataAction = (data: CategoryType[]): ActionStateProps => ({type: CATEGORYDATA, data});
export const categoryActiveAction = (data: string): ActionStateProps => ({type: CATEGORYACTIVE, data});
export const historyAddAction = (data: string): ActionStateProps => ({type: HISTORYADD, data});
export const historyDeleteAction = (): ActionStateProps => ({type: HISTORYDELETE});

export const collectionAddAction = (data: number): ActionStateProps => ({type: COLLECTIONADD, data});
export const collectionDeleteAction = (data: number): ActionStateProps => ({type: COLLECTIONDELETE, data});
export const collectionUpdateAction = (data: CollectionStateProps): ActionStateProps => ({type: COLLECTIONUPDATE, data});
export const collectionInitAction = (): ActionStateProps => ({type: COLLECTIONINIT});