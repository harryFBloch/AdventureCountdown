import { ActionType } from "../actionTypes";
import { Auth } from "./types";
import { RootAction } from "..";

const initialState: Auth = {
  uid: "",
  isLoading: true,
  username: '',
};

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {
  
    case (ActionType.LOGIN_SUCCESSFUL):
      return {...state, isLoading: false, uid: action.uid}

    case (ActionType.AUTO_LOGIN_FAILED):
      return {...state, isLoading: false, uid: ''}

    case (ActionType.USERNAME_SUCCESS):
      return {...state, username: action.username}
    default:
      return state;
  }
}