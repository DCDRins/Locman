
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import { UserBaseState } from '../../../../reducers/client-reducer';
import * as actions from '../../../../actions';
import Preloader from '../../../.ui/Preloader';
import Organization, { DispatchedOrganizationProps, StoredOrganizationProps } from '../../Organization';
import { ReactComponent as SearchIcon } from '../../../../assets/icons/search.svg';
import { Organization as OrganizationModel, OrganizationRegistration } from '../../../../models';
import { OrganizationState, CurrentOrganizationBaseState, NewOrganizationBaseState } from '../../../../reducers/organization-reducer';
import { CitiesBaseState } from '../../../../reducers/catalog-reducer';
import Group from '../../../.ui/Group';
import Div from '../../../.ui/Div';
import classNames from '../../../../lib/classNames';
import Input from '../../../.ui/Input';
import Button from '../../../.ui/Button';
import Icon from '../../../.ui/Icon';
import ISelect from '../../../.ui/ISelect';
import Field from '../../../.ui/.office/Field';
import Image from '../../../.ui/Image';
import GoogleApiWrapper from '../../../.ui/GMap';
import { paginationLimit } from '../../../../common/constants';

export interface DispatchedOrganizationViewProps extends DispatchedOrganizationProps {
  fetchOrganizationData: typeof actions.organizationActions.fetchOrganizationData.request,
  fetchUserData: typeof actions.clientActions.fetchUserData.request,
  fetchOrganizationByInn: typeof actions.organizationActions.fetchOrganizationByInn.request,
  editOrganizationData: typeof actions.organizationActions.editOrganizationData.request,
  registerNewOrganization: typeof actions.organizationActions.registerNewOrganization.request,
}
export interface StoredOrganizationViewProps extends StoredOrganizationProps {
  user: UserBaseState;
  organization: CurrentOrganizationBaseState;
  organizationFromAPI: NewOrganizationBaseState;
}
export interface InjectedOrganizationViewProps extends DispatchedOrganizationViewProps, StoredOrganizationViewProps { }

export class OrganizationView extends Component<InjectedOrganizationViewProps, {}> {
  
  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true
  // search: React.RefObject<HTMLInputElement> = React.createRef()

  componentDidMount() {
    const {
      fetchUserData,
      fetchOrganizationTypes,
      fetchOrganizationCategories,
      organizationCategories: {
        data: {
          currentPage,
        },
      },
    } = this.props;
    fetchUserData({ });
    fetchOrganizationTypes({ });
    fetchOrganizationCategories({ page: currentPage || 1, onPage: paginationLimit });
  }

  componentDidUpdate() {
    const { user: { data: userData }, fetchOrganizationData, organization: { data, error, isLoading } } = this.props;
    if (userData && data === null) {
      const { organization } = userData
      if (organization.length === 0 || error !== null || isLoading) return;
      const [org] = organization
      org && fetchOrganizationData(org.id)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  findOrganization = (e: React.FormEvent<HTMLInputElement>) => {
    const { value: inn } = e.currentTarget
    const { fetchOrganizationByInn } = this.props
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchOrganizationByInn({ inn })
    }, 300)
  }


  render() {
    const base = 'Organization-View'
    const {
      organization: {
        data: organization,
        isLoading: isLoadingOrganization,
        error: organizationError,
      },
      organizationFromAPI: {
        data: organizationFromAPI,
        isLoading: isOrganizationFromAPILoading,
        error: organizationFromAPIError,
      },
      user: {
        isLoading: isUserLoading,
        data: userData,
      },
      cities,
      organizationTypes,
      organizationCategories,
      fetchCitiesList,
      editOrganizationData,
      fetchOrganizationTypes,
      fetchOrganizationCategories,
      uploadOrganizationImage,
      registerNewOrganization,
    } = this.props;
    const { organization: userOrg } = { ...userData };
    const haveAnyOrganizations = userOrg && userOrg.length > 0;
    const inheritData = organizationCategories.data.list.length > 0 && organizationTypes.data.length > 0 && {
      organizationType: [...organizationTypes.data].shift()!,
      category: [...organizationCategories.data.list].shift()!,
    }
    return (
      <Section className={base}>
        <Preloader isLoading={isUserLoading || isLoadingOrganization} />
        {!isUserLoading && !isLoadingOrganization && !haveAnyOrganizations && (
          <div>
            <Group content="center" justify="center" stretched="x" orientation="vertical">
              <div>
                <Div className={`${base}__empty-string`}>
                  Вы еще не привязали организацию к аккаунту
                </Div>
                <Div>
                  <Input
                    className={`${base}__search`}
                    autoFocus
                    placeholder="Введите ИНН организации"
                    onChange={this.findOrganization}
                    // getRef={this.search}
                  />
                </Div>
                {organizationFromAPI && !organizationFromAPI.inn && (
                  <Div className={`${base}__info`}>
                    У вас нет прав для управления данной организацией, пожалуйста, перепроверьте введенный ИНН или обратитесь в
                    <a href="mailto:example@example.ru" className="green-link"> службу поддержки.</a>
                  </Div>
                )}
                {organizationFromAPIError && (
                  typeof organizationFromAPIError.message === 'string' ? (
                    <Div className={`${base}__info`}>
                      {organizationFromAPIError.message}
                    </Div>
                  ) : (
                    <Div className={`${base}__info`}>
                      Организацию нельзя привязать или она уже привязана к другому профилю. Обратитесь в
                      <a href="mailto:example@example.ru" className="green-link"> службу поддержки.</a>
                    </Div>
                  )
                )}
              </div>
            </Group>
            {organizationFromAPI && organizationFromAPI.inn && inheritData && (
              <Organization
                data={OrganizationRegistration.deserialize({
                  ...organizationFromAPI,
                  ...inheritData,
                })}
                errors={organizationError}
                {...{ cities }}
                {...{ fetchCitiesList }}
                {...{ organizationTypes }}
                {...{ organizationCategories }}
                {...{ uploadOrganizationImage }}
                {...{ fetchOrganizationCategories }}
                {...{ fetchOrganizationTypes }}
                onCreate={registerNewOrganization}
              />
            )}
          </div>
        )}
        {!isLoadingOrganization && organization && haveAnyOrganizations && (
          <Organization
            data={OrganizationModel.deserialize(organization)}
            errors={organizationError}
            {...{ cities }}
            {...{ fetchCitiesList }}
            {...{ organizationTypes }}
            {...{ organizationCategories }}
            {...{ uploadOrganizationImage }}
            {...{ fetchOrganizationCategories }}
            {...{ fetchOrganizationTypes }}
            onSave={editOrganizationData}
          />
        )}
      </Section>
    )
  }
}
