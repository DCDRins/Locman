import React, { HTMLAttributes, ReactNode, ReactElement, Component } from 'react'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import classNames from '../../../lib/classNames'
import { HasStyleObject, HasClassName, HasChildren } from '../../../.types/props'
import { withLanguage } from '../../../common/dictionaries/lang'
import LangContext from '../../../common/context/lang/lang.context'
import Group from '../Group'
import Icon, { IconProps } from '../Icon'
import getHashCode from '../../../lib/getHashCode'
import Div, { DivProps } from '../Div'

export type ContextField = HTMLAttributes<HTMLDivElement> & IconProps & {
  term: withLanguage;
  link?: string;
}
type ContextProps = HTMLAttributes<HTMLLabelElement>
& HasStyleObject
& {
  header?: ReactElement;
  fields: Array<ContextField>;
  contextButton: ReactElement;
  // additionals?: Array<Field>;
}
type ContextState = typeof initialState & HasStyleObject;
const initialState = Object.freeze({
  hidden: true,
})

class Context extends Component<ContextProps, ContextState> {
  state: ContextState = initialState
  
  _handleClick = () => this.setState(props => ({ hidden: !props.hidden }))
  _closeContext = () => this.setState({ hidden: false })

  componentDidMount() {
    const style: React.CSSProperties = {};
    const node = ReactDOM.findDOMNode(this);
    if ((node instanceof Element)) {
      const { height }= node && node.getBoundingClientRect();
      style.top = height + 10;
      this.setState({ style });
    }
  }
  
  render() {
    const {
      className = '',
      fields,
      contextButton,
      header,
      ...restProps
    } = this.props
    const base = "Context";
    const { hidden, style } = this.state;
    return (
      <label
        {...restProps}
        className={classNames(base, className)}
        onFocus={this._handleClick}
        onBlur={this._handleClick}
        tabIndex={0}
      >
        {contextButton}
        <div
          {...{ style }}
          className={classNames(`${base}__content`, {
            'hidden': hidden,
          })}
        >
          <LangContext.Consumer>
            {({ getActual }) => getActual && (
              <div className={`${base}__main`}>
                {header && React.cloneElement(header, { className: `${base}__header`})}
                {header && <hr />}
                {fields.map(({ term, svg, size, ...otherProps }: ContextField, index) => (
                  <Div
                    both
                    key={getHashCode(term.lang.ru)}
                    className={`${base}__field`}
                    {...otherProps}
                  >
                    <Group justify="start" content="center" stretched>
                      <Icon {...{ svg, size }} />
                      {getActual(term)}
                    </Group>
                  </Div>
                ))}
              </div>
            )}
          </LangContext.Consumer>
        </div>
      </label>
    )
  };
}

export default Context;
