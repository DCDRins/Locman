import React, { Component, FormEvent } from 'react';
import { HasChildren, HasClassName } from '../../common/types/props';
import Group from '../.ui/Group';
import Button from '../.ui/Button';
import Input from '../.ui/Input';
import { ReactComponent as SignInIcon } from '../../assets/icons/signin.svg'
import Icon from '../.ui/Icon';
import classNames from '../../lib/classNames';
import LangContext from '../../common/context/lang/lang.context';
import terms from '../../common/terms';
import { AuthResponse } from '../../models';
import { authAsync } from '../../actions/client-actions';

// type Props = ReturnType<typeof mapStateToProps> &
//   ReturnType<typeof mapDispatchToProps> & {
//   };

export interface StoredAuthProps {
  authData?: AuthResponse;
}
export interface DispatchedAuthProps {
  auth: typeof authAsync.request;
}
export type OwnProps = HasChildren & HasClassName

type InjectedProps = StoredAuthProps & DispatchedAuthProps & OwnProps
type State = typeof initialState & {}

const initialState = Object.freeze({
  login: '',
  password: '',
  loginValidated: false,
})
export default class Auth extends Component<InjectedProps, State> {
  readonly state: State = initialState
  input: React.RefObject<HTMLInputElement> = React.createRef()

  componentDidUpdate() {
    const { input: { current } } = this
    if (current) current.focus();
  }

  _handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { currentTarget: { value } } = e;
    const { loginValidated } = this.state
    const loginRegexp = /^$|^[а-яА-Яa-zA-Z0-9_-]+$/
    if (loginValidated) {
      this.setState({ password: value })
      return;
    }
    if (value.match(loginRegexp)) {
      this.setState({ login: value })
    }
  }

  validate = () => {
    const { login, loginValidated, password } = this.state;
    const { auth } = this.props;
    if (loginValidated && password.length !== 0) {
      auth({ login, password })
      return;
    }
    if (login.length === 0) return false
    // ...
    // check database for this login <- todo
    this.setState({ loginValidated: true });
  }

  unvalidate = () => {
    this.setState({ loginValidated: false });
  }

  render() {
    const { className  = ''} = this.props
    const base = 'Auth';
    const { _handleChange, validate, unvalidate, input } = this
    const { login, password, loginValidated } = this.state
    return (
      <LangContext.Consumer>
        {({ getActual }) => getActual && (
          <div className={base}>
            <div className={classNames(`${base}__title`, className, {
                [`${base}__title--active`]: loginValidated
              })}
            >
              {getActual(terms.PASSWORD)}
            </div>
            <div className={classNames(`${base}__title`, {
                [`${base}__title--active`]: !loginValidated
              })}
            >
              {getActual(terms.LOGIN)}
            </div>
            {/* <Group stretched> */}
              <Input
                getRef={input}
                type={!loginValidated ? 'text' : 'password'}
                name={!loginValidated ? 'login' : 'password'}
                id={!loginValidated ? 'login' : 'password'}
                onChange={_handleChange}
                value={!loginValidated ? login : password}
                placeholder={!loginValidated ? getActual(terms.LOGIN) : getActual(terms.PASSWORD)}
                onKeyDown={validate}
                button={
                  <Group>
                    <Button
                      className={`${base}__button`}
                      level="simple"
                      onClick={unvalidate}
                      hidden={!loginValidated}
                      angular
                    >
                      <div>{getActual(terms.BACK)}</div>
                    </Button>
                    <Button
                      className={`${base}__button`}
                      level="simple"
                      before={<Icon svg={SignInIcon} />}
                      onClick={validate}
                      angular
                    />
                  </Group>
                }
              />
            {/* </Group> */}
            <div className={`${base}__subtitle`}>{getActual(terms.SIGN_UP)}</div>
          </div>
        )}
      </LangContext.Consumer>
    )
  }
}
