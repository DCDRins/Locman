import React, { Component } from 'react';
import range from 'lodash/range';
import chunk from 'lodash/chunk';
import classNames from '../../../lib/classNames';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/icons/previous.svg';
import Button from '../Button';
import Icon from '../Icon';
import Group from '../Group';
import Div from '../Div';

const Day = ({ i, w, d, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const cls = classNames(`${className}__day`, {
    [`${className}__prev-month`]: prevMonth,
    [`${className}__next-month`]: nextMonth,
    [`${className}__current-day`]: !prevMonth && !nextMonth && i === d
  });

  return <div className={cls} {...props}>{i}</div>;
};

export default class Calendar extends Component {
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const moment = this.props.moment;

    if (prevMonth) moment.subtract(1, 'month');
    if (nextMonth) moment.add(1, 'month');

    moment.date(i);

    this.props.onChange(moment);
  };

  prevMonth = e => {
    e.preventDefault();
    const { onChange, moment } = this.props;
    onChange(moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    const { onChange, moment } = this.props;
    onChange(moment.add(1, 'month'));
  };

  render() {
    const { moment, className } = this.props;
    const d = moment.date();
    const d1 = moment.clone().subtract(1, 'month').endOf('month').date();
    const d2 = moment.clone().date(0).day();
    const d3 = moment.clone().endOf('month').date();
    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const base = 'Calendar';
    return (
      <div className={classNames(base, className)}>
        <Group content="center" justify="space-between" className={`${base}__toolbar`}>
          <Button
            size="s"
            level="office-secondary"
            before={<Icon svg={PreviousIcon} isRect size="s" />}
            onClick={this.prevMonth}
          />
          <span className={`${base}__current-date`}>{moment.format('MMMM YYYY')}</span>
          <Button
            size="s"
            level="office-secondary"
            before={<Icon svg={NextIcon} isRect size="s" />}
            onClick={this.nextMonth}
          />
        </Group>
        <Group content="center" justify="center">
          {weeks.map((w, i) => (
            <div key={i} className={`${base}__week-day`}>
              {w}
            </div>
          ))}
        </Group>
          {chunk(days, 7).map((row, w) =>
            <Group content="center" justify="center" key={w}>
              {row.map(i =>
                <Day
                  key={i}
                  {...{ i }}
                  {...{ d }}
                  {...{ w }}
                  className={base}
                  onClick={() => this.selectDate(i, w)}
                />
              )}
            </Group>
          )}
      </div>
    );
  }
}
