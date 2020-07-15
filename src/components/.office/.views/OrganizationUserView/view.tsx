
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import Group from '../../../.ui/Group';
import { ReactComponent as Ico } from '../../../../assets/icons/add.svg';
import Icon from '../../../.ui/Icon';
import Preloader from '../../../.ui/Preloader';
import Button from '../../../.ui/Button';
import Div from '../../../.ui/Div';
import * as actions from '../../../../actions';
import { OrganizationUserListBaseState } from '../../../../reducers/organization-reducer';
import { paginationLimit } from '../../../../common/constants';
import Field from '../../../.ui/.office/Field';
import ScrolledContent from '../../../.ui/ScrolledContent';
import moment from 'moment';

export interface DispatchedOrganizationUserViewProps {
  fetchOrganizationUserList: typeof actions.organizationActions.fetchOrganizationUserList.request;
}
export interface StoredOrganizationUserViewProps {
  userList: OrganizationUserListBaseState;
}
export type InjectedOrganizationUserViewViewProps = DispatchedOrganizationUserViewProps
& StoredOrganizationUserViewProps
& { }

interface State {
}
const initialState = Object.freeze({
  
})

export default class OrganizationUserView extends Component<InjectedOrganizationUserViewViewProps, State> {
  readonly state: State = initialState

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const {
      fetchOrganizationUserList,
      userList: { data },
    } = this.props;
    const { currentPage } = { ...data }
    fetchOrganizationUserList({ page: currentPage || 1, onPage: paginationLimit })
  }
  
  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  render() {
    const base = 'Organization-User-View'
    const { } = this.state;
    const {
      userList: {
        data,
        isLoading,
        error,
      },
    } = this.props;
    const { list } = { ...data }
    return (
      <Section className={base}>
        <Preloader {...{ isLoading }} size={100} />
        <ScrolledContent className={`${base}__list`}>
          {list && list.map(({ id, name, surname, patronymic, birthdate, email, class: _class }) => (
            <Div key={id} both className={`${base}__user`}>
              <Group content="center" stretched="x" justify="space-between">
                <Group className={`${base}__group`} content="center" justify="start" stretched>
                  <Div both half className={`${base}__name`}>
                    {surname && `${surname} `}
                    {`${name} `}
                    {patronymic && `${patronymic}`}
                  </Div>
                  {email && (
                    <Div both half>
                      {email}
                    </Div>
                  )}
                  {birthdate && (
                    <Div both half>
                      {moment(birthdate, 'HH:mm:ss DD.MM.YYYY').format('DD.MM.YYYY HH:mm')}
                    </Div>
                  )}
                </Group>
              </Group>
            </Div>
          ))}
        </ScrolledContent>
      </Section>
    )
  }
}
