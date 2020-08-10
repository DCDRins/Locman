import React, { HTMLAttributes, Component } from 'react';
import classNames from '../../../../lib/classNames';
import Div from '../../Div';
import Group, { GroupProps } from '../../Group';
import { HasChildren, HasDangerHTML, HasFormStatus } from '../../../../.types/props';
import Button from '../../Button';
import Icon from '../../Icon';
import { ReactComponent as EditIcon } from '../../../../assets/icons/edit.svg';
import { ReactComponent as CrossIcon } from '../../../../assets/icons/cross.svg';
import Input from '../../Input';
import Textarea from '../../Textarea';
import Switch from '../../Switch';
import NumericUpDown from '../../NumericUpDown';

type Props = HTMLAttributes<HTMLDivElement>
& HasChildren
& GroupProps
& HasDangerHTML
& {
  title?: string;
  showTitle?: boolean;
  bordered?: boolean;
  readonly?: boolean;
  lightMode?: boolean;
  custom?: boolean;
  isTextBox?: boolean;
  autoComplete?: string;
  error?: boolean;
  field?: {
    [key: string]: string | boolean | undefined
  };
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
  textareaRef = React.createRef<HTMLTextAreaElement>()

  componentWillUnmount() {
    const { _intervalId } = this
    this._isMounted = false;
    _intervalId && clearInterval(_intervalId)
  }

  editOff = () => this.setState({ editMode: false })

  editOn = () => {
    const { readonly, isTextBox } = this.props
    const { current } = isTextBox ? this.textareaRef : this.inputRef
    this.setState({ editMode: !readonly }, () => {
      this._intervalId = setInterval(() => {
        current && current.focus()
        this._intervalId && document.activeElement === current && clearInterval(this._intervalId)
      }, 100)
    })
  }

  handleFocus = e => e.currentTarget.select()

  render() {
    const {
      className = '',
      children,
      field,
      justify,
      bordered = false,
      onChange,
      autoComplete,
      showTitle = false,
      readonly = false,
      custom = false,
      isTextBox = false,
      lightMode = false,
      error = false,
      title,
      dangerouslySetInnerHTML,
      ...restProps
    } = this.props;
    const { editMode } = this.state;
    const base = 'Field'
    if (custom) return (
      <Div
        {...restProps}
        both
        className={classNames(base, className, {
          'light': lightMode
        })}
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
          className={classNames(`${base}__group`,{
            'bordered': bordered,
          })}
        >
          {children}
        </Group>
      </Div>
    )
    if (!field) return null;
    const key = Object.keys(field)[0]
    const property = field[key]
    if (property === undefined) return null;
    return (
      <Div
        {...restProps}
        both
        className={classNames(base, className, {
          'light': lightMode,
          'readonly': readonly,
          'error': error,
          'active': property === true,
          'textbox': isTextBox,
        })}
      >
        {title && (
          <Div className={classNames(`${base}__title`, {
            'show': showTitle,
          })}>
            {title}
          </Div>
        )}
        <Group
          content={isTextBox ? 'start' : 'center'}
          {...{ justify }}
          onDoubleClick={this.editOn}
          className={classNames(`${base}__group`,{
            'bordered': bordered,
          })}
        >
          <div className={`${base}__main`}>
            {dangerouslySetInnerHTML
            ? <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
            : children
              ? children
              : property
                ? key.includes('password') && typeof property === 'string'
                  ? `${property.split(/.?/).join('*')}`
                  : property
                : <div className={`${base}__empty-string`}>{title}...</div>
            }
          </div>
          {typeof property === 'string' && !readonly && (
            <Button
              level={lightMode ? "tertiary" : "office-secondary"}
              before={<Icon noStroke svg={!editMode ? EditIcon : CrossIcon} />}
              onClick={!editMode ? this.editOn : this.editOff}
            />
          )}
          {typeof property === 'boolean' && (
            <Switch
              checked={property}
              name={key}
              {...{ onChange }}
            />
          )}
        </Group>
        {typeof property === 'string' && (
          !isTextBox ? (
            <Input
              autoComplete={autoComplete ? autoComplete : key}
              className={`${base}__input`}
              type={key.includes('password') ? 'password' : 'text'}
              name={key}
              level="light"
              bordered
              hidden={!editMode && property !== undefined}
              getRef={this.inputRef}
              autoFocus
              defaultValue={property}
              onFocus={this.handleFocus}
              onBlur={this.editOff}
              placeholder={title}
              {...{ onChange }}
            />
          ) : (
            <Textarea
              className={`${base}__textarea`}
              name={key}
              level="light"
              bordered
              hidden={!editMode && property !== undefined}
              getRef={this.textareaRef}
              autoFocus
              defaultValue={property}
              onFocus={this.handleFocus}
              onBlur={this.editOff}
              placeholder={title}
              {...{ onChange }}
            />
          )
        )}
      </Div>
    );
  }
}
