import React, { ReactElement, useEffect } from "react";
import {InAppPurchase2, IAPProduct, IAPProducts} from '@ionic-native/in-app-purchase-2';
import { connect } from 'react-redux';
import { RootState, ThunkDispatchType, actions } from "../../store";
import { bindActionCreators } from "redux";

const store = InAppPurchase2;

interface ReduxStateProps {
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
});

interface ReduxDispatchProps {
  getProducts: (products: IAPProducts) => Promise<void>;
  removeAds: () => Promise<void>
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  getProducts: actions.flags.getProducts,
  removeAds: actions.flags.removeAds
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const InAppPurchaseContainer = ({ getProducts, removeAds }: Props): ReactElement => {

  // in app purchase
  useEffect(() => {
    // store.verbosity = InAppPurchase2.DEBUG;
    store.register({
      id: 'removeAdsSubscription',
      type: InAppPurchase2.PAID_SUBSCRIPTION,
    })

    // Run some code only when the store is ready to be used
    store.ready(() =>  {
      getProducts(store.products)
    });

    store.when("removeAdsSubscription").updated((product: IAPProduct) => {
      if (product.owned)
          removeAds()
      else
          console.log('unowned')     
    });

    store.when('removeAdsSubscription')
     .approved((p: IAPProduct) => p.verify())
     .verified((p: IAPProduct) => p.finish())
     .owned((p: IAPProduct) => {
      if (p.owned) {
        removeAds();
      }
     });

    store.error(() => {
      console.log('error here')
    })

    store.refresh();
  }, [])

  // useEffect(() => {
  //   InAppPurchase
  //   .getProducts(['removeAdsSub'])
  //   .then((products) => {
  //     console.log('product',products);
  //     getProducts(products)
  //   })
  //   .catch((err) => {
  //     console.log('error',err);
  //   });
  // }, [getProducts])

  return (<></>)
}

export default connect(mapStateToProps, mapDispatchToProps)(InAppPurchaseContainer)