import { ThunkResult, ThunkDispatchType } from "../types";
import { ActionType } from "../actionTypes";
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { AdOptions } from '@rdlabo/capacitor-admob';
import { AdMobIntersitionalIOS } from '../../config/FirebaseConfig';
import { IAPProducts, InAppPurchase2 } from "@ionic-native/in-app-purchase-2";
import { RootState } from "..";
import { Toast } from "./types";

const { AdMob } = Plugins;

const addID = {
  ios: AdMobIntersitionalIOS, 
  android: '',
}

const platformID = isPlatform('android') ? addID.android : addID.ios;

const options: AdOptions = {
  adId: platformID,
}

export const showInterAd = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
    // dispatch({type: ActionType.SHOW_INTER_AD});
    if (!getState().flags.removeAds){
      AdMob.showInterstitial(options);  
    }
}

export const closeInterAd = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType): Promise<void> => {
    dispatch({type: ActionType.CLOSE_INTER_AD});
}

export const initializeInter = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType, getState: () => RootState ): Promise<void> => {
    if (!getState().flags.removeAds) {
      AdMob.initialize();
      AdMob.prepareInterstitial(options);
    }
}

export const getProducts = (products: IAPProducts): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType): Promise<void> => {
    dispatch({type: ActionType.GET_PRODUCTS, products: products});
}

export const subscribe = (productID: string): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  InAppPurchase2.order(productID)
}

export const removeAds = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType): Promise<void> => {
    dispatch({type: ActionType.REMOVE_ADS});
}

export const restorePurchase = (): ThunkResult<Promise<void>> =>
  async ( dispatch: ThunkDispatchType): Promise<void> => {
    InAppPurchase2.refresh()
}

export const sendToast = (toast: Toast): ThunkResult<Promise<void>> =>
async ( dispatch: ThunkDispatchType): Promise<void> => {
  dispatch({type: ActionType.TOAST, toast: toast});
  setTimeout(() => dispatch({type: ActionType.TOAST_OFF}), 3000);
}
