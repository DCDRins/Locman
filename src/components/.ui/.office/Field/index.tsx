import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../../lib/classNames';
import Div from '../../Div';
import Group, { GroupProps } from '../../Group';
import { HasChildren } from '../../../../.types/props';
import Button from '../../Button';
import Icon from '../../Icon';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ReactComponent as CrossIcon } from '../../../../assets/icons/cross.svg';
import Input from '../../Input';
import Switch from '../../Switch';
import NumericUpDown from '../../NumericUpDown';

type Props = HTMLAttributes<HTMLDivElement>
& HasChildren
& GroupProps
& {
  title?: string;
  showTitle?: boolean;
  bordered?: boolean;
  readonly?: boolean;
  field: {
    [key: string]: string | boolean
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

  editOff = () => this.setState({ editMode: false })

  editOn = () => {
    const { readonly } = this.props
    const { current } = this.inputRef
    this.setState({ editMode: !readonly }, () => {
      this._intervalId = setInterval(() => {
        current && current.focus()
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
      bordered = false,
      onChange,
      showTitle = false,
      readonly = false,
      title,
      ...restProps
    } = this.props;
    const { editMode } = this.state;
    const base = 'Field'
    const key = Object.keys(field)[0]
    const property = field[key]
    return (
      <Div
        {...restProps}
        both
        className={classNames(base, className)}
      >
        {title && (
          <Div className={classNames(`${base}__title`, {
            'show': showTitle,
          })}>
            {title}
          </Div>
        )}
        <Group
          content="center"
          {...{ justify }}
          onDoubleClick={this.editOn}
          className={classNames(`${base}__group`,{
            'bordered': bordered,
          })}
        >
          <div className={`${base}__main`}>
            {children
              ? children
              : property ? property : (
                <div className={`${base}__empty-string`}>{title}...</div>
              )
            }
          </div>
          {typeof property === 'string' && !readonly && (
            <Button
              level="office-secondary"
              before={<Icon noStroke svg={!editMode ? EditIcon : CrossIcon} />}
              onClick={!editMode ? this.editOn : this.editOff}
            />
          )}
          {typeof property === 'boolean' && (
            <Switch
              defaultChecked={property}
              name={key}
              {...{ onChange }}
            />
          )}
        </Group>
        {typeof property === 'string' && (
          <Input
            className={`${base}__input`}
            name={key}
            level="light"
            bordered
            hidden={!editMode && property !== undefined}
            getRef={this.inputRef}
            autoFocus
            defaultValue={property}
            onBlur={this.editOff}
            placeholder={title}
            {...{ onChange }}
          />
        )}
      </Div>
    );
  }
}
