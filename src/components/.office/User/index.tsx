
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Group from '../../.ui/Group';
import Div from '../../.ui/Div';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import * as actions from '../../../actions';
import { IUserDTO, User as UserModel } from '../../../models';
import isSatisfied from '../../../lib/isSatisfied';
import roles from '../../../common/dictionaries/roles';
import Button from '../../.ui/Button';
import RadioButton from '../../.ui/RadioButton';
import ISelect from '../../.ui/ISelect';
import { cyrillicUppercaseLetters } from '../../../common/constants';
import Input from '../../.ui/Input';
import { AcceptedOrganizationListBaseState } from '../../../reducers/catalog-reducer';
import Section from '../../.ui/Section';
import getDominantColor from '../../../lib/getDominantColor';

export interface DispatchedUserProps {
  editUserData: typeof actions.clientActions.editUserData.request;
  uploadUserImage: typeof actions.clientActions.uploadUserImage.request;
  fetchAcceptedOrganizationList: typeof actions.catalogActions.fetchAcceptedOrganizationList.request;
}
export interface StoredUserProps {
  acceptedOrganizations: AcceptedOrganizationListBaseState;
}
interface InjectedProps extends StoredUserProps, DispatchedUserProps {
  user: IUserDTO;
  editUserData: typeof actions.clientActions.editUserData.request,
  uploadUserImage: typeof actions.clientActions.uploadUserImage.request,
  isLoading: boolean;
}
type State = typeof initialState & {
  user: IUserDTO
}
const initialState = Object.freeze({ })

export default class User extends Component<InjectedProps, State> {
  readonly state: State = {
    ...initialState,
    user: this.props.user,
  }

  
  imageRef: React.RefObject<HTMLImageElement> = React.createRef()

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const { user: propsToState } = this.props;
    this.setState(prevState => ({
      ...prevState,
      ...propsToState,
    }))
  }

  componentDidUpdate(prevProps) {
    const { user: { image } } = this.props;
    const { user: { image: prevImage } } = prevProps;
    if (image === prevImage) return false;
    this.setState(({ user }) => ({ user: {
      ...user,
      image,
    }}));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    // const type = typeof this.state.user[name];
    // const _value = type === 'boolean' ? checked !== undefined ? checked : value : value;
    // const newState = { [name]: _value };
    const newState = { [name]: value };
    this.setState(({ user }) => ({
      user: {
        ...user,
        ...newState
      },
    }));
  }

  radioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const _value = value === 'true';
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

  _handleClassChange = ({ value, label }, { name }) => {
    const { user } = this.state;
    const classState = user.class || [[]]
    if (name === 'number') {
      classState[0][0] = value
    }
    if (name === 'letter') {
      classState[0][1] = label
    }
    const newState: Partial<IUserDTO> = { class: classState }
    this.setState({
      user: {
        ...user,
        ...newState
      }
    });
  }

  _handleOrganizationChange = ({ value, label }) => {
    const { acceptedOrganizations: { data } } = this.props
    const org = data && data.find(item => item.id === value)
    if (!org) return false;
    const newState: Partial<IUserDTO> = { organization: [org] }
    this.setState(({ user }) => ({
      user: {
        ...user,
        ...newState
      },
    }));
  }

  updateOrganizationList = (source: string) => {
    const { fetchAcceptedOrganizationList } = this.props
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchAcceptedOrganizationList({ name: source });
    }, 300)
  }

  render() {
    const base = 'User'
    const {
      editUserData,
      acceptedOrganizations: {
        data: organizationList,
        isLoading: isOrganizationListLoading,
      },
    } = this.props;
    const { handleChange, selectImage, radioChange, _handleClassChange } = this;
    const {
      user,
      user: {
        name,
        surname,
        patronymic,
        phone,
        image,
        email,
        workPosition,
        gender,
        birthdate,
        login,
        organization,
        role: {
          description,
        },
        class: _class,
      },
    } = this.state
    return (
      <Section
        className={base}
        side={(
          <div className={`${base}__content`}>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                onChange={handleChange}
                field={{ name }}
                showTitle
                title="Имя"
              />
              <Field
                onChange={handleChange}
                field={{ surname }}
                showTitle
                title="Фамилия"
              />
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                onChange={handleChange}
                field={{ patronymic }}
                showTitle
                title="Отчество"
              />
              {/* <Field
                onChange={handleChange}
                field={{ phone }}
                showTitle
                title="Телефон"
              /> */}
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                onChange={handleChange}
                field={{ birthdate }}
                showTitle
                title="Дата рождения"
              />
              <Field custom title="Пол" showTitle>
                <Group justify="space-between" content="center" stretched="x">
                  Мужской
                  <RadioButton
                    onChange={radioChange}
                    checked={gender}
                    name="gender"
                    title="Пол"
                    value={'true'}
                  />
                  Женский
                  <RadioButton
                    checked={!gender}
                    onChange={radioChange}
                    name="gender"
                    value={'false'}
                  />
                </Group>
              </Field>
            </Group>
            {isSatisfied([roles.PARTICIPANT, roles.PARENT]) && (
              <Group justify="start" content="center" rotateOnMedia stretched>
                <ISelect
                  title="Класс"
                  showTitle
                  name="number"
                  options={[...Array(11)].map((_, idx) => ({ value: idx + 1, label: idx + 1 }))}
                  onChange={_handleClassChange}
                  // defaultValue={(({ d }) => ({ value: 1, label: 1 }))(_class[0][0])}
                />
                <ISelect
                  title="Буква"
                  showTitle
                  name="letter"
                  options={[...Array(32)].map((_, idx) => ({ value: idx + cyrillicUppercaseLetters, label: String.fromCharCode(idx + cyrillicUppercaseLetters) }))}
                  onChange={_handleClassChange}
                  defaultValue={{ value: cyrillicUppercaseLetters, label: String.fromCharCode(cyrillicUppercaseLetters) }}
                />
              </Group>
            )}
            {organization[0] && (
              isSatisfied([roles.PARTICIPANT, roles.TEACHER, roles.PARENT]) && (
                <Group justify="start" content="center" rotateOnMedia stretched>
                  <ISelect
                    title="Школа"
                    className={`${base}__school`}
                    dangerouslySetInnerHTML={{ __html: organization[0].shortName }}
                    isLoading={isOrganizationListLoading}
                    defaultValue={(({ id, shortName }) => ({ value: id, label: shortName }))(organization[0])}
                    options={organizationList && organizationList.map(({ id, shortName }) => ({ value: id, label: shortName }))}
                    onInputChange={this.updateOrganizationList}
                    onChange={this._handleOrganizationChange}
                  />
                </Group>
              )
            )}
            <Group justify="start" content="center" rotateOnMedia stretched>
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
            <Group justify="start" content="center" rotateOnMedia stretched>
              {isSatisfied([roles.SCHOOL, roles.MUSEUM, roles.TEACHER]) && (
                <Field
                  onChange={handleChange}
                  field={{ workPosition }}
                  showTitle
                  title="Должность"
                />
              )}
            </Group>
            <Div both className={`${base}__save`}>
              <Button
                level="office-primary"
                angular
                onClick={() => editUserData(UserModel.deserialize(user).serialize())}
              >
                Сохранить
              </Button>
            </Div>
          </div>
        )}
      >
        <Div both>
          <Image
            getRef={this.imageRef}
            // keepAspectRatio
            className={`${base}__image`}
            src={image && image.path}
            height={200}
            // width={200}
            editable
            onChange={selectImage}
          >
            {image ? 'Изменить фотографию' : 'Добавить фотографию'}
          </Image>
          <Group className={`${base}--readonly`}>
            <Div>
              {description}
            </Div>
          </Group>
        </Div>
      </Section>
    )
  }
}
