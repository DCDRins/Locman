import React, { Component, FormEvent } from 'react';
import { HasChildren, HasClassName } from '../../../common/types/props';
import Group from '../../.ui/Group';
import classNames from '../../../lib/classNames';
import LangContext from '../../../common/context/lang/lang.context';
import terms from '../../../common/terms';
import { appRoutes, Route } from '../../../common/routes';
import Input from '../../.ui/Input';

type State = typeof initialState & {}
type Props = HasChildren & HasClassName & {}

const initialState = Object.freeze({
  finderValue: '',
})

export default class Nav extends Component<Props, State> {
  readonly state: State = initialState

  _handleChange = (e: FormEvent<HTMLInputElement>) => this.setState({ finderValue: e.currentTarget.value })

  render() {
    const { className } = this.props
    const base = `${className}__ground`
    const { _handleChange } = this
    const { finderValue } = this.state
    return (
      <LangContext.Consumer>
        {({ getActual }) => getActual && (
          <div className={base}>
            <Group className={`${base}__route-container`}>
            {Object.values(appRoutes)
              .map(({ visibleInHeader, lang }: Route) => (
                <div className={classNames(`${base}__route`, {
                    [`${base}__route--active`]: !visibleInHeader,
                  })}
                >
                  {lang.ru}
                </div>
              ))}
            </Group>
            <Input
              type="text"
              name="finder"
              id="finder"
              onChange={_handleChange}
              value={finderValue}
              placeholder={getActual(terms.LOGIN)}
            />
          </div>
        )}
      </LangContext.Consumer>
    )
  }
}
