import React, { ReactElement, useState, useEffect } from 'react';
import { IonPage, IonContent, IonItem, IonInput, IonLabel, IonDatetime, IonButton } from '@ionic/react';
import Toolbar from '../components/common/Toolbar';
import { AdventureTemplate, RootState, ThunkDispatchType, actions, Adventure, Adventures, Toast } from '../store';
import classes from './Adventure.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Loading from '../components/common/Loading';

interface ReduxStateProps {
  removeAds: boolean;
  adventures: Adventures;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  removeAds: state.flags.removeAds,
  adventures: state.adventures,
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  showInter: () => Promise<void>;
  createOrUpdateAdventure: (adventure: Adventure) => Promise<void>;
  sendToast: (toast: Toast) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  showInter: actions.flags.showInterAd,
  createOrUpdateAdventure: actions.adventures.createOrUpdateAdventure,
  sendToast: actions.flags.sendToast,
}, dispatch);

interface MatchParams {
  id?: string;
}
interface MatchProps extends RouteComponentProps<MatchParams>{}

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & MatchProps


export const AddAdventure = ({ createOrUpdateAdventure, match, adventures, sendToast }: Props): ReactElement => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (Object.keys(adventures).length > 0 && match.params.id) {
      const adventure = adventures[match.params.id];
      setTitle(adventure.title);
      setNote(adventure.note);
      setDate(adventure.date);
    }
  }, [adventures, match])

  const handleCreateORUpdate = (): void => {
    const adventure = match.params.id ? {...adventures[match.params.id]} : {...AdventureTemplate};
    adventure.title = title;
    adventure.note = note;
    adventure.date = date;
    adventure.id = match.params.id ? match.params.id : ''
    createOrUpdateAdventure(adventure);
    sendToast({open: true, message: match.params.id ? "Updating Your Adventure" : "Starting Your New Adventure", color: 'primary'});
  }


  return (
    <IonPage>
      <Toolbar back />
      {adventures && 
      <IonContent>
        <div className={classes.pageContainer}>
          <IonItem lines="full" color="light">
            <IonInput value={title} placeholder="Title..." 
              onIonChange={(e) => {
                setTitle(e.detail.value!)
                }}/>
          </IonItem>
          <IonItem lines="full" color="light">
            <IonInput value={note} placeholder="Note..." 
              onIonChange={(e) => {
                setNote(e.detail.value!)}}/>
          </IonItem>

          <IonItem lines="full" color="light">
            <IonLabel>Date</IonLabel>
            <IonDatetime displayFormat="MM/DD/YY" placeholder="Select Date" value={date} 
              onIonChange={e => setDate(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonItem lines="full" color="light">
            <IonLabel>Time</IonLabel>
            <IonDatetime displayFormat="h:mm A" placeholder="Select Time" value={date} 
              onIonChange={e => setDate(e.detail.value!)}></IonDatetime>
          </IonItem>

          <IonButton className={classes.button} 
          disabled={title === '' || date === ''}
          routerLink="/home" routerDirection="back" 
          onClick={handleCreateORUpdate}>
            Save Adventure
          </IonButton>

          <IonButton color="light" className={classes.button}>
            + Add Reminder
          </IonButton>
        </div>
      </IonContent>}
      {!adventures && <Loading /> }
    </IonPage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdventure)