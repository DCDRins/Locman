import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from '../../../lib/classNames'
import { HasStyleObject } from '../../../.types/props'
import { ContextBaseState } from '../../../reducers/system-reducer'
import * as actions from '../../../actions'
import createContextEnv from '../../../lib/createContextEnv'
import Div from '../Div'

export interface DispatchedModalProps {
  openModal: typeof actions.systemActions.openModal;
  closeModal: typeof actions.systemActions.closeModal;
}
export interface StoredModalProps {
  context: ContextBaseState;
}
interface InjectedProps extends DispatchedModalProps, StoredModalProps { }

type ModalState = typeof initialState & HasStyleObject;
const initialState = Object.freeze({ })

class Modal extends Component<InjectedProps, ModalState> {
  state: ModalState = initialState

  componentDidUpdate(prevProps) {
    const { context: { modal }, closeModal } = this.props
    const { context: { modal: prevData }} = prevProps
    if (modal === prevData) return;
    if (!modal) {
      document.removeEventListener('click', this._handleOutsideClick, false);
      window.removeEventListener('resize', closeModal, false);
      return;
    }

    createContextEnv(this, modal,
      () => {
        document.addEventListener('click', this._handleOutsideClick)
        window.addEventListener('resize', closeModal)
      },
      state => this.setState(state)
    );
  }

  _handleOutsideClick = e => {
    const node = ReactDOM.findDOMNode(this);
    node && !node.contains(e.target) && this.props.closeModal()
  }
  
  render() {
    const base = "Modal";
    const {
      style,
    } = this.state;
    const {
      context: {
        modal,
      },
    } = this.props
    const { children, meta } = { ...modal }
    const { pinned } = { ...meta };

    return modal && (
      <Div
        {...{ style }}
        both
        className={classNames(base, {
          'pinned': pinned === true,
        })}
      >
        {children}
      </Div>
    )
  };
}

export default Modal;
