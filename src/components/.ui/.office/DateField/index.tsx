import React, { Component, HTMLAttributes } from 'react'
import Div from '../../Div'
import Button from '../../Button';
import DateTimePicker from '../../DateTImePicker';
import Icon from '../../Icon';
import { ReactComponent as DateIcon } from '../../../../assets/icons/date.svg';
import moment from 'moment';
import 'moment/locale/ru';
import Input from '../../Input';
import Group from '../../Group';
import Switch from '../../Switch';

type Props = typeof defaultProps & HTMLAttributes<HTMLDivElement> & {
  title?: string;
  readonly?: boolean;
  required?: boolean;
  field: {
    [key: string]: string
  }
  handleChange: (field: string, value?: string) => void
}
const defaultProps = Object.freeze({ })

type State = typeof initialState
const initialState = Object.freeze({
  m: moment(),
  datePickerClosed: true,
  enabled: false,
})

export default class DateField extends Component<Props, State> {
  state: State = {
    ...initialState,
    m: moment(Object.values(this.props.field)[0] || undefined)
  }
  dateFormat = 'YYYY-MM-DD HH:mm'

  componentDidMount() {
    const { field } = this.props
    const property = Object.values(field)[0]
    property.length > 0 && this.setState({ enabled: true })
  }

  handleMomentChange = m => {
    const { handleChange, field } = this.props
    this.setState({ m }, () => {
      const value = m.locale('ru').format(this.dateFormat)
      const property = Object.keys(field)[0];
      handleChange && handleChange(property, value);
    })
  }

  handleStateTrigger = (e: React.FormEvent<HTMLInputElement>) => {
    const { handleChange, field } = this.props
    const { enabled, m } = this.state
    this.setState({ enabled: e.currentTarget.checked }, () => {
      if (enabled) {
        const property = Object.keys(field)[0];
        handleChange && handleChange(property, '');
      } else this.handleMomentChange(m);
    })
  }

  datePickerTrigger = () => {
    this.setState(prevState => ({ datePickerClosed: !prevState.datePickerClosed }))
  }

  render() {
    const base = 'Date-Field';
    const { field, title, required } = this.props;
    const { m, datePickerClosed, enabled } = this.state;
    const key = Object.keys(field)[0]
    return (  
      <Div both className={base}>
        <Group justify="space-between" content="center">
          <Div className={`${base}__title`}>
            {title}
          </Div>
          {!required && (
            <Switch
              name={`${key}-switch`}
              defaultChecked={enabled}
              size="s"
              level="office"
              onChange={this.handleStateTrigger}
            />
          )}
        </Group>
        <Button
          className={`${base}__date`}
          size="l"
          disabled={!enabled}
          angular
          stretched="x"
          level="office-secondary"
          before={<Icon svg={DateIcon} />}
          onClick={this.datePickerTrigger}
        >
          {m.format(this.dateFormat)}
        </Button>
        <DateTimePicker
          onChange={this.handleMomentChange}
          className={`${base}__date-picker`}
          moment={m.locale('ru')}
          minStep={5}
          isClosed={datePickerClosed}
          onClose={this.datePickerTrigger}
        />
      </Div>
    )
  }
}