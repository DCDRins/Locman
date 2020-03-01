import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/ru';
import Div from '../../Div';
import Group from '../../Group';
import Image from '../../Image';
import Field from '../Field';
import ScrolledContent from '../../ScrolledContent';
import GroundImage from '../../../../assets/fake_content/ground_images/hermitage-2.jpg';
import GroundImage1 from '../../../../assets/fake_content/ground_images/hermitage.jpg';
import GroundImage2 from '../../../../assets/fake_content/ground_images/hermitage-5.jpg';
import GroundImage3 from '../../../../assets/fake_content/ground_images/hermitage-3.jpg';
import { ReactComponent as NextIcon } from '../../../../assets/icons/next.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
import Button from '../../Button';
import { IEventDTO, Event } from '../../../../models/event';
import GenericList from '../../GenericList';
import DateTimePicker from '../../../.ui/DateTImePicker';
import Icon from '../../Icon';
import classNames from '../../../../lib/classNames';
import * as actions from '../../../../actions';

type Props = {
  data: IEventDTO
  deleteEvent: typeof actions.eventActions.deleteEventAsync.request,
  editEvent: typeof actions.eventActions.editEventAsync.request,
}
type State = typeof initialState
& IEventDTO
& { }

const initialState = Object.freeze({
  m: moment(),
  datePickerClosed: true,
})

export default class SimpleBlock extends Component<Props, State> {
  readonly state: State = {
    ...initialState,
    ...(this.props.data)
  }
  handleMomentChange = m => this.setState({ m })

  componentDidMount() {
    const { data: propsToState }= this.props
    this.setState(prevState => ({
      ...prevState,
      ...propsToState,
    }))
  }
  
  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.currentTarget;
    const type = typeof this.state[name];
    const _value = type === 'boolean' ? checked : value
    const newState = { [name]: _value };
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }

  datePickerTrigger = () => {
    this.setState(prevState => ({ datePickerClosed: !prevState.datePickerClosed }))
  }

  render() {
    const base = "Simple-Block"
    const { deleteEvent, editEvent } = this.props
    const {
      id,
      characterCode,
      image,
      name,
      startDate,
      finishDate,
      finished,
      location,
      description = '',
      wwwLink = '',
    } = this.state // as props
    const { m, datePickerClosed } = this.state
    return (
      <div className={base}>
        <Image src={GroundImage2} height={200} />
        <Image height={50}>Изменить изображение</Image>
        {/* {image ? (
          <Image src={GroundImage} height={200} />
        ) : (
          <Image height={50}>Добавить изображение</Image>
        )} */}
        <Div both>
          <Field
            field={{ finished }}
            justify="space-between"
            onChange={this.handleChange}
          >
            Опубликовать мероприятие
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
          {/* // if imagelist */}
          <ScrolledContent>
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
          <Field
            title="Описание"
            showTitle
            field={{ description }}
            justify="space-between"
            onChange={this.handleChange}
          />
          <Field
            title="Местоположение"
            showTitle
            field={{ location }}
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
          <Div both>
            <Group justify="start">
              <Button
                angular
                stretched
                level="office-secondary"
                className={classNames(`${base}__datepicker-trigger`, {
                  'isClosed': datePickerClosed,
                })}
                before={<Icon svg={NextIcon} />}
                onClick={this.datePickerTrigger}
              >
                {m.locale('ru').format('llll')}
              </Button>
            </Group>
          </Div>
          <DateTimePicker
            moment={m.locale('ru')}
            onChange={this.handleMomentChange}
            minStep={5}
            isClosed={datePickerClosed}
          />
          <Div both>
            <Group justify="space-between">
              <Button
                level="alert"
                before={<Icon noStroke svg={TrashIcon} />}
                onClick={() => deleteEvent(characterCode)}
              />
              <Button
                stretched
                level="office-secondary"
                onClick={() => editEvent(Event.deserialize(this.state).serialize())}
              >
                Сохранить
              </Button>
            </Group>
          </Div>
        </Div>
      </div>
    )
  };
}

export class SimpleBlockList extends GenericList<IEventDTO> {}
