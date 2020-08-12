import React, { Component, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import Time from './time';
import classNames from '../../../lib/classNames';
import Button from '../Button';
import { ReactComponent as TimeIcon } from '../../../assets/icons/time.svg';
import { ReactComponent as DateIcon } from '../../../assets/icons/date.svg';
import Icon from '../Icon';
import Group from '../Group';
import Div from '../Div';
import { HasClassName, HasStyleObject } from '../../../.types/props';
import { Moment } from 'moment';
import * as actions from '../../../actions';
import { ContextBaseState } from '../../../reducers/system-reducer';

export type InjectedProps = typeof defaultProps
& HTMLAttributes<HTMLDivElement>
& HasClassName
& {
  // onSave: () => void;
  moment: Moment;
}

const defaultProps = Object.freeze({
  minStep: 1,
  hourStep: 1
})

type DatePickerState = typeof initialState & HasStyleObject;

const initialState = Object.freeze({
  tab: 0,
})

export default class DateTimePicker extends Component<InjectedProps, DatePickerState> {
  static readonly defaultProps = defaultProps;
  readonly state: DatePickerState = initialState


  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  // handleSave = e => {
  //   e.preventDefault();
  //   const { onSave } = this.props
  //   onSave && onSave();
  // };

  render() {
    const base = 'Date-Time-Picker';
    const { tab } = this.state;
    const {
      moment,
      minStep,
      hourStep,
      className = '',
      onChange,
      ...props
    } = this.props;
    return (
      <Div both className={classNames(base, className, {
        // 'closed': isClosed,
      })} {...props}>
        <Group content="stretch" justify="center">
          <Div both>
            <Button
              className={classNames('ion-calendar im-btn')}
              level={tab === 0 ? 'office-primary' : 'office-secondary'}
              size="s"
              angular
              onClick={e => this.handleClickTab(e, 0)}
              before={<Icon isRect svg={DateIcon} size={10} />}
            >
              Дата
            </Button>
          </Div>
          <Div>
            <Button
              className={classNames('ion-calendar im-btn')}
              level={tab === 1 ? 'office-primary' : 'office-secondary'}
              size="s"
              angular
              onClick={e => this.handleClickTab(e, 1)}
              before={<Icon isRect svg={TimeIcon} size={10} />}
            >
              Время
            </Button>
          </Div>
        </Group>
        <div className={`${base}__tabs`}>
          <Calendar
            className={classNames(`${base}__tab`, { 'active': tab === 0 })}
            {...{ moment }}
            {...{ onChange }}
          />
          <Time
            className={classNames(`${base}__tab`, { 'active': tab === 1 })}
            {...{ moment }}
            {...{ minStep }}
            {...{ hourStep }}
            {...{ onChange }}
          />
        </div>
      </Div>
    );
  }
}
