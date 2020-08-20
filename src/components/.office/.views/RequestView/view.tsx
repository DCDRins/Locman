
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
// import { RequestBaseState } from '../../../../reducers/client-reducer';
import * as actions from '../../../../actions';
import Preloader from '../../../.ui/Preloader';
import Request, { StoredRequestProps, DispatchedRequestProps } from '../../Request';
import { Route } from '../../../../models';

export interface DispatchedRequestViewProps extends DispatchedRequestProps {
  
}
export interface StoredRequestViewProps extends StoredRequestProps {
  
}
export type InjectedRequestViewProps = DispatchedRequestViewProps
& StoredRequestViewProps

export class RequestView extends Component<InjectedRequestViewProps, {}> {
  componentDidMount() {
    const { } = this.props;
    // fetchRequestData({});
  }

  
  render() {
    const base = 'Request-View'
    const {

    } = this.props;
    return (
      <Section className={base}>
        {/* <Preloader isLoading={isLoading} /> */}
        {/* {data && (
          <Request
            {...{ uploadRequestImage }}
            {...{ editRequestData }}
            {...{ fetchAcceptedOrganizationList }}
            {...{ acceptedOrganizations }}
            isLoading={isLoading}
            user={RequestModel.deserialize(data)}
          />
        )} */}
      <Request
        data={{
          route: Route.new(),
          createdAt: "26 ноября 2019 в 11:04",
          status: "Подана заявка",
        }}
      />
      </Section>
    )
  }
}
