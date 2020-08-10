import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Div from '../../.ui/Div';
import Group from '../../.ui/Group';
import Image from '../../.ui/Image';
import Field from '../../.ui/.office/Field';
import ScrolledContent from '../../.ui/ScrolledContent';
import ISelect from '../../.ui/ISelect';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import { ReactComponent as LinkIcon } from '../../../assets/icons/link.svg';
import { ReactComponent as TrashIcon } from '../../../assets/icons/trash.svg';
import { ReactComponent as AddIcon } from '../../../assets/icons/add.svg';
import { ReactComponent as TimeIcon } from '../../../assets/icons/time-stroke.svg';
import Button from '../../.ui/Button';
import { IEventDTO, Event } from '../../../models';
import GenericList from '../../.ui/GenericList';
import Icon from '../../.ui/Icon';
import DateField from '../../.ui/.office/DateField';
import classNames from '../../../lib/classNames';
import * as actions from '../../../actions';
import { TagsBaseState, EventCatalogBaseState } from '../../../reducers/catalog-reducer';
import { HasRef } from '../../../.types/props';
import { officeAppRoutes } from '../../../common/dictionaries/routes';

export interface DispatchedEventTileProps {
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
  fetchTagList: typeof actions.catalogActions.fetchTagListAsync.request;
  uploadImage: typeof actions.eventActions.uploadImageAsync.request;
  uploadImageRange: typeof actions.eventActions.uploadImageRangeAsync.request;
  deleteImageFromRange: typeof actions.eventActions.deleteImageFromRangeAsync.request;
  fetchEventFormatList: typeof actions.catalogActions.fetchEventFormatList.request;
  fetchEventLevelList: typeof actions.catalogActions.fetchEventLevelList.request;
}
export interface StoredEventTileProps {
  catalog: {
    tags: TagsBaseState;
    event: EventCatalogBaseState;
  }
}
type Props = typeof defaultProps
& DispatchedEventTileProps
& StoredEventTileProps
& HasRef<HTMLDivElement>
& {
  data: IEventDTO;
}
const defaultProps = Object.freeze({ })

type State = typeof initialState & {
  data: IEventDTO,
}
const initialState = Object.freeze({
  optionalClosed: true,
})
export default class EventTile extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    data: this.props.data,
  }

  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true

  componentDidMount() {
    const { data } = this.props
    this.setState(prevState => ({
      ...prevState,
      data,
    }))
  }

  componentDidUpdate(prevProps) {
    const { data, data: { images, image } }= this.props
    const newDataState: Partial<IEventDTO> = {}
    if (prevProps.data && prevProps.data.images !== images) {
      newDataState.images = images
    }
    if (prevProps.data && prevProps.data.image !== image) {
      newDataState.image = image
    }
    Object.keys(newDataState).length !== 0 &&
    this.setState(prevState => ({
      ...prevState,
      data: {
        ...data,
        ...newDataState,
      },
    }))
  }
  
  componentWillUnmount() {
    this._isMounted = false;
    this._intervalId && clearInterval(this._intervalId)
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

  optionalTrigger = () => {
    this.setState(prevState => ({ optionalClosed: !prevState.optionalClosed }))
  }

  updateTagList = (search: string) => {
    const { fetchTagList } = this.props;
    this._intervalId && clearInterval(this._intervalId)
    if (!this._isMounted) return;
    this._intervalId = setTimeout(() => {
      fetchTagList({ search })
    }, 300)
  }

  updateMinMaxClassList = (selectedOption, { name }) => this.setState(({ data }) => ({
    data: {
      ...data,
      [name]: (({ value }) => value)(selectedOption),
    }
  }))

  render() {
    const base = "Event-Tile"
    const {
      deleteEvent,
      editEvent,
      deleteImageFromRange,
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
      fetchTagList,
    } = this.props
    const { list: tagList } = { ...tagData }
    const {
      optionalClosed,
      data,
      data: {
        characterCode,
        status,
        image,
        name,
        startDate,
        finishDate,
        requestStartDate,
        requestFinishDate,
        published,
        needApprove,
        format,
        eventDuration,
        level,
        finished,
        location,
        description,
        wwwLink,
        maxClass,
        minClass,
        costPerson,
        tags,
        images,
      },
    } = this.state;
    return (
      <Group className={base} content="stretch">
        <div className={`${base}__main`}>
          <Image
            src={image && image.path}
            height={100}
            editable
            onChange={this.selectImage}
          >
            {image ? 'Изменить изображение' : 'Добавить изображение'}
          </Image>
          {status === "Ожидает модерацию" && (
            <Button
              level="alert"
              angular
              size="s"
              before={<Icon svg={TimeIcon} />}
              className={`${base}__isModerating`}
            >
              Ожидает модерацию
            </Button>
          )}
          <Link to={`${officeAppRoutes.OFFICE_ANY_EVENT_PAGE.absolutePath}/${characterCode}`}>
            <Button
              level="office-secondary"
              stretched="x"
              angular
              before={<Icon svg={LinkIcon} noStroke size={17} />}
            >
              Открыть полностью
            </Button>
          </Link>
          <hr />
          <Div both>
            <Field
              justify="space-between"
              field={{ published }}
              onChange={this.handleChange}
            >
              Опубликовать
            </Field>
            <Field
              className={`${base}__name`}
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
            <Div both half>
              <Image
                editable
                multiple
                onChange={this.selectImageRange}
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
            </Div>
            <Div both>
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
            </Div>
            <Div both>
              <Group justify="space-between">
                <Button
                  level="office-primary"
                  onClick={() => editEvent(Event.deserialize(data).serialize())}
                >
                  Сохранить
                </Button>
                <Button
                  level={optionalClosed ? 'office-secondary': 'office-primary'}
                  angular
                  className={classNames(`${base}__optional-trigger`,{
                    'reverse': !optionalClosed
                  })}
                  before={<Icon svg={NextIcon} noFill />}
                  onClick={this.optionalTrigger}
                >
                  Еще
                </Button>
              </Group>
            </Div>
          </Div>
        </div>
        <ScrolledContent orientation="vertical" className={classNames(`${base}__optional`, {
          'closed': optionalClosed,
        })}>
          <Div both>
            <Field
              title="Описание"
              showTitle
              field={{ description }}
              justify="space-between"
              isTextBox
              onChange={this.handleChange}
            />
            <DateField
              required
              title="Начало"
              field={{ startDate }}
              handleChange={this.handleFieldChange}
            />
            <DateField
              title="Конец"
              field={{ finishDate }}
              handleChange={this.handleFieldChange}
            />
            <Field
              justify="space-between"
              field={{ needApprove }}
              onChange={this.handleApproveChange}
            >
              Только по записи
            </Field>
            {needApprove && (
              <>
                <DateField
                  required
                  title="Начало приема заявок"
                  field={{ requestStartDate }}
                  handleChange={this.handleFieldChange}
                />
                <DateField
                  title="Конец приема заявок"
                  field={{ requestFinishDate }}
                  handleChange={this.handleFieldChange}
                />
              </>
            )}
            <ISelect
              title="Формат мероприятия"
              name={`format`}
              onChange={this.handleSelect}
              options={formatList.data.map(({ id, name }) => ({ value: id, label: name }))}
              isSearchable
              isLoading={formatList.isLoading}
              defaultValue={(({ id, name }) => ({ value: id, label: name }))(format)}
            />
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
              name={`tags`}
              onInputChange={this.updateTagList}
              onChange={this.handleTagSelect}
              options={tagList && tagList.map(({ id, name }) => ({ value: id, label: name }))}
              isMulti
              isSearchable
              isLoading={isTagsLoading}
              defaultValue={tags.map(({ id, name }) => ({ value: id, label: name }))}
            />
            <Group>
              <ISelect
                title="Параллель классов"
                name="minClass"
                onChange={this.updateMinMaxClassList}
                options={[...Array(11)].map((_, idx) => ({ value: idx + 1, label: idx + 1 }))}
                isSearchable
                defaultValue={(num => ({ value: num, label: num }))(minClass)}
              />
              <ISelect
                title="До"
                name="maxClass"
                onChange={this.updateMinMaxClassList}
                options={[...Array(11 - minClass!)].map((_, idx) => ({ value: idx + 1 + minClass!, label: idx + 1 + minClass! }))}
                isSearchable
                defaultValue={(num => ({ value: num, label: num }))(maxClass)}
              />
            </Group>
            <hr />
            <Field
              title="Сайт"
              showTitle
              field={{ wwwLink }}
              justify="space-between"
              onChange={this.handleChange}
            />
            <Field
              title="Стоимость"
              showTitle
              field={{ costPerson }}
              justify="space-between"
              onChange={this.handleChange}
            />
            <hr />
            <Div both>
              <Button
                stretched="x"
                angular
                level="office-alert"
                before={<Icon noStroke svg={TrashIcon} />}
                onClick={() => deleteEvent(characterCode)}
              >
                Удалить мероприятие
              </Button>
            </Div>
          </Div>
        </ScrolledContent>
      </Group>
    )
  };
}

export class EventTileList extends GenericList<IEventDTO> {}
