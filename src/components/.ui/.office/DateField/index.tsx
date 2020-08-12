import React, { Component, HTMLAttributes } from 'react'
import Div from '../../Div'
import Button from '../../Button';
import DateTimePicker from '../../DateTImePicker';
import Icon from '../../Icon';
import { ReactComponent as DateIcon } from '../../../../assets/icons/date.svg';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import Input from '../../Input';
import Group from '../../Group';
import Switch from '../../Switch';
import * as actions from '../../../../actions';
import { IModal } from '../../../../models/system';
import cuid from 'cuid';

export interface DispatchedDateFieldProps {
  openModal: typeof actions.systemActions.openModal;
  closeModal: typeof actions.systemActions.closeModal;
}

type Props = typeof defaultProps
  & HTMLAttributes<HTMLDivElement>
  & DispatchedDateFieldProps
  & {
    title?: string;
    readonly?: boolean;
    required?: boolean;
    dateFormat?: string;
    field: {
      [key: string]: string | undefined
    }
    handleChange: (field: string, value?: string) => void;
  }

const defaultProps = Object.freeze({
  dateFormat: 'DD.MM.YYYY HH:mm',
})

type State = typeof initialState & {
  m?: Moment
}
const initialState = Object.freeze({
  datePickerClosed: true,
  enabled: false,
})

export default class DateField extends Component<Props, State> {
  state: State = initialState
  static readonly defaultProps = defaultProps

  componentDidMount() {
    const { field, dateFormat } = this.props
    const property = Object.values(field)[0]
    property ? (
      this.setState({ m: moment(property, dateFormat) }),
      this.setState({ enabled: true })
    ) : this.setState({ m: moment() })
  }

  handleMomentChange = m => {
    const { handleChange, field, dateFormat } = this.props
    this.setState({ m }, () => {
      const value = m.locale('ru').format(dateFormat)
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
        this.setState({ datePickerClosed: true })
      } else this.handleMomentChange(m);
    })
  }

  datePickerTrigger = () => {
    this.setState(prevState => ({ datePickerClosed: !prevState.datePickerClosed }))
  }

  render() {
    const base = 'Date-Field';
    const { field, title, required, dateFormat, openModal } = this.props;
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
              switchSize="s"
              level="office"
              onChange={this.handleStateTrigger}
              checked={enabled}
            />
          )}
        </Group>
        <Button
          className={`${base}__date`}
          size="l"
          disabled={!enabled}
          angular
          stretched="x"
          level={datePickerClosed ? 'office-tertiary' : 'office-primary'}
          before={<Icon svg={DateIcon} />}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const boundings = e.currentTarget.getBoundingClientRect();
            openModal({
              children: m && (
                <DateTimePicker
                  onChange={this.handleMomentChange}
                  moment={m.locale('ru')}
                  minStep={5}
                />
              ),
              meta: {
                boundings,
                pinned: true,
              },
            })
          }}
        >
          {m && m.format(dateFormat)}
        </Button>
      </Div>
    )
  }
}
