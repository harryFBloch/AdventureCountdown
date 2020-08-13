import React, { ReactElement, useEffect, useState } from 'react';
import { IonMenu, IonToolbar, IonHeader, IonTitle, IonContent, IonButton, IonList, IonItem, IonLabel, IonText, IonMenuToggle, IonIcon, IonAlert, IonToast } from '@ionic/react';
import { connect } from 'react-redux';
import "react-datepicker/dist/react-datepicker.css"
import { bindActionCreators } from 'redux';
import { RootState, ThunkDispatchType, actions, Auth, Adventures, Toast } from '../store';
import classes from './LeftMenu.module.css';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';
import { logout } from '../store/auth/actions';

interface ReduxStateProps {
  products: IAPProduct[];
  removeAds: boolean;
  auth: Auth;
  adventures: Adventures;
  toast: Toast,
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  products: state.flags.products,
  removeAds: state.flags.removeAds,
  auth: state.auth,
  adventures: state.adventures,
  toast: state.flags.toast
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  subscribe: (productID: string) => Promise<void>;
  initializeInter: () => Promise<void>;
  restorePurchase: () => Promise<void>;
  getAdventures: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  subscribe: actions.flags.subscribe,
  initializeInter: actions.flags.initializeInter,
  restorePurchase: actions.flags.restorePurchase,
  getAdventures: actions.adventures.getAdventures,
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const LeftMenu = ({ initializeInter, products, subscribe, removeAds, adventures, auth, restorePurchase, getAdventures, toast }: Props): ReactElement => {

  const [alert, setAlert] = useState(false)

  const handleInitializeAd = () => {
    initializeInter()
  }

  useEffect(() => {
    if(auth.uid !== '') {
      console.log('start up')
      handleInitializeAd();
      getAdventures();
    }
  }, [auth.uid])

  const renderProducts = (product: IAPProduct): ReactElement => {
    return(
      <IonButton className={classes.productButton} 
        onClick={() => subscribe(product.id)} key={product.id} 
        color="primary">
        Click Here to {products[0].title} For Only {products[0].price} a {products[0].billingPeriodUnit}
      </IonButton>
    )
  }

  const renderSessions = (): ReactElement => {
    return (
      <IonList className={classes.listContainer}>
        {Object.keys(adventures).map((id) => 
          <IonItem lines='none' button detail={false} key={adventures[id].id} color="secondary" routerDirection="none" routerLink={`/adventures/${id}`}>
            
          </IonItem>
        )}
      </IonList>
    )
  }

  return (
    <IonMenu side="start" menuId="left" contentId='main' color="secondary">
      <IonContent color="secondary">

        {renderSessions()}
        {!removeAds && products[0] && renderProducts(products[0])}
        <IonButton className={classes.productButton} onClick={restorePurchase}>Restore Purchases</IonButton>
        <IonButton className={classes.productButton} onClick={logout}>Logout</IonButton>
      </IonContent>
      <IonToast isOpen={toast.open} color={toast.color} message={toast.message} position="top"/>
    </IonMenu>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);