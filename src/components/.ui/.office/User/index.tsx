
import React, { Component } from 'react';
import Section from '../../../.ui/Section';
import Group from '../../../.ui/Group';
import Div from '../../../.ui/Div';
import Image from '../../../.ui/Image';
import Field from '../../../.ui/.office/Field';
import * as actions from '../../../../actions';
import { IUserDTO, User as UserModel } from '../../../../models';
import isSatisfied from '../../../../lib/isSatisfied';
import roles from '../../../../common/dictionaries/roles';
import Button from '../../../.ui/Button';
import { Nullable } from '../../../../.types/types';
import Preloader from '../../Preloader';

export interface DispatchedPersonalViewProps {
  fetchUserData: typeof actions.clientActions.fetchUserData.request;
  editUserData: typeof actions.clientActions.editUserData.request;
  // edit
}
type Props = {
  user: IUserDTO;
  editUserData: typeof actions.clientActions.editUserData.request,
  uploadUserImage: typeof actions.clientActions.uploadUserImage.request,
  isLoading: boolean;
}
type State = typeof initialState & {
  user: IUserDTO
  // image?: string;
}
const initialState = Object.freeze({ })

export default class User extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    user: this.props.user,
  }

  componentDidMount() {
    const { user: propsToState } = this.props;
    this.setState(prevState => ({
      ...prevState,
      ...propsToState,
    }))
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props;
    const { user: prevUser } = prevProps;
    if (user === prevUser) return false;
    this.setState({ user });
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    const type = typeof this.state[name];
    const _value = type === 'boolean' ? checked : value
    const newState = { [name]: _value };
    this.setState(({ user }) => ({
      user: {
        ...user,
        ...newState
      },
    }));
  }

  selectImage = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { files } } = e;
    const { uploadUserImage } = this.props;
    if (!files) return false;
    const file = files[0];
    file && uploadUserImage(file);
  }

  render() {
    const base = 'User'
    const { editUserData } = this.props;
    const { handleChange, selectImage } = this;
    const {
      user,
      user: {
        name,
        surname,
        patronymic,
        phone,
        photo,
        email,
        workPosition,
        gender,
        birthdate,
        login,
        organization,
        class: _class,
      },
      // image,
    } = this.state
    return (
      <Group className={base} justify="center">
        <Group className={`${base}__content`} content="center" orientation="vertical" stretched="x">
          <Image
            src={photo}
            height={200}
            rounded
            editable
            onChange={selectImage}
          >
            {photo ? 'Изменить фотографию' : 'Добавить фотографию'}
          </Image>
          <Group justify="center" content="center" rotateOnMedia stretched>
            <Field
              onChange={handleChange}
              field={{ name }}
              showTitle
              title="Имя"
            />
            {surname !== undefined && (
              <Field
                onChange={handleChange}
                field={{ surname }}
                showTitle
                title="Фамилия"
              />
            )}
          </Group>
          <Group justify="center" content="center" rotateOnMedia stretched>
            {patronymic !== undefined && (
              <Field
                onChange={handleChange}
                field={{ patronymic }}
                showTitle
                title="Отчество"
              />
            )}
            {phone !== undefined && (
              <Field
                onChange={handleChange}
                field={{ phone }}
                showTitle
                title="Телефон"
              />
            )}
          </Group>
          <Group justify="center" content="center" rotateOnMedia stretched>
            {birthdate !== undefined && (
              <Field
                onChange={handleChange}
                field={{ birthdate }}
                showTitle
                title="Дата рождения"
              />
            )}
             {gender !== undefined && (
              <Field
                onChange={handleChange}
                field={{ gender }}
                showTitle
                title="Пол"
              >
                {gender ? 'Мужской' : 'Женский'}
              </Field>
            )}
          </Group>
          <Group justify="center" content="center" rotateOnMedia stretched>
            <Field
              onChange={handleChange}
              field={{ login }}
              showTitle
              title="Логин"
            />
            <Field
              onChange={handleChange}
              field={{ email }}
              showTitle
              readonly
              title="Почта"
            />
          </Group>
          <Group justify="center" content="center" rotateOnMedia stretched>
            {workPosition !== undefined && isSatisfied([roles.ORGANIZATION, roles.MUSEUM, roles.TEACHER]) && (
              <Field
                onChange={handleChange}
                field={{ workPosition }}
                showTitle
                title="Должность"
              />
            )}
          </Group>
          <Group stretched justify="center" content="center">
            <Div both>
              <Button
                level="office-primary"
                onClick={() => editUserData(UserModel.deserialize(user).serialize())}
              >
                Сохранить
              </Button>
            </Div>
          </Group>
        </Group>
      </Group>
    )
  }
}
