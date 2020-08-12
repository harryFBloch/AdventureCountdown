import React, { ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { isPlatform } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import { AdOptions, AdSize, AdPosition } from '@rdlabo/capacitor-admob';
import { AdMobBannerIOS, AdMobIntersitionalIOS } from '../../config/FirebaseConfig';
import { bindActionCreators } from 'redux';
import { ThunkDispatchType, RootState } from '../../store';

const { AdMob } = Plugins;

interface ReduxStateProps {
  removeAds: boolean
};

const mapStateToProps = (state: RootState): ReduxStateProps => ({
  removeAds: state.flags.removeAds
});

// Need to define types here because it won't infer properly from ThunkResult right now
interface ReduxDispatchProps {
}

const mapDispatchToProps = (dispatch: ThunkDispatchType): ReduxDispatchProps => bindActionCreators({
}, dispatch);

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>


export const AdMobContainer = ({removeAds}: Props): ReactElement => {

  useEffect(() => {
    if (!removeAds) {
      AdMob.initialize();
    

      const addID = {
        ios: AdMobBannerIOS,
        iosInter: AdMobIntersitionalIOS, 
        android: '',
        andridInter: '',
      }

      const platformAdIdBanner = isPlatform('android') ? addID.android : addID.ios;

      const bannerOptions: AdOptions = {
        adId: platformAdIdBanner,
        adSize: AdSize.FLUID,
        position: AdPosition.BOTTOM_CENTER,
        margin: 0,
      }

      AdMob.showBanner(bannerOptions)
    } else {
      AdMob.hideBanner()
    }
  
  }, [removeAds])

  return (<></>)
}

export default connect(mapStateToProps)(AdMobContainer)