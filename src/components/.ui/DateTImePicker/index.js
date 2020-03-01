import React, { Component } from 'react';
import Calendar from './calendar';
import Time from './time';
import classNames from '../../../lib/classNames';
import Button from '../Button';
import { ReactComponent as TimeIcon } from '../../../assets/icons/time.svg';
import { ReactComponent as DateIcon } from '../../../assets/icons/date.svg';
import Icon from '../Icon';
import Group from '../Group';
import Div from '../Div';

export default class DateTimePicker extends Component {
  static defaultProps = {
    minStep: 1,
    hourStep: 1
  };

  state = {
    tab: 0
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    const { onSave } = this.props
    onSave && onSave();
  };

  render() {
    const base = 'Date-Time-Picker';
    const { tab } = this.state;
    const {
      moment,
      className,
      prevMonthIcon,
      nextMonthIcon,
      minStep,
      hourStep,
      onSave,
      onChange,
      isClosed,
      ...props
    } = this.props;

    return (
      <Div both className={classNames(base, className, {
        'closed': isClosed,
      })} {...props}>
        <Group stretched content="center" justify="center">
          <Div both>
            <Button
              className={classNames('ion-calendar im-btn')}
              level={tab === 0 ? 'office-primary' : 'office-secondary'}
              size="s"
              angular
              onClick={e => this.handleClickTab(e, 0)}
              before={<Icon svg={DateIcon} size={10} />}
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
              before={<Icon svg={TimeIcon} size={10} />}
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
        {/* {onSave && ( */}
        <Group content="center" justify="center">
          <Button
            level="office-tertiary"
            size="l"
            angular
            stretched
          >
            Сохранить
          </Button>
        </Group>
        {/* )} */}
      </Div>
    );
  }
}
