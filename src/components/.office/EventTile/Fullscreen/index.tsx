import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Div from '../../../.ui/Div';
import Group from '../../../.ui/Group';
import Image from '../../../.ui/Image';
import Field from '../../../.ui/.office/Field';
import ScrolledContent from '../../../.ui/ScrolledContent';
import ISelect from '../../../.ui/ISelect';
import GroundImage1 from '../../../../assets/fake_content/ground_images/hermitage.jpg';
import GroundImage2 from '../../../../assets/fake_content/ground_images/hermitage-5.jpg';
import { ReactComponent as NextIcon } from '../../../../assets/icons/next.svg';
import { ReactComponent as LinkIcon } from '../../../../assets/icons/link.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import { ReactComponent as AddIcon } from '../../../../assets/icons/add.svg';
import Button from '../../../.ui/Button';
import { IEventDTO, Event } from '../../../../models';
import GenericList from '../../../.ui/GenericList';
import Icon from '../../../.ui/Icon';
import DateField from '../../../.ui/.office/DateField';
import classNames from '../../../../lib/classNames';
import * as actions from '../../../../actions';
import NumericUpDown from '../../../.ui/NumericUpDown';
import Preloader from '../../../.ui/Preloader';
import { TagsBaseState, EventCatalogBaseState } from '../../../../reducers/catalog-reducer';
import { HasRef } from '../../../../.types/props';
import { officeAppRoutes } from '../../../../common/dictionaries/routes';
import history from '../../../../services';
import { ContextBaseState } from '../../../../reducers/system-reducer';
import Section from '../../../.ui/Section';

export interface DispatchedEventTileFullscreenProps {
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
  fetchTagList: typeof actions.catalogActions.fetchTagListAsync.request;
  uploadImage: typeof actions.eventActions.uploadImageAsync.request;
  uploadImageRange: typeof actions.eventActions.uploadImageRangeAsync.request;
  deleteImageFromRange: typeof actions.eventActions.deleteImageFromRangeAsync.request;
  openModal: typeof actions.systemActions.openModal,
  closeModal: typeof actions.systemActions.closeModal,
}
export interface StoredEventTileFullscreenProps {
  catalog: {
    tags: TagsBaseState;
    event: EventCatalogBaseState;
  },
}
type Props = typeof defaultProps
  & DispatchedEventTileFullscreenProps
  & StoredEventTileFullscreenProps
  & HasRef<HTMLDivElement>
  & {
    data: IEventDTO;
  }
const defaultProps = Object.freeze({})
type State = typeof initialState & {
  data: IEventDTO,
}
const initialState = Object.freeze({})
export default class EventTile extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    data: this.props.data,
  }

  componentDidMount() {
    const { data } = this.props
    this.setState(prevState => ({
      ...prevState,
      data,
    }))
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if (prevProps.data && prevProps.data.characterCode !== data.characterCode) {
      history.push(`${officeAppRoutes.OFFICE_EVENT_PAGE.absolutePath}/${data.characterCode}`)
    }
    if (prevProps.data && prevProps.data.images !== data.images) {
      this.setState(prevState => ({
        ...prevState,
        data: {
          ...data,
          images: data.images,
        },
      }))
    }
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    const type = typeof this.state.data[name];
    const _value = type === 'boolean' ? checked : value
    const newState = { [name]: _value };
    this.setState(({ data }) => ({
      data: {
        ...data,
        ...newState
      },
    }));
  }

  handleApproveChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;
    const type = typeof this.state.data[name];
    const newState: Partial<IEventDTO> = {
      [name]: checked,
    };
    this.setState(({ data }) => ({
      data: {
        ...data,
        ...newState
      },
    }));
  }

  handleFieldChange = (field: string, value?: string | number) => {
    const newState = { [field]: value };
    this.setState(({ data }) => ({
      data: {
        ...data,
        ...newState
      },
    }));
  }

  handleTagSelect = selectedOptions => {
    if (!selectedOptions) selectedOptions = []
    this.setState(({ data }) => ({
      data: {
        ...data,
        tags: [...selectedOptions.map(({ value, label }) => ({ id: value, name: label }))],
      }
    }))
  };

  handleSelect = (selectedOption, { name }) => this.setState(({ data }) => ({
    data: {
      ...data,
      [name]: (({ value, label }) => ({ id: value, name: label }))(selectedOption),
    }
  }))

  selectImage = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { files } } = e;
    const { data: { characterCode }, uploadImage } = this.props;
    if (!files) return false;
    const file = files[0];
    file && uploadImage({ code: characterCode, data: file });
  }

  selectImageRange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { files } } = e;
    const { data: { characterCode }, uploadImageRange } = this.props;
    if (!files) return false;
    files[0] && uploadImageRange({ code: characterCode, data: files });
  }

  updateMinMaxClassList = (selectedOption, { name }) => this.setState(({ data }) => ({
    data: {
      ...data,
      [name]: (({ value }) => value)(selectedOption),
    }
  }))

  render() {
    const base = "Event-Tile-Fullscreen"
    const {
      deleteEvent,
      editEvent,
      deleteImageFromRange,
      openModal,
      closeModal,
      catalog: {
        event: {
          formatList,
          levelList,
        },
        tags: {
          data: tagData,
          isLoading: isTagsLoading,
        },
      },
    } = this.props
    const { list: tagList } = { ...tagData }
    const {
      data: {
        id,
        characterCode,
        image,
        name,
        startDate,
        finishDate,
        requestStartDate,
        requestFinishDate,
        format,
        eventDuration,
        level,
        finished,
        location,
        description,
        wwwLink,
        needApprove,
        published,
        costPerson,
        tags,
        images,
      },
      // ---
    } = this.state;
    return (
      <Section
        side={(
          <div className={`${base}__content`}>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                justify="space-between"
                field={{ needApprove }}
                onChange={this.handleApproveChange}
              >
                Только по записи
              </Field>
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                showTitle
                justify="space-between"
                field={{ name }}
                onChange={this.handleChange}
                title="Название"
              />
              <Field
                title="Местоположение"
                showTitle
                field={{ location }}
                justify="space-between"
                onChange={this.handleChange}
              />
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <ISelect
                title="Формат мероприятия"
                name="format"
                onChange={this.handleSelect}
                options={formatList.data.map(({ id, name }) => ({ value: id, label: name }))}
                isSearchable
                isLoading={formatList.isLoading}
                defaultValue={(({ id, name }) => ({ value: id, label: name }))(format)}
              />
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <ISelect
                title="Уровень мероприятия"
                name={`level`}
                onChange={this.handleSelect}
                options={levelList.data.map(({ id, name }) => ({ value: id, label: name }))}
                isSearchable
                isLoading={levelList.isLoading}
                defaultValue={(({ id, name }) => ({ value: id, label: name }))(level)}
              />
              <ISelect
                title="Тэги"
                onChange={this.handleTagSelect}
                options={tagList && tagList.map(({ id, name }) => ({ value: id, label: name }))}
                isMulti
                isLoading={isTagsLoading}
                defaultValue={tags.map(({ id, name }) => ({ value: id, label: name }))}
              />
            </Group>
            <Group justify="start" content="start" rotateOnMedia stretched>
              <DateField
                required
                title="Начало"
                field={{ startDate }}
                handleChange={this.handleFieldChange}
                {...{ openModal }}
                {...{ closeModal }}
              />
              <DateField
                title="Конец"
                field={{ finishDate }}
                handleChange={this.handleFieldChange}
                {...{ openModal }}
                {...{ closeModal }}
              />
            </Group>
            {needApprove && (
              <Group justify="start" content="start" rotateOnMedia stretched>
                <DateField
                  required
                  title="Начало приема заявок"
                  field={{ requestStartDate }}
                  handleChange={this.handleFieldChange}
                  {...{ openModal }}
                  {...{ closeModal }}
                />
                <DateField
                  title="Конец приема заявок"
                  field={{ requestFinishDate }}
                  handleChange={this.handleFieldChange}
                  {...{ openModal }}
                  {...{ closeModal }}
                />
              </Group>
            )}
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                title="Сайт"
                showTitle
                field={{ wwwLink }}
                justify="space-between"
                onChange={this.handleChange}
              />
            </Group>
            <Group justify="start" content="center" rotateOnMedia stretched>
              <Field
                title="Стоимость"
                showTitle
                field={{ costPerson }}
                justify="space-between"
                onChange={this.handleChange}
              />
            </Group>
            <Div both className={`${base}__save`}>
              <Button
                level="office-primary"
                angular
                onClick={() => editEvent(Event.deserialize(this.state.data).serialize())}
              >
                Сохранить
              </Button>
            </Div>
            <Div both className={`${base}__delete`}>
              <Button
                angular
                level="office-alert"
                before={<Icon noStroke svg={TrashIcon} />}
                onClick={() => deleteEvent(characterCode)}
              />
            </Div>
          </div>
        )}
      >
        <Image
          className={`${base}__image`}
          src={image && image.path}
          height={200}
          editable
          onChange={this.selectImage}
        >
          {image ? 'Изменить изображение' : 'Добавить изображение'}
        </Image>
        <Field
          justify="space-between"
          field={{ published }}
          onChange={this.handleChange}
        >
          Опубликовать
        </Field>
        <Image
          editable
          multiple
          onChange={this.selectImageRange}
          className={`${base}__add-image`}
        >
          <Button
            level="office-secondary"
            angular
            stretched="x"
            before={<Icon noStroke svg={AddIcon} />}
          >
            Добавить изображение
          </Button>
        </Image>
        <ScrolledContent
          orientation="horizontal"
          stretched
          className={`${base}__image-list`}
          buttonProps={{
            level: "primary"
          }}
        >
          {images.length > 0 ? (
            images.map(({ id, path }) => (
              <Image key={id} src={path}>
                <Group stretched content="end" justify="end">
                  <Button
                    level="simple"
                    size="s"
                    angular
                    before={<Icon svg={TrashIcon} size={15} />}
                    onClick={() => deleteImageFromRange({ code: characterCode, data: id })}
                  />
                </Group>
              </Image>
            ))
          ) : [...Array(4)].map((_, idx) => <Image key={idx} editable multiple onChange={this.selectImageRange} />)
          }
        </ScrolledContent>
        <Field
          title="Описание"
          showTitle
          field={{ description }}
          justify="space-between"
          isTextBox
          onChange={this.handleChange}
        />
      </Section>
    )
  };
}
