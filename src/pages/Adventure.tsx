import React, { ReactElement, useState, useEffect } from 'react';
import firebase from '../config/FirebaseConfig';
import 'firebase/analytics';
import { IonPage, IonContent, IonItem, IonInput, IonLabel, IonDatetime, IonButton, IonList, IonIcon } from '@ionic/react';
import Toolbar from '../components/common/Toolbar';
import { AdventureTemplate, RootState, ThunkDispatchType, actions, Adventure, Adventures, Toast, ReminderTemplate, Reminders } from '../store';
import classes from './Adventure.module.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Loading from '../components/common/Loading';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { trash } from 'ionicons/icons';
import { removeNotifications } from '../store/adventures/actions';

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


export const AddAdventure = ({ createOrUpdateAdventure, match, adventures, sendToast, showInter }: Props): ReactElement => {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');
  const [reminders, setReminders] = useState<Reminders>({})

  useEffect(() => {
    if (Object.keys(adventures).length > 0 && match.params.id) {
      const adventure = adventures[match.params.id];
      setTitle(adventure.title);
      setNote(adventure.note);
      setDate(adventure.date);
      setReminders({...adventure.reminders})
    }
  }, [adventures, match])
  
  const handleSetupNotifications = () => {
    const deletedReminders = Object.values(reminders).filter((reminder) => reminder.deleted)
    const deletedReminderIds = deletedReminders.map((reminder) => reminder.id)
    removeNotifications(deletedReminderIds, () => {
      Object.values(reminders).forEach((reminder) => {
        const d = new Date(date);
        d.setDate(d.getDate() - reminder.daysBefore)
        console.log('handleetupNotif', d)
        if (!reminder.deleted) {
          LocalNotifications.schedule({
            id: match.params.id ? Number(match.params.id) : Object.keys(adventures).length * 10 + Number(reminder.id),
            title: 'Adventure Countdown',
            text: `${reminder.daysBefore} Days Until ${title}`,
            trigger: {at: new Date(new Date().setDate(new Date(date).getDate() - reminder.daysBefore))}
          })
        }
      })
    });
  }

  const handleNotificationForAdventure = () => {
    LocalNotifications.schedule({
      id: 0.5,
      title: 'Time For Your Adventure',
      text: `${title}: ${note}`,
      trigger: { at: new Date(date)}
    })
  }

  const handleCreateORUpdate = (): void => {
    handleSetupNotifications()
    const adventure = match.params.id ? {...adventures[match.params.id]} : {...AdventureTemplate};
    adventure.title = title;
    adventure.note = note;
    adventure.date = date;
    adventure.id = match.params.id ? match.params.id : ''
    adventure.reminders = reminders

    createOrUpdateAdventure(adventure);
    showInter();
    sendToast({open: true, message: match.params.id ? "Updating Your Adventure" : "Starting Your New Adventure", color: 'warning'});
    handleNotificationForAdventure();
    firebase.analytics().logEvent('Create or Update Adventure');
  }

  const renderReminderButton = (): ReactElement => {
    const id = Object.keys(reminders).length
    return (
    <IonButton color="light" className={classes.button}
    onClick={() => setReminders({...reminders, [id]: {...ReminderTemplate, id: id}})}>
      + Add Reminder
    </IonButton>
    )
  }

  const renderReminders = (): ReactElement => {
    return <IonList className={classes.reminderList}>
      {Object.values(reminders).map((reminder) => {
        if (!reminder.deleted) {
          return (
            <IonItem key={reminder.id} color="light">
              <IonLabel>Days Before: </IonLabel>
              <IonInput value={reminder.daysBefore} type="number" 
              onIonChange={(e) => setReminders({...reminders, [reminder.id]: {...reminder, daysBefore: Number(e.detail.value)}})}/>
              <IonButton fill="clear" onClick={() => setReminders({...reminders, [reminder.id]: {...reminder, deleted: true}})}>
                <IonIcon icon={trash} slot="icon-only"/>
              </IonButton>
            </IonItem>
          )
        } else {
          return <span key={reminder.id}></span>
        }
    })}</IonList>
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

          {renderReminderButton()}
          {renderReminders()}

          <IonButton className={classes.button} 
          disabled={title === '' || date === ''}
          routerLink="/home" routerDirection="back" 
          onClick={handleCreateORUpdate}>
            Save Adventure
          </IonButton>
        </div>
      </IonContent>}
      {!adventures && <Loading /> }
    </IonPage>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdventure)