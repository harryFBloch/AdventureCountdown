import React, { ReactElement } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle, IonButton, IonText, IonItem } from '@ionic/react';
import { RootState, ThunkDispatchType, actions, Auth, } from '../store';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classes from './RightMenu.module.css';
import LineGraph from './LineGraph';

interface ReduxStateProps {
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
  
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
 
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> 

export const RightMenu = ({ }: Props): ReactElement => {

  return (
    <IonMenu side="end" menuId="right" contentId='main'>
    <IonHeader>
      <IonToolbar color="secondary" className={classes.toolbar}>
        <IonTitle>Mood</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="secondary">
      
      {/* <LineGraph data={getDataForMood(sessionHistory, 'anxiety', 'red', 'blue')} title="Anxiety" legend/>
      <LineGraph data={getDataForMood(sessionHistory, 'stress', 'red', 'blue')} title="Stress" legend/>
      <LineGraph data={getDataForMood(sessionHistory, 'happiness', 'red', 'blue')} title="Happiness" legend/> */}
    </IonContent>
  </IonMenu>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)