import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import classNames from '../../../lib/classNames'
import { HasStyleObject } from '../../../.types/props'
import { withLanguage } from '../../../common/dictionaries/lang'
import LangContext from '../../../common/context/lang/lang.context'
import Group from '../Group'
import Icon from '../Icon'
import Div from '../Div'
import Image from '../Image'
import Preloader from '../Preloader'
import { ContextBaseState } from '../../../reducers/system-reducer'
import * as actions from '../../../actions'
import { closeContext } from '../../../actions/system-actions'

export interface DispatchedContextProps {
  openContext: typeof actions.systemActions.openContext;
  closeContext: typeof actions.systemActions.closeContext;
}
export interface StoredContextProps {
  context: ContextBaseState;
}
interface InjectedProps extends DispatchedContextProps, StoredContextProps { }

type ContextState = typeof initialState & HasStyleObject;
const initialState = Object.freeze({ })

class Context extends Component<InjectedProps, ContextState> {
  state: ContextState = initialState

  componentDidUpdate(prevProps) {
    const { context: { data }, closeContext } = this.props
    const { context: { data: prevData }} = prevProps
    if (data === prevData) return false;
    if (data) {
      const { meta: { boundings }, pinned } = data;
      const style: React.CSSProperties = {};
      document.addEventListener('click', this._handleOutsideClick)
      window.addEventListener('resize', closeContext)
      
      const node = ReactDOM.findDOMNode(this);
      if (node instanceof Element) {
        const { width, height } = node.getBoundingClientRect();
        const { offsetWidth, offsetHeight, scrollTop } = document.documentElement;
        // style.top = boundings.top + boundings.height;
        const eps = pinned ? scrollTop : 0;
        style.top = offsetHeight - eps < boundings.bottom + height - eps ? boundings.top - height + eps : boundings.top + boundings.height + eps;
        style.left = offsetWidth < boundings.left + width ? boundings.right - width : boundings.left;
        this.setState({ style });
      }
    } else {
      document.removeEventListener('click', this._handleOutsideClick, false)
      window.removeEventListener('resize', closeContext, false)
    }
  }

  _handleOutsideClick = e => {
    const node = ReactDOM.findDOMNode(this);
    node && !node.contains(e.target) && this.props.closeContext()
  }
  
  render() {
    const base = "Context";
    const {
      style,
    } = this.state;
    const {
      context: {
        data,
      },
      closeContext,
    } = this.props
    const { user, fields, pinned } = { ...data }
    return data && fields && (
      <div
        {...{ style }}
        className={classNames(base, {
          'pinned': pinned === true,
        })}
      >
        <LangContext.Consumer>
          {({ getActual }) => getActual && (
            <div className={`${base}__main`}>
              {user && (
                <Div both>
                  <Group justify="start" content="center" className={`${base}__header`}>
                    <Image src={user.image && user.image.path} height={35} width={35} rounded>
                      <Group content="center" justify="center" stretched>
                        {!user.image && (
                            user.name
                            ? user.name.charAt(0)
                            : user.email.charAt(0)
                          )
                        }
                      </Group>
                    </Image>
                    <Div className={`${base}__header__info`}>
                      <Group justify="start" orientation="vertical" content="start">
                        <div className={`${base}__header__name`}>{user.name}</div>
                        <div className={`${base}__header__email`}>{user.email}</div>
                      </Group>
                    </Div>
                  </Group>
                </Div>
              )}
              {user && <hr />}
              {fields.map(({ term, icon: iconProps, onClick, ...restProps }) => (
                <div
                  key={term.lang.ru}
                  className={`${base}__field`}
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    closeContext();
                    onClick && onClick(e)
                  }}
                >
                  <Group justify="start" content="center" stretched>
                    {iconProps && <Icon size={iconProps.size ? iconProps.size : 15} {...iconProps} />}
                    <div className={`${base}__field__title`}>
                      {getActual(term)}
                    </div>
                  </Group>
                </div>
              ))}
            </div>
          )}
        </LangContext.Consumer>
      </div>
    )
  };
}

export default Context;
