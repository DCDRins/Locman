import React, { Component } from 'react'
import moment from 'moment'
import './node_modules/moment/locale/ru';
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
import { IEventDTO, Event } from '../../../../models/event';
import GenericList from '../../GenericList';
import DateTimePicker from '../../DateTImePicker';
import Icon from '../../Icon';
import classNames from '../../../../lib/classNames';
import * as actions from '../../../../actions';

type Props = {
  data: IEventDTO
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request,
  editEvent: typeof actions.eventActions.editEventAsync.request,
}
type State = typeof initialState & {
  data: IEventDTO,
}

const initialState = Object.freeze({
  m: moment(),
  datePickerClosed: true,
  optionalClosed: true,
})

export default class SimpleBlock extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    data: this.props.data,
  }
  handleMomentChange = m => this.setState({ m })

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

  datePickerTrigger = () => {
    this.setState(prevState => ({ datePickerClosed: !prevState.datePickerClosed }))
  }

  optionalTrigger = () => {
    this.setState(prevState => ({ optionalClosed: !prevState.optionalClosed }))
  }

  render() {
    const base = "Simple-Block"
    const { deleteEvent, editEvent } = this.props
    const {
      data: {
        id,
        characterCode,
        image,
        name,
        startDate,
        finishDate,
        finished,
        location,
        description,
        wwwLink,
        ageLimit,
      },
      // ---
      m,
      datePickerClosed,
      optionalClosed,
    } = this.state;
    return (
      <Group className={base} content="stretch">
        <div className={`${base}__main`}>
          {/* <Image src={GroundImage2} height={200} />
          <Image height={50}>Изменить изображение</Image> */}
          {image ? (
            <Image editable src={GroundImage} height={200} />
          ) : (
            <Image editable height={50}>Добавить изображение</Image>
          )}
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
            <Field
              title="Описание"
              showTitle
              field={{ description }}
              justify="space-between"
              onChange={this.handleChange}
            />
            <Field
              title="Сайт"
              showTitle
              field={{ wwwLink }}
              justify="space-between"
              onChange={this.handleChange}
            />
            <Field
              title="Возрастное ограничение"
              showTitle
              field={{ ageLimit }}
              justify="space-between"
              onChange={this.handleChange}
            />
            <Div both>
              <Div>
                Тэги
              </Div>
              <ISelect
                options={[
                  { value: 1, label: 'name'},
                  { value: 2, label: 'name2'},
                  { value: 3, label: 'name3'},
                ]}
                value={[{ value: 1, label: 'name'},
                        { value: 2, label: 'name2'}]}
              />
            </Div>
            <Div both>
              <Div>
                Начало мероприятия
              </Div>
              <Button
                angular
                stretched="x"
                level="office-secondary"
                before={<Icon svg={DateIcon} />}
                onClick={this.datePickerTrigger}
              >
                {m.locale('ru').format('llll')}
              </Button>
              <DateTimePicker
                className={`${base}__date-picker`}
                moment={m.locale('ru')}
                onChange={this.handleMomentChange}
                minStep={5}
                isClosed={datePickerClosed}
                onSave={this.datePickerTrigger}
              />
            </Div>
            <Div both>
              <Div>
                Конец мероприятия
              </Div>
              <Button
                angular
                stretched="x"
                level="office-secondary"
                before={<Icon svg={DateIcon} />}
                onClick={this.datePickerTrigger}
              >
                {m.locale('ru').format('llll')}
              </Button>
              <DateTimePicker
                className={`${base}__date-picker`}
                moment={m.locale('ru')}
                onChange={this.handleMomentChange}
                minStep={5}
                isClosed={datePickerClosed}
                onSave={this.datePickerTrigger}
              />
            </Div>
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
