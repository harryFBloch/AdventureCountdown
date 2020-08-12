import React, { ReactElement } from 'react';
import { IonSpinner } from "@ionic/react";

export const Loading = (): ReactElement => (
  <div style={{height: '100%', width: '100%', paddingTop: '25%', display: 'flex',
   justifyContent: 'center', alignContent: 'center', backgroundColor: 'var(--ion-color-secondary)'}}>
    <IonSpinner name="lines" style={{transform: "scale(6)"}} color="primary"></IonSpinner>
  </div>
)

export default Loading