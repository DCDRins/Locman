import React, { Component } from 'react';
import InputSlider from 'react-input-slider';
import classNames from '../../../lib/classNames';
import Div from '../Div';

export default class extends Component {
  changeHours = ({ x }) => {
    const { moment, onChange } = this.props;
    moment.hours(x);
    onChange(moment);
  };

  changeMinutes = ({ x }) => {
    const { moment, onChange } = this.props;
    moment.minutes(x);
    onChange(moment);
  };

  render() {
    const {
      className,
      moment,
      hourStep,
      minStep,
    } = this.props
    const base = 'Time';
    return (
      <div className={classNames(base, className)}>
        <div className={`${base}__showtime`}>
          <span className={`${base}__time`}>{moment.format('HH')}</span>
          <span className={`${base}__separater`}>:</span>
          <span className={`${base}__time`}>{moment.format('mm')}</span>
        </div>

        <Div both>
          <div className={`${base}__time-text`}>Часы:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={23}
            xstep={hourStep}
            x={moment.hour()}
            onChange={this.changeHours}
          />
          <div className={`${base}__time-text`}>Минуты:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            xstep={minStep}
            x={moment.minute()}
            onChange={this.changeMinutes}
          />
        </Div>
      </div>
    );
  }
}
