import React, { HTMLAttributes, ReactNode, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from '../../../../lib/classNames'
import { HasChildren, HasRef } from '../../../../common/types/props'
import { Route } from '../../../../common/routes'
import Icon from '../../Icon'


export type Props = HTMLAttributes<HTMLInputElement> & HasRef<HTMLInputElement> & {
  level?: 'personal',
  size?: 's' | 'm' | 'l',
  align?: 'left' | 'center' | 'right',
  /**
   * @ignore
   */
  disabled?: boolean;
}
export type State = typeof initialState & { }

const initialState = Object.freeze({
  active: false,
})

export default class Switch extends Component<Props, State> {
  static readonly defaultProps: Props = { }
  readonly state: State = initialState

  render() {
    const {
      size = 'm',
      level = 'personal',
      align = 'center',
      disabled,
      ...restProps
    } = this.props
    const { active } = this.state

    const base = "Switch"
    return (
      <label className={classNames(base, {
        [`${base}--active`]: active,
      })}>
        <input {...restProps} type="checkbox" name="any" id="any" checked={active} onChange={() => this.setState({ active: !active })} />
      </label>
    )
  }
}
