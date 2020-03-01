import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../../lib/classNames';
import Div from '../../Div';
import Group, { GroupProps } from '../../Group';
import { HasChildren } from '../../../../common/types/props';
import Button from '../../Button';
import Icon from '../../Icon';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import Input from '../../Input';
import Switch from '../../Switch';

type Props = HTMLAttributes<HTMLDivElement>
& HasChildren
& GroupProps
& {
  title?: string;
  showTitle?: boolean;
  field: {
    [key: string]: number | string | boolean
  }
}

type State = typeof initialState & { }

const initialState = Object.freeze({
  editMode: false,
})

export default class Field extends Component<Props, State> {
  readonly state: State = initialState
  
  _intervalId?: NodeJS.Timeout
  _isMounted: boolean = true
  inputRef = React.createRef<HTMLInputElement>()

  componentWillUnmount() {
    const { _intervalId } = this
    this._isMounted = false;
    _intervalId && clearInterval(_intervalId)
  }
  triggerMode = () => {
    const { current } = this.inputRef
    const { editMode } = this.state
    this.setState({ editMode: !editMode },() => {
      if (editMode) return
      this._intervalId = setInterval(() => {
        !editMode && current && current.focus()
        this._intervalId && document.activeElement === current && clearInterval(this._intervalId)
      }, 100)
    })
  }

  render() {
    const {
      className = '',
      children,
      field,
      justify,
      onChange,
      showTitle = false,
      title,
      ...restProps
    } = this.props;
    const { editMode } = this.state;
    const base = 'Field'
    const key = Object.keys(field)[0]
    const property = field[key]
    return (
      <Div {...restProps} both className={classNames(base, className)}>
        {title && (
          <Div className={classNames(`${base}__title`, {
            'show': showTitle,
          })}>
            {title}
          </Div>
        )}
        <Group content="center" {...{ justify }}>
          <div className={`${base}__main`}>
            {children
              ? children
              : field[key]
            }
          </div>
          {typeof property === 'string' && (
            <Button
              level="office-secondary"
              before={<Icon noStroke svg={EditIcon} />}
              onClick={this.triggerMode}
            />
          )}
          {typeof property === 'boolean' && (
            <Switch
              active={property}
              name={key}
              {...{ onChange }}
            />
          )}
        </Group>
        {typeof property !== 'boolean' && (
          <Input
            className={`${base}__input`}
            name={key}
            level="light"
            bordered
            hidden={!editMode}
            getRef={this.inputRef}
            autoFocus
            defaultValue={property}
            onBlur={this.triggerMode}
            placeholder={title}
            {...{ onChange }}
          />
        )}
      </Div>
    );
  }
}
