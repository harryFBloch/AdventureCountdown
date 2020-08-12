import { ThunkResult, ThunkDispatchType } from "../types";
import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { ActionType } from "../actionTypes";
import { RootState } from "..";
import { Adventure } from "./types";


export const createOrUpdateAdventure = (adventure: Adventure): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
    dispatch({type: ActionType.CREATE_ADVENTURE, adventure: adventure})
    const newAdventure = getState().adventures[String(Object.keys(getState().adventures).length - 1)]
    return firebase.database().ref(`/users/${getState().auth.uid}/${newAdventure.id}`).set(newAdventure);
}

export const getAdventures = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
    return firebase.database().ref(`/users/${getState().auth.uid}/`).once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        dispatch({type: ActionType.GET_ADVENTURES, adventures: snapshot.val()})
      } else {
        Promise.reject()
      }
    })

}

export const deleteAdventure = (id: string): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
    dispatch({type: ActionType.DELETE_ADVENTURE, id: id})
    return firebase.database().ref(`/users/${getState().auth.uid}/${id}/adventureDeleted`).set(true);
}