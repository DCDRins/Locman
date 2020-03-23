import React, { Component } from 'react'
import Div from '../../Div';
import Group from '../../Group';
import Image from '../../Image';
import Field from '../Field';
import ScrolledContent from '../../ScrolledContent';
import ISelect from '../../ISelect';
import GroundImage from '../../../../assets/fake_content/ground_images/hermitage-2.jpg';
import GroundImage1 from '../../../../assets/fake_content/ground_images/hermitage.jpg';
import GroundImage2 from '../../../../assets/fake_content/ground_images/hermitage-5.jpg';
import GroundImage3 from '../../../../assets/fake_content/ground_images/hermitage-3.jpg';
import { ReactComponent as NextIcon } from '../../../../assets/icons/next.svg';
import { ReactComponent as DateIcon } from '../../../../assets/icons/date.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import Button from '../../Button';
import { IEventDTO, Event, Tag } from '../../../../models/event';
import GenericList from '../../GenericList';
import DateTimePicker from '../../DateTImePicker';
import Icon from '../../Icon';
import DateField from '../DateField';
import classNames from '../../../../lib/classNames';
import * as actions from '../../../../actions';
import NumericUpDown from '../../NumericUpDown';
import { TagsBaseState } from '../../../../reducers/event-reducer';
import { Pagination } from '../../../../.types/types';
import Preloader from '../../Preloader';

export interface DispatchedSimpleBlockProps {
  createEvent: typeof actions.eventActions.createEventAsync.request;
  editEvent: typeof actions.eventActions.editEventAsync.request;
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request;
  // fetchTagList: typeof actions.eventActions.fetchTagListAsync.request;
  uploadImage: typeof actions.eventActions.uploadImageAsync.request;
}
export interface StoredSimpleBlockProps {
  tags: Pagination<Tag>;
  isTagsLoading: boolean;
  tagsError: Error;
}

interface Props extends DispatchedSimpleBlockProps, StoredSimpleBlockProps {
  data: IEventDTO;
}
type State = typeof initialState & {
  data: IEventDTO,
  image?: string,
}

const initialState = Object.freeze({
  optionalClosed: true,
})

export default class SimpleBlock extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    data: this.props.data,
  }
  
  componentDidMount() {
    const { data }= this.props
    this.setState(prevState => ({
      ...prevState,
      data,
    }))
  }
  
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    const type = typeof this.state[name];
    const _value = type === 'boolean' ? checked : value
    const newState = { [name]: _value };
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

  handleTagSelect = selectedOption => {
    const { data, data: { tags } } = this.state
    this.setState({
      data: {
        ...data,
        tags: Array.isArray(tags) ? [
          ...tags,
          selectedOption,
        ] : [],
      }
    })
    // }, () => console.log(`Option selected:`, selectedOption));
  };

  selectImage = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget: { files } } = e;
    const { data: { characterCode }, uploadImage } = this.props;
    if (!files) return false;
    const file = files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = () => {
      const image = reader.result
      if (typeof image === 'string') {
        this.setState({ image })
      }  
    }
    file && uploadImage({ code: characterCode, data: file });
  }


  optionalTrigger = () => {
    this.setState(prevState => ({ optionalClosed: !prevState.optionalClosed }))
  }

  render() {
    const base = "Simple-Block"
    const {
      deleteEvent,
      editEvent,
      tags: {
        list: tagList,
      },
      isTagsLoading,
    } = this.props
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
        finished,
        location,
        description,
        wwwLink,
        ageLimit,
        costPerson,
        tags,
      },
      image: selectedFile,
      // ---
      optionalClosed,
    } = this.state;
    return (
      <Group className={base} content="stretch">
        <div className={`${base}__main`}>
           <Image
            src={selectedFile ? selectedFile : image}
            height={100}
            rounded
            editable
            onChange={this.selectImage}
          >
            {image ? 'Изменить изображение' : 'Добавить изображение'}
          </Image>
          <Div both>
            <Field
              field={{ finished: true }}
              justify="space-between"
              onChange={this.handleChange}
            >
              Опубликовать
            </Field>
          </Div>
          <hr />
          <Div both>
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
            {/* // if imagelist */}
            <ScrolledContent orientation="horizontal">
              <Div both>
                <Group justify="start">
                  <Div>
                    <Image src={GroundImage1} height={50} width={50} bordered />
                  </Div>
                  <Div both>
                    <Image src={GroundImage2} height={50} width={50} bordered />
                  </Div>
                  <Div>
                    <Image src={GroundImage3} height={50} width={50} bordered />
                  </Div>
                  <Div both>
                    <Image src={GroundImage2} height={50} width={50} bordered />
                  </Div>
                  <Div>
                    <Image src={GroundImage3} height={50} width={50} bordered />
                  </Div>
                  <Div both>
                    <Image src={GroundImage2} height={50} width={50} bordered />
                  </Div>
                  <Div>
                    <Image src={GroundImage3} height={50} width={50} bordered />
                  </Div>
                </Group>
              </Div>
            </ScrolledContent>
            <Div both>
              <Group justify="space-between">
                <Button
                  level="office-primary"
                  onClick={() => editEvent(Event.deserialize(this.state.data).serialize())}
                >
                  Сохранить
                </Button>
                <Button
                  level={optionalClosed ? 'office-secondary': 'office-primary'}
                  angular
                  className={classNames(`${base}__optional-trigger`,{
                    'reverse': !optionalClosed
                  })}
                  before={<Icon svg={NextIcon} />}
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
            {description !== undefined && (
              <Field
                title="Описание"
                showTitle
                field={{ description }}
                justify="space-between"
                onChange={this.handleChange}
              />
            )}
            {wwwLink !== undefined && (
              <Field
                title="Сайт"
                showTitle
                field={{ wwwLink }}
                justify="space-between"
                onChange={this.handleChange}
              />
            )}
            {ageLimit !== undefined && (
              <NumericUpDown
                title="Возрастное ограничение"
                handleChange={this.handleFieldChange}
                field={{ ageLimit }}
                min={1}
                max={21}
                step={1}
              />
            )}
            {costPerson !== undefined && (
              <Field
                title="Стоимость"
                showTitle
                field={{ costPerson }}
                justify="space-between"
                onChange={this.handleChange}
              />
            )}
            <Div both>
              <Div>
                Тэги
              </Div>
              <Preloader isLoading={isTagsLoading} size={30} />
              {!isTagsLoading && tagList && (
                <ISelect
                  onChange={this.handleTagSelect}
                  options={tagList.map(({ id, name }) => ({ value: id, label: name }))}
                  // value={tags}
                />
              )}
            </Div>
            <DateField
              required
              title="Начало"
              field={{ startDate }}
              handleChange={this.handleFieldChange}
            />
            {finishDate !== undefined && (
              <DateField
                title="Конец"
                field={{ finishDate }}
                handleChange={this.handleFieldChange}
              />
            )}
            {requestStartDate !== undefined && (
              <DateField
                title="Начало приема заявок"
                field={{ requestStartDate }}
                handleChange={this.handleFieldChange}
              />
            )}
            {requestFinishDate !== undefined && (
              <DateField
                title="Конец приема заявок"
                field={{ requestFinishDate }}
                handleChange={this.handleFieldChange}
              />
            )}
            <Div both>
              <Button
                stretched="x"
                angular
                level="alert"
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

export class SimpleBlockList extends GenericList<IEventDTO> {}
