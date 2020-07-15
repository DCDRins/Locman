import React, { Component, FormEvent } from 'react';
import { HasChildren, HasClassName } from '../../../.types/props';
import Group from '../../.ui/Group';
import Button from '../../.ui/Button';
import Input from '../../.ui/Input';
import { ReactComponent as SignInIcon } from '../../../assets/icons/signin.svg'
import Icon from '../../.ui/Icon';

import terms from '../../../common/dictionaries/terms';
import * as actions from '../../../actions';
import { RegistrationModel } from '../../../models';
import Div from '../../.ui/Div';
import Section from '../../.ui/Section';
import Field from '../../.ui/.office/Field';
import RadioButton from '../../.ui/RadioButton';
import ISelect from '../../.ui/ISelect';
import roles from '../../../common/dictionaries/roles';
import { cyrillicUppercaseLetters } from '../../../common/constants';
import { AcceptedOrganizationListBaseState } from '../../../reducers/catalog-reducer';
import isSatisfied from '../../../lib/isSatisfied';
import { ErrorReply } from '../../../.types/types';

export interface StoredRegistrationProps {
  organizationList: AcceptedOrganizationListBaseState;
  error?: ErrorReply;
}
export interface DispatchedRegistrationProps {
  register: typeof actions.clientActions.register.request;
  fetchAcceptedOrganizationList: typeof actions.catalogActions.fetchAcceptedOrganizationList.request;
  fetchRestOrganizationList: typeof actions.catalogActions.fetchRestOrganizationList.request;
}
export type OwnProps = HasChildren & HasClassName

type InjectedProps = StoredRegistrationProps & DispatchedRegistrationProps & OwnProps
type State = typeof initialState & {}

const initialState = Object.freeze({
  registrationData: RegistrationModel.create(),
})
export default class Registration extends Component<InjectedProps, State> {
  readonly state: State = initialState
  input: React.RefObject<HTMLInputElement> = React.createRef()

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const { fetchAcceptedOrganizationList } = this.props;
    fetchAcceptedOrganizationList({ });
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  _handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { registrationData } = this.state;
    const { name, value } = e.currentTarget;
    registrationData[name] = value;
    this.setState({ registrationData });
  }

  _handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { registrationData } = this.state;
    const { name, value } = e.currentTarget;
    const _value = value === 'true';
    registrationData[name] = _value;
    this.setState({ registrationData });
  }

  _handleRoleChange = ({ value }) => {
    const { registrationData } = this.state;
    const selectedRole = Object.values(roles).find(role => role.id === value);
    if (!selectedRole) return
    registrationData.role = selectedRole;
    this.setState({ registrationData });
  }
  
  _handleClassChange = ({ value, label }, { name }) => {
    const { registrationData } = this.state;
    const classState = registrationData._class || [[]]
    if (name === 'number') {
      classState[0][0] = value
    }
    if (name === 'letter') {
      classState[0][1] = label
    }
    registrationData._class = classState;
    this.setState({ registrationData });
  }

  _handleOrganizationChange = ({ value: id }) => {
    const { organizationList: { data } } = this.props;
    const { registrationData } = this.state;
    const org = data && data.find(o => o.id === id);
    if (!org) return false;
    registrationData.organization = [org];
    this.setState({ registrationData });
  }

  _updateOrganizationList = (src: string) => {
    const { fetchAcceptedOrganizationList } = this.props;
    const { registrationData: { role } } = this.state
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchAcceptedOrganizationList({ name: src })
      // isSatisfied([roles.PARTICIPANT, roles.TEACHER, roles.PARENT], role)
      // ? fetchAcceptedOrganizationList({ name: src })
        // : fetchRestOrganizationList(src)
    }, 300)
  }

  render() {
    const {
      _handleInputChange,
      _handleRadioChange,
      _handleRoleChange,
      _handleClassChange,
      _updateOrganizationList,
      _handleOrganizationChange,
    } = this
    const {
      register,
      organizationList: {
        data: organizations,
        isLoading: isOrganizationListLoading,
      },
      error,
    } = this.props
    const {
      registrationData,
      registrationData: {
        name,
        email,
        role,
        gender,
        password,
        passwordConfirmation,
        // non-required
        surname,
        phone,
        login,
        patronymic,
        birthdate,
      }
    } = this.state
    const { errors } = { ...error } as ErrorReply
    const base = 'Registration';
    return (
      <Section className={base}>
        <Div className={`${base}__content`}>
          <ISelect
            lightMode
            options={[roles.PARTICIPANT, roles.TEACHER, roles.MUSEUM, roles.SCHOOL, roles.PARENT].map(({ id, description }) => ({ value: id, label: description }))}
            title="Выберите роль"
            onChange={_handleRoleChange}
            defaultValue={(({ id, description }) => ({ value: id, label: description }))(role)}
          />
          {isSatisfied([roles.PARTICIPANT, roles.TEACHER, roles.PARENT], role) && (
            <>
              <Field
                showTitle
                lightMode
                title="Имя"
                field={{ name }}
                error={errors && errors['name']}
                onChange={_handleInputChange}
              />
              <Field
                showTitle
                lightMode
                title="Фамилия"
                field={{ surname }}
                autoComplete="last name"
                error={errors && errors['surname']}
                onChange={_handleInputChange}
              />
              <Field
                showTitle
                lightMode
                title="Отчество"
                field={{ patronymic }}
                error={errors && errors['patronymic']}
                onChange={_handleInputChange}
              />
              <Field custom title="Пол" showTitle lightMode>
                <Group justify="space-between" content="center" stretched="x">
                  Мужской
                  <RadioButton
                    onChange={_handleRadioChange}
                    checked={gender}
                    name="gender"
                    title="Пол"
                    value={'true'}
                  />
                  Женский
                  <RadioButton
                    checked={!gender}
                    onChange={_handleRadioChange}
                    name="gender"
                    value={'false'}
                  />
                </Group>
              </Field>
              <Field
                showTitle
                lightMode
                title="Телефон"
                field={{ phone }}
                error={errors && errors['phone']}
                onChange={_handleInputChange}
              />
              <Field
                showTitle
                lightMode
                title="Дата рождения"
                field={{ birthdate }}
                error={errors && errors['birthdate']}
                onChange={_handleInputChange}
              />
            </>
          )}
          {isSatisfied([roles.PARTICIPANT, roles.PARENT], role) && (
            <Group>
              <ISelect
                lightMode
                title="Класс"
                name="number"
                options={[...Array(11)].map((_, idx) => ({ value: idx + 1, label: idx + 1 }))}
                onChange={_handleClassChange}
                defaultValue={{ value: 1, label: 1 }}
                />
              <ISelect
                lightMode
                title="Буква"
                name="letter"
                options={[...Array(32)].map((_, idx) => ({ value: idx + cyrillicUppercaseLetters, label: String.fromCharCode(idx + cyrillicUppercaseLetters) }))}
                onChange={_handleClassChange}
                defaultValue={{ value: cyrillicUppercaseLetters, label: String.fromCharCode(cyrillicUppercaseLetters) }}
              />
            </Group>
          )}
          {isSatisfied([roles.PARTICIPANT, roles.TEACHER, roles.PARENT], role) && (
            <ISelect
              lightMode
              title="Организация"
              name="organization"
              options={organizations && organizations.map(({ id, fullName }) => ({ value: id, label: fullName }))}
              onInputChange={_updateOrganizationList}
              isSearchable
              onChange={_handleOrganizationChange}
              isLoading={isOrganizationListLoading}
            />
          )}
          <Field
            showTitle
            lightMode
            title="Почта"
            field={{ email }}
            error={errors && errors['email']}
            onChange={_handleInputChange}
          />
          <Field
            showTitle
            lightMode
            title="Логин"
            field={{ login }}
            error={errors && errors['login']}
            onChange={_handleInputChange}
          />
          <Field
            showTitle
            lightMode
            title="Пароль"
            field={{ password }}
            onChange={_handleInputChange}
            error={errors && errors['password']}
            autoComplete="new-password"
            />
          <Field
            showTitle
            lightMode
            title="Подтверждение пароля"
            field={{ passwordConfirmation }}
            onChange={_handleInputChange}
            error={errors && errors['passwordConfirmation']}
            autoComplete="new-password"
          />
          <Group justify="center">
            <Div>
              <Button level="primary" onClick={() => register(registrationData.serialize())}>
                Зарегистрироваться
              </Button>
            </Div>
          </Group>
        </Div>
      </Section>
    )
  }
}
