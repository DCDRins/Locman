
import React, { Component } from 'react';
import Group from '../../.ui/Group';
import Div from '../../.ui/Div';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import * as actions from '../../../actions';
import { Organization as OrganizationModel, IOrganizationDTO, OrganizationRegistration } from '../../../models';
import Button from '../../.ui/Button';
import GoogleApiWrapper from '../../.ui/GMap'
import classNames from '../../../lib/classNames';
import { CitiesBaseState, OrganizationTypesBaseState, OrganizationCategoriesBaseState } from '../../../reducers/catalog-reducer';
import ISelect from '../../.ui/ISelect';
import { previewItemsCount } from '../../../common/constants';
import { Message } from '../../../.types/types';
import Section from '../../.ui/Section';

export interface DispatchedOrganizationProps {
  fetchCitiesList: typeof actions.catalogActions.fetchCitiesListAsync.request,
  fetchOrganizationTypes: typeof actions.catalogActions.fetchOrganizationTypes.request,
  fetchOrganizationCategories: typeof actions.catalogActions.fetchOrganizationCategories.request,
  uploadOrganizationImage: typeof actions.organizationActions.uploadOrganizationImage.request,
}
export interface StoredOrganizationProps {
  organizationTypes: OrganizationTypesBaseState;
  organizationCategories: OrganizationCategoriesBaseState;
  cities: CitiesBaseState;
}
interface InjectedProps extends DispatchedOrganizationProps, StoredOrganizationProps {
  data: IOrganizationDTO;
  errors: Message;
  onSave?: typeof actions.organizationActions.editOrganizationData.request
  onCreate?: typeof actions.organizationActions.registerNewOrganization.request,
}
type State = typeof initialState & {
  data: IOrganizationDTO
}
const initialState = Object.freeze({ })

export default class Organization extends Component<InjectedProps, State> {
  readonly state: State = {
    ...initialState,
    data: this.props.data,
  }
  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() { }

  componentDidUpdate(prevProps) {
    const { data: { image } } = this.props;
    const { data: { image: prevImage } } = prevProps;
    if (image === prevImage) return false;
    this.setState(({ data }) => ({ data: {
      ...data,
      image,
    }}));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    // const type = typeof this.state.data[name];
    // const _value = type === 'boolean' ? checked : value
    // const newState = { [name]: _value };
    const newState = { [name]: value };
    this.setState(({ data }) => ({
      data: {
        ...data,
        ...newState
      },
    }));
  }

  updateCitiesList = (name: string) => {
    const { fetchCitiesList } = this.props;
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchCitiesList({ name })
    }, 300)
  }

  handleSelect = (selectedOption, { name }) => this.setState(({ data }) => ({
    data: {
      ...data,
      [name]: (({ value, label }) => ({ id: value, name: label }))(selectedOption),
    }
  }))

  selectImage = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { files } } = e;
    const { uploadOrganizationImage, data: { characterCode } } = this.props;
    if (!files) return false;
    const file = files[0];
    file && uploadOrganizationImage({ code: characterCode, data: file });
  }

  render() {
    const base = 'Organization'
    const {
      onSave,
      onCreate,
      fetchCitiesList,
      cities: {
        data: citiesList,
        isLoading: isCitiesLoading,
      },
      organizationTypes: {
        data: organizationTypes,
        isLoading: isOrganizationTypesLoading,
      },
      organizationCategories: {
        data: {
          list: organizationCategories,
        },
        isLoading: isOrganizationCategoriesLoading,
      },
      errors,
    } = this.props;
    const { message } = { ...errors }
    const error = message && (JSON.parse(message) as { message: any }).message
    const { data } = this.state
    const {
      shortName,
      fullName,
      address,
      headPosition,
      headFio,
      organizationType,
      phone,
      site,
      email,
      city,
      state,
      latitude,
      longitude,
      category,
      openTime,
      closeTime,
      characterCode,
      isOpen,
      isOwner,
      image,
    } = { ...data };
    return (
      <Section
        side={(
          <div className={`${base}__content`}>
            <Group justify="center" content="center" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ fullName }}
                error={error && error['fullName']}
                showTitle
                title="Полное название"
              />
              <Field
                onChange={this.handleChange}
                field={{ shortName }}
                error={error && error['shortName']}
                showTitle
                title="Короткое название"
              />
            </Group>
            <Group justify="center" content="center" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ headFio }}
                error={error && error['headFio']}
                showTitle
                title="Руководитель"
              />
              <Field
                onChange={this.handleChange}
                field={{ headPosition }}
                error={error && error['headPosition']}
                showTitle
                title="Должность"
              />
            </Group>
            <Group justify="center" content="end" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ state }}
                error={error && error['state']}
                showTitle
                title="Страна"
              />
              <ISelect
                title="Город"
                onInputChange={this.updateCitiesList}
                onClick={this.updateCitiesList}
                onChange={this.handleSelect}
                name="city"
                isLoading={isCitiesLoading}
                options={citiesList.map(({ id, city }) => ({ value: id, label: city }) )}
                defaultValue={(({ id, name }) => ({ value: id, label: name }))(city)}
              />
            </Group>
            <Group justify="center" content="center" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ address }}
                error={error && error['address']}
                showTitle
                title="Адресс"
              />
              <Field
                onChange={this.handleChange}
                field={{ site }}
                error={error && error['site']}
                showTitle
                title="Сайт"
              />
            </Group>
            <Group justify="center" content="center" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ email }}
                error={error && error['email']}
                showTitle
                title="Почта"
              />
              <Field
                onChange={this.handleChange}
                field={{ phone: `${phone}` }}
                error={error && error['phone']}
                showTitle
                title="Телефон"
              />
            </Group>
            <Group justify="center" content="center" rotateOnMedia stretched>
              {openTime && (
                <Field
                  onChange={this.handleChange}
                  field={{ openTime }}
                  showTitle
                  readonly
                  title="Время открытия"
                />
              )}
              {closeTime && (
                <Field
                  onChange={this.handleChange}
                  field={{ closeTime }}
                  showTitle
                  readonly
                  title="Время закрытия"
                />
              )}
            </Group>
            <Group justify="center" content="center" rotateOnMedia stretched>
              <ISelect
                title="Тип организации"
                onChange={this.handleSelect}
                name="organizationType"
                isLoading={isOrganizationTypesLoading}
                options={organizationTypes.map(({ id, name }) => ({ value: id, label: name }) )}
                defaultValue={(({ id, name }) => ({ value: id, label: name }))(organizationType)}
              />
              <ISelect
                title="Категория организации"
                onChange={this.handleSelect}
                name="category"
                isLoading={isOrganizationCategoriesLoading}
                options={organizationCategories.map(({ id, name }) => ({ value: id, label: name }) )}
                defaultValue={(({ id, name }) => ({ value: id, label: name }))(category)}
              />
            </Group>
            <Div both className={`${base}__save`}>
              <Button
                level="office-primary"
                angular
                onClick={() => {
                  onSave && onSave(OrganizationModel.deserialize(data).serialize())
                  onCreate && onCreate(OrganizationRegistration.deserialize(data).serialize())
                }}
              >
                {onSave && "Сохранить"}
                {onCreate && "Зарегистрировать организацию"}
              </Button>
            </Div>
          </div>
        )}
      >
        <Div both>
          {onSave && (
            <Image
              className={`${base}__image`}
              src={image && image.path}
              height={200}
              editable
              onChange={this.selectImage}
            >
              {image ? 'Изменить фотографию' : 'Добавить фотографию'}
            </Image>
          )}
          <Group className={`${base}--readonly`}>
            <Div both className={classNames({ 'alert': !isOpen })}>
              {openTime
                ? isOpen
                  ? 'Сейчас открыто'
                  : 'Сейчас закрыто'
                : 'Нет сведений о расписании'}
            </Div>
          </Group>
          <Group stretched="x" className={`${base}__map`}>
            <GoogleApiWrapper {...{ latitude }} {...{ longitude }} />
          </Group>
          <Group orientation="vertical" stretched="x" content="center">
            <Group justify="center" content="center" rotateOnMedia stretched>
              <Field
                onChange={this.handleChange}
                field={{ latitude }}
                error={error && error['latitude']}
                showTitle
                title="Широта"
              />
              <Field
                onChange={this.handleChange}
                field={{ longitude }}
                error={error && error['longitude']}
                showTitle
                title="Долгота"
              />
            </Group>
            <div className="simple-text">Эти параметры необходимы для отображения организации на карте</div>
            <a className="simple-text green-link" href="https://www.latlong.net/" target="_blank">Как узнать эти параметры?</a>
          </Group>
        </Div>
      </Section>
    )
  }
}
