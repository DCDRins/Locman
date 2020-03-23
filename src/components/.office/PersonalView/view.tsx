
import React, { Component } from 'react';
import Section from '../../.ui/Section';
import { UserState } from '../../../reducers/client-reducer';
import * as actions from '../../../actions';
import { User as UserModel } from '../../../models';
import Preloader from '../../.ui/Preloader';
import User from '../../.ui/.office/User';

export interface DispatchedPersonalViewProps {
  fetchUserData: typeof actions.clientActions.fetchUserData.request;
  editUserData: typeof actions.clientActions.editUserData.request;
  uploadUserImage: typeof actions.clientActions.uploadUserImage.request;
}
export interface StoredPersonalViewProps extends UserState { }
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
      userError,
      isUserLoading,
      //
      editUserData,
      uploadUserImage,
    } = this.props;
    return (
      <Section className={base}>
        <Preloader isLoading={isUserLoading} />
        {user && (
          <User
            {...{ uploadUserImage }}
            {...{ editUserData }}
            isLoading={isUserLoading}
            user={UserModel.deserialize(user)}
          />
        )}
      </Section>
    )
  }
}
