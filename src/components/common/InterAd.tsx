import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { AdOptions } from '@rdlabo/capacitor-admob';
import { AdMobIntersitionalIOS } from '../../config/FirebaseConfig';
import { RootState, ThunkDispatchType, actions } from '../../store';
import { bindActionCreators } from 'redux';

const { AdMob } = Plugins;

interface ReduxStateProps {
  showInterAd: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  showInterAd: state.flags.showInterAd,
});

interface ReduxDispatchProps {
  closeInterAd: () => Promise<void>;
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
  closeInterAd: actions.flags.closeInterAd
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export const InterAd = ({ closeInterAd, showInterAd}: Props): ReactElement => {

  const addID = {
    ios: AdMobIntersitionalIOS, 
    android: '',
  }

  const platformID = isPlatform('android') ? addID.android : addID.ios;

  const options: AdOptions = {
    adId: platformID,
    isTesting: true,
  }

  useEffect(() => {
    AdMob.initialize();
    AdMob.prepareInterstitial(options)
  }, [options])

  

  if (showInterAd) {
    AdMob.showInterstitial(options)
    setTimeout(() => {
      closeInterAd()
    }, 6000)
  } 

  return (<></>)
}

export default connect(mapStateToProps, mapDispatchToProps)(InterAd)