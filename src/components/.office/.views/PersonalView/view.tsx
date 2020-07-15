
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import { UserBaseState } from '../../../../reducers/client-reducer';
import * as actions from '../../../../actions';
import { User as UserModel } from '../../../../models';
import Preloader from '../../../.ui/Preloader';
import User, { StoredUserProps, DispatchedUserProps } from '../../User';

export interface DispatchedPersonalViewProps extends DispatchedUserProps {
  fetchUserData: typeof actions.clientActions.fetchUserData.request;
}
export interface StoredPersonalViewProps extends StoredUserProps {
  user: UserBaseState;
}
export type InjectedPersonalViewProps = DispatchedPersonalViewProps
& StoredPersonalViewProps

export class PersonalView extends Component<InjectedPersonalViewProps, {}> {
  componentDidMount() {
    const { fetchUserData } = this.props;
    fetchUserData({});
  }

  
  render() {
    const base = 'Personal-View'
    const {
      user,
      user: {
        data,
        isLoading
      },
      acceptedOrganizations,
      //
      editUserData,
      uploadUserImage,
      fetchAcceptedOrganizationList,
    } = this.props;
    return (
      <Section className={base}>
        <Preloader isLoading={isLoading} />
        {data && (
          <User
            {...{ uploadUserImage }}
            {...{ editUserData }}
            {...{ fetchAcceptedOrganizationList }}
            {...{ acceptedOrganizations }}
            isLoading={isLoading}
            user={UserModel.deserialize(data)}
          />
        )}
      </Section>
    )
  }
}
