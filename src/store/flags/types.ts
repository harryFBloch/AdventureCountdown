import { ActionType } from '../actionTypes';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';

export type Product = {
  productID: string,
  title: string,
  price: string,
  currency: string,
  priceAsDecimal: number,
}

export interface Toast { open: boolean, message: string, color: string }

export interface Flags {
  showInterAd: boolean,
  products: IAPProduct[],
  removeAds: boolean,
  toast: Toast,
}

// export const productTemplate: IAPProduct = {
//   id:"",
//   alias:"",
//   type:"",
//   state:"",
//   title: "",
//   description: "",
//   priceMicros: 0,
//   price:"",
//   currency: "",
//   loaded:true,
//   canPurchase:false,
//   owned:false,
//   introPrice: '',
//   introPriceMicros: undefined,
//   introPriceNumberOfPeriods: undefined,
//   introPriceSubscriptionPeriod: undefined,
//   introPricePaymentMode: undefined,
//   ineligibleForIntroPrice: undefined,
//   downloading: false,
//   downloaded:false,
//   additionalData:null,
//   transaction:null,
//   valid:false
// }

export type FlagsAction = 
  { type: ActionType.SHOW_INTER_AD} | 
  { type: ActionType.CLOSE_INTER_AD } |
  { type: ActionType.GET_PRODUCTS, products: IAPProduct[]} | 
  { type: ActionType.REMOVE_ADS } | 
  { type: ActionType.TOAST, toast: Toast} |
  { type: ActionType.TOAST_OFF }
  