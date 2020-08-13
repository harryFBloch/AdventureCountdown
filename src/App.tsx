import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from './config/FirebaseConfig';
import 'firebase/auth';
import 'firebase/analytics';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Theme variables */
import './theme/variables.css';
import { Provider } from 'react-redux';
import store, { actions } from './store';
import LeftMenu  from './components/LeftMenu';
import AdMobContainer from './components/common/AdMobContainer';
import InAppPurchase from './components/common/InAppPurchase';
import { PublicRoute, PrivateRoute} from './utils/routing';
import Login from './pages/Login';
import './App.css'
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import RightMenu from './components/RightMenu';
import  AddAdventure  from './pages/Adventure';


const App: React.FC = () => {
  useEffect((): void => {
    firebase.analytics()
    //check auth status
    firebase.auth().onAuthStateChanged((user): void => {
      if (user) {
        actions.auth.autoLoginSuccess(user.uid)(store.dispatch, store.getState, null);
        if (window.location.pathname === '/login'){
          window.location.assign('/home')
        }
      } else {
        actions.auth.autoLoginFailed()(store.dispatch, store.getState, null);
      }
    })
    }, [])

  return (
  <Provider store={store}>
    <IonApp>
      <IonReactRouter>
        <AdMobContainer />
        <InAppPurchase />
        <LeftMenu />
        <RightMenu />
        <IonRouterOutlet id="main" draggable={false}>
          <PrivateRoute path="/home" component={Home} exact={true} />
          <PrivateRoute path="/adventure/:id" component={AddAdventure} />
          <PrivateRoute path="/adventure" component={AddAdventure} exact={true}/>
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/terms" component={Terms} />
          <PublicRoute path="/privacy" component={Privacy} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </Provider>
)};

export default App;
