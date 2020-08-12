import { ThunkResult, ThunkDispatchType } from '../types';
import { ActionType } from '../actionTypes';
import firebase from '../../config/FirebaseConfig';
import 'firebase/database';
import { RootState } from '..';

export const signUp = (email: string, password: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((data) => {
    if (data.user) {
      dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: data.user.uid})
      Promise.resolve();
    }
  })
  .catch((error) => Promise.reject(error))
};

export const login = (email: string, password: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((data) => {
    if (data.user) {
      dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: data.user.uid})
    }
  })
  .catch((error) => {
    console.log("Error", error)
    return Promise.reject(error);
  })
};

export const autoLoginSuccess = (uid: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  dispatch({type: ActionType.LOGIN_SUCCESSFUL, uid: uid});
}

export const autoLoginFailed = (): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  dispatch({type: ActionType.AUTO_LOGIN_FAILED});
}

export const registerUsername = (username: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
  const uid = getState().auth.uid
  // firebase.database().ref(`/usernames/${uid}`).set(username)
  return firebase.database().ref(`/users/${uid}/username`).set(username)
  .then((data) => {
    dispatch({type: ActionType.USERNAME_SUCCESS, username: username})
    
    Promise.resolve()
  })
  .catch((error) => {
    return Promise.reject(error);
  })
}

export const getUsername = (): ThunkResult<Promise<object>> =>
async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<object> => {
  return firebase.database().ref(`/users/${getState().auth.uid}/username`).once('value')
  .then((data): object => {
    const value = data.val();
    if (value) {
      dispatch({type: ActionType.USERNAME_SUCCESS, username: data.val()})
      return Promise.resolve({})
    } else {
      return Promise.reject({error: 'invalid-username'})
    }
  })
  .catch((error): object => {
    console.log(error)
    return Promise.reject({error: 'firebase error'})
  });
}

export const resetPassword = (email: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType ): Promise<void> => {
  return  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    dispatch({type: ActionType.PASSWORD_RESET_SUCCESS})
    Promise.resolve();
  })
  .catch((error): void => console.log("Error", error))
};

export const logout = () => {
  firebase.auth().signOut();
}