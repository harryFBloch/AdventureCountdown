import React, { Component, ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { PAGE_URL } from '../constants';
import Login from "../pages/Login";
import Loading from "../components/common/Loading";

interface ReduxStateProps {
  uid: string;
  isLoading: boolean;
};

const mapStateToProps = (state: RootState): ReduxStateProps => {
  return {
    uid: state.auth.uid,
    isLoading: state.auth.isLoading
  }
};

type Props = ReturnType<typeof mapStateToProps> & {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path?: string | string[];
  exact?: boolean;
};

class Private extends Component<Props> {

  render(): ReactElement {
    const { component, ...rest } = this.props;
    const routeRender = (props: any): ReactElement => {
      if (this.props.isLoading) {
        return <Loading/>;
      } else if (this.props.uid === "") {
        //this.targetPath = window.location.pathname;
  
        // Returning <Redirect/> fails tests but this would be better
        // return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>;
        // return <Login from={props.location}/>;
        // There seems to be a bug where a redirect to login is still getting to this point.
        if (props.location.pathname !== PAGE_URL.LOGIN) {
          // TODO: This should be more properly done. Having a manual redirect like this
          // blows the app state away, but without it Home won't render properly in 
          // the case of log out / log back in
          window.location.href = PAGE_URL.LOGIN;
          return <Redirect to={{pathname: PAGE_URL.LOGIN, state: {from: props.location}}}/>;
        } else {
          return <Login />;
        }
      } else {
        return React.createElement(component, props);
      }
    };
    return <Route {...rest} render={routeRender.bind(this)} />;
  }
}

class Public extends Component<Props> {
  render(): ReactElement {
    return (
      <Route {...this.props}/>
    );
  }
}

export const PrivateRoute = connect(mapStateToProps)(Private);
export const PublicRoute = connect(mapStateToProps)(Public);