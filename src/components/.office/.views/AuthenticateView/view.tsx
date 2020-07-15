import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Auth, { DispatchedAuthProps, StoredAuthProps } from '../../Auth';
import Section from '../../../.ui/Section';
import * as actions from '../../../../actions';
import { HasRouterProps } from '../../../../.types/props';

export interface StoredAuthenticateViewProps extends StoredAuthProps { }
export interface DispatchedAuthenticateViewProps extends DispatchedAuthProps {
  confirm: typeof actions.clientActions.confirm.request;
}

interface InjectedProps extends StoredAuthenticateViewProps, DispatchedAuthenticateViewProps, HasRouterProps { }

class AuthenticateView extends Component<InjectedProps, {}> {

  componentDidMount() {
    const { confirm, match: { params } } = this.props
    // console.log(params)
    // token && confirm(token);
  }

  render() {
    const { data, isLoading, error, auth } = this.props
    const base = 'Authenticate-View';
    return (
      <Section className={base}>
        <Auth
          {...{ data }}
          {...{ isLoading }}
          {...{ error }}
          {...{ auth }}
        />
      </Section>
    )
  }
}

export default withRouter(AuthenticateView);
