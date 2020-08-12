import { ActionType } from "../actionTypes";
import { Adventures } from "./types";
import { RootAction } from "..";

const initialState: Adventures = {};

export default function auth(state=initialState, action: RootAction): typeof initialState  {
  switch (action.type) {

    case(ActionType.GET_ADVENTURES):
      return {...action.adventures}

    case(ActionType.CREATE_ADVENTURE):
      const newAdventure = {...action.adventure};
      const newState = {...state};
      if (newAdventure.id === '') {
        const id = String(Object.keys(state).length);
        newAdventure.id = id;
        newAdventure.dateCreated = String(new Date());
        return {...state, [id]: newAdventure};
      } else {
        newState[newAdventure.id] = newAdventure;
        return newState;
      }
    
    case(ActionType.DELETE_ADVENTURE):
      return {...state, [action.id]: {...state[action.id], adventureDeleted: true}}
    default:
      return state;
  }
}