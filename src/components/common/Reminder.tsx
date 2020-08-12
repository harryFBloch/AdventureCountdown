import React, { ReactElement, useState } from 'react';
import { IonItem, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonText, IonButton } from '@ionic/react';
import classes from './Reminder.module.css';
// import { LocalNotifications } from '@ionic-native/local-notifications';

export enum WEEKDAYS {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saterday
}

interface Props {
  color1: string;
  color2: string
}

export const Reminder = ({ color1, color2}: Props): ReactElement => {

  const [selectedTime, setSelectedTime] = useState('');
  const [weekdays, setWeekdays] = useState([0,1,2,3,4,5,6]);

  const removeNotifications= (callback: () => void) => {
    // LocalNotifications.cancel([0,1,2,3,4,5,6])
    // .then(() => {
    //   callback()
    // })
  }

  const handleSetupNotifications = () => {
    removeNotifications(() => {
      weekdays.map((weekday, i) => {
        // LocalNotifications.schedule({
        //   id: i,
        //   title: 'Wellness Journal',
        //   text: 'Time to Breathe',
        //   trigger: {every: { weekday: weekday, hour: new Date(selectedTime).getHours(), minute: new Date(selectedTime).getMinutes()}}
        // })
      })
    });
  }

  return (
    <div className={classes.container}>
            <IonText color={color2} className={classes.title}>Set Reminder</IonText>
            <IonItem lines="full" color={color1}>
              <IonLabel >Weekdays</IonLabel>
              <IonSelect value={weekdays} multiple={true} cancelText="Cancel" okText="Okay!" onIonChange={e => setWeekdays(e.detail.value)} selectedText="">
                <IonSelectOption value={WEEKDAYS.Monday}>Monday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Tuesday}>Tuesday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Wednesday}>Wednesday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Thursday}>Thursday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Friday}>Friday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Saterday}>Saturday</IonSelectOption>
                <IonSelectOption value={WEEKDAYS.Sunday}>Sunday</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem lines="full" color={color1}>
              <IonLabel color={color2}>Reminder Time</IonLabel>
              <IonDatetime displayFormat="h:mm A" cancelText="Remove Reminder"
              value={selectedTime} onIonChange={e => setSelectedTime(e.detail.value!)} 
              onIonCancel={() => setSelectedTime('')}/>
            </IonItem>
            <IonButton onClick={handleSetupNotifications} className={classes.button}
            disabled={ selectedTime === ''}>
              Ok
            </IonButton>
    </div>
  )
}

export default Reminder