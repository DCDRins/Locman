import React, { Component } from 'react';
import Group from '../.ui/Group';
import { ReactComponent as Success } from '../../assets/icons/success.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import Icon from '../.ui/Icon';
import classNames from '../../lib/classNames';
import { ErrorReply, Message } from '../../.types/types';
import Div from '../.ui/Div';
import Preloader from '../.ui/Preloader';

export type StoredSystemStateProps = Message & {
  isLoading: boolean;
  error?: ErrorReply;
}
export type DispatchedSystemStateProps = { }

interface Props extends DispatchedSystemStateProps, StoredSystemStateProps { }
type State = {
  done: boolean; // state it for delay
}
// TODO: mobile vision of non-list view
export default class SystemState extends Component<Props, State> {
  state: State = {
    done: !this.props.isLoading,
  }

  componentDidUpdate(prevProps) {
    const { isLoading: prevIsLoading } = prevProps;
    const { isLoading } = this.props;
    if (prevIsLoading === isLoading) return
    setTimeout(() => {
      this.setState({ done: !isLoading })
    }, prevIsLoading && !isLoading ? 2000 : 0)
  }
  render() {
    const base = "System-State";
    const {
      message,
      isLoading,
      error: {
        message: errorMessage = '',
        // errors,
      } = {},
    } = this.props;
    const { done } = this.state;
    return (
      <Div both half className={classNames(base, {
          'active': !done,
        })}
      >
        <Group content="center" justify="space-between">
          {message && message}
          {errorMessage && errorMessage}
          {!isLoading && !errorMessage && (
            <Icon svg={Success} isRect size={30} className={`${base}__success-icon`} />
          )}
          {errorMessage && (
            <Icon svg={ErrorIcon} isRect size={30} className={`${base}__error-icon`} />
          )}
          <Preloader {...{ isLoading }} size={30} />
        </Group>
      </Div>
    )
  }
}