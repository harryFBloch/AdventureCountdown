import { IonPage, IonIcon, IonContent, IonButton, IonList, IonProgressBar, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonText } from '@ionic/react';
import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { RootState, ThunkDispatchType, actions, Adventures, Adventure, Toast } from '../store';
import { bindActionCreators } from 'redux';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { addOutline, trash, hammerOutline} from 'ionicons/icons';
import Toolbar from '../components/common/Toolbar';
import classes from './Home.module.css';
import { getTimeRemaining, percentDone } from '../utils/dates';
import { IAPProduct } from '@ionic-native/in-app-purchase-2';
import { subscribe } from '../store/flags/actions';

interface ReduxStateProps {
  removeAds: boolean;
  adventures: Adventures;
  products: IAPProduct[];
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  removeAds: state.flags.removeAds,
  adventures: state.adventures,
  products: state.flags.products,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  showInter: () => Promise<void>;
  deleteAdventure: (id: string) => Promise<void>;
  sendToast: (toast: Toast) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  showInter: actions.flags.showInterAd,
  deleteAdventure: actions.adventures.deleteAdventure,
  sendToast: actions.flags.sendToast
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & RouteComponentProps

const Home = ({ showInter, removeAds, adventures, history, deleteAdventure, sendToast, products}: Props): ReactElement => {

  const [trigger, setTrigger] = useState(false);

  const listRef = useRef<HTMLIonListElement>(null)

  const closeList = (): void => {
    if (listRef.current) {
      listRef.current.closeSlidingItems()
    }
  }


  useEffect(() => {
    if (!trigger) {
      setTrigger(true);
      setTimeout(() => setTrigger(false), 1000)
    }
  }, [trigger])

  const renderAdventure = (adventure: Adventure): ReactElement => {

    if (!adventure.adventureDeleted) {
      const timeRemaining = getTimeRemaining(adventure.date)
      return (
      <div  key={adventure.id}>
        <IonItemSliding>
          <IonItemOptions slot="end">
          <IonItemOption color="primary"
            onClick={() => {
              closeList()
              sendToast({open: true, message: 'Adventure Deleted', color: 'warning'})
              deleteAdventure(adventure.id)
              }}>
            <IonIcon slot="icon-only" icon={trash}/>
        </IonItemOption>
        
        <IonItemOption color="primary"
            onClick={() => {
              console.log('edit')
              history.push(`/adventure/${adventure.id}`)
              closeList();
              }}>
            <IonIcon slot="icon-only" icon={hammerOutline}/>
        </IonItemOption>

          </IonItemOptions>
          <IonItem  lines="none" draggable="true">
            <div className={classes.adventureContainer}>
              <div className={classes.title}>
                {adventure.title}
              </div>
              <div className={classes.timeContainer}>
                <div className={classes.time}>
                  <div className={classes.number}>{timeRemaining.days}</div>
                  <div className={classes.timeLabel}>days</div>
                </div>
                <div className={classes.time}>
                  <div className={classes.number}>{timeRemaining.hours}</div>
                  <div className={classes.timeLabel}>hours</div>
                </div>
                <div className={classes.time}>
                <div className={classes.number}>{timeRemaining.minutes}</div>
                  <div className={classes.timeLabel}>mins</div>
                </div>
                <div className={classes.time}>
                  <div className={classes.number}>{timeRemaining.seconds}</div>
                  <div className={classes.timeLabel}>sec</div>
                </div>
              </div>
            </div>
          </IonItem>
        </IonItemSliding>
        <IonProgressBar value={percentDone(adventure.dateCreated, adventure.date)}></IonProgressBar><br />
      </div>
      )
    } else {
      return <span key={adventure.id}></span>
    }
  }
    
  return (
    <IonPage>
      <Toolbar rightButtons={
        <IonButton routerLink='/adventure' routerDirection="forward">
          <IonIcon icon={addOutline}/>
        </IonButton>}/>
        <IonContent>

          <div className={classes.buttonContainer}>
            {products[0] && !removeAds &&
              <IonButton className={classes.button}
                onClick={() => subscribe(products[0].id)} key={products[0].id} 
                color="primary">
                Click Here to {products[0].title} For Only {products[0].price} a {products[0].billingPeriodUnit}
              </IonButton>
            }
          </div>
          
          <IonList ref={listRef} className={classes.listContainer}>
            {Object.keys(adventures).map((id) => renderAdventure(adventures[id]))}
          </IonList>
        </IonContent>
    </IonPage>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
