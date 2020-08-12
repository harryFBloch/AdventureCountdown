import React, { ReactElement, useState } from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  IonInput,
  IonLabel,
  IonItem,
  IonPage,
  IonButton,
  IonAlert,
  IonContent,
} from '@ionic/react';
import classes from './Login.module.css'
import { ThunkDispatchType, actions } from '../store';
import { bindActionCreators } from 'redux';

interface ReduxDispatchProps {
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  login: actions.auth.login,
  signUp: actions.auth.signUp,
  resetPassword: actions.auth.resetPassword,
}, dispatch);

export const Login = ({history, login, signUp, resetPassword}: RouteComponentProps & ReduxDispatchProps): ReactElement => {

  const [loginMode, setLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = (): void => {
    if (password === password2) {
      signUp(email, password)
      .then((): void => {
        console.log('success')
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
    } else {
      setErrorMessage('Passwords do not match!')
    }
  }

  const handleLogin = (): void => {
    login(email, password)
    .then((): void => {
      history.push('/home');
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }

  const handleCancel = (): void => {
    setErrorMessage('');
    setLoginMode(true);
  }

  const renderLogin = (): ReactElement => {
    return (
      <>
        <div className={classes.centerContainer}>
        <IonLabel color="primary" className={classes.title}>
          Login or&nbsp;
          <span className={classes.linkStyle} onClick={(): void => {
            setLoginMode(false);
            setErrorMessage('');
            }}>Sign up!</span>
        </IonLabel>
        </div>
        <IonItem className={classes.inputItem}>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={email} onIonChange={(event): void => setEmail(String(event.detail.value))}/>
        </IonItem>
        <IonItem className={classes.inputItem}>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput value={password} onIonChange={(event): void => setPassword(String(event.detail.value))} 
            type="password"/>
        </IonItem>
        <div className={`${classes.centerContainer} ${classes.topPadding}`}>
          <div>
            <div className={classes.buttonContainer}>
              <IonButton onClick={handleLogin} className={classes.title}>Log In</IonButton>
            </div>
            
            <p className={classes.note}>Having trouble logging in 
              <button className={classes.linkStyle} onClick={() => setForgotPassword(true)}>reset your password</button>
            </p>
            <p className={classes.note}>by logging in you agree to our&nbsp;
              <button className={classes.linkStyle} onClick={() => history.push('/terms')}>terms of service</button>
              &nbsp;and&nbsp;
              <button className={classes.linkStyle} onClick={() => history.push('/privacy')}>privacy policy</button>
            </p>
          </div>
        </div>
      </>
    )
  }

  const renderSignUp = (): ReactElement => (
    <>
      <div className={classes.centerContainer}>
      <IonLabel color="primary" className={classes.title}>
        Sign Up
      </IonLabel>
      </div>
      <IonItem className={classes.inputItem}>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput value={email} onIonChange={(event): void => setEmail(String(event.detail.value))}/>
      </IonItem>
      <IonItem className={classes.inputItem}>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput value={password} onIonChange={(event): void => setPassword(String(event.detail.value))} 
          type="password"/>
      </IonItem>
      <IonItem className={classes.inputItem}>
        <IonLabel position="floating">Re Enter Password</IonLabel>
        <IonInput value={password2} onIonChange={(event): void => setPassword2(String(event.detail.value))}
          type="password"/>
      </IonItem>
      <div className={`${classes.centerContainer} ${classes.topPadding}`}>
        <div>
          <IonButton className={classes.title} onClick={handleSignUp}>Sign Up</IonButton>
          <IonButton className={classes.title} onClick={handleCancel}>Cancel</IonButton>
        </div>
      </div>
    </>
  )

  return (
    <IonPage>
      <IonContent>
        <div className={classes.pageContainer}>
          <div className={classes.formContainer}>
          {loginMode ? renderLogin() : renderSignUp()}
          <h5 className={classes.errorNote}>{errorMessage}</h5>
          </div>
          <IonAlert
              isOpen={forgotPassword}
              onDidDismiss={() => setForgotPassword(false)}
              cssClass='my-custom-class'
              header={'Enter your email to recieve a forgot password link'}
              inputs={[
                {
                  name: 'email',
                  type: 'text',
                },
                
              ]}
              buttons={[
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log('Confirm Cancel');
                  }
                },
                {
                  text: 'Ok',
                  handler: (value) => {
                    resetPassword(value.email)
                  }
                }
              ]}
            />
        </div>
      </IonContent>
    </IonPage>
  )
}

export default withRouter(connect(null, mapDispatchToProps)(Login))