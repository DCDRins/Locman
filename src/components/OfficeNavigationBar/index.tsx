import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HasChildren, HasRouterProps } from '../../common/types/props';
import getHashCode from '../../lib/getHashCode';
import { officeAppRoutes } from '../../common/routes';
import LangContext from '../../common/context/lang/lang.context';
import Div from '../.ui/Div';
import Section from '../.ui/Section';
import Group from '../.ui/Group';

type State = { }
type Props = typeof defaultProps
& HasChildren
& HasRouterProps
& { }

const defaultProps = Object.freeze({ })
const initialState = Object.freeze({ })

// const getInitialSlide = ({ slideList }: Props) => slideList.slice().shift()
// declare function clearInterval(intervalId: NodeJS.Timeout): void;


class OfficeNavigationBar extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = initialState

  render() {
    const base = "Office-Navigation-Bar";
    const { location: { pathname } } = this.props
    return (
      <Section>
        <Group content="center" justify="center" rotateOnMedia className={base}>
          {Object.values(officeAppRoutes).map(({ absolutePath, lang }) => (
            pathname === absolutePath ? (
              <Div both key={getHashCode(absolutePath)} className={`${base}--current`}>
                <LangContext.Consumer>
                  {({ getActual }) => getActual && getActual({ lang })}
                </LangContext.Consumer>
              </Div>
            ) : (
              <Link to={absolutePath} key={getHashCode(absolutePath)}>
                <Div both>
                  <LangContext.Consumer>
                    {({ getActual }) => getActual && getActual({ lang })}
                  </LangContext.Consumer>
                </Div>
              </Link>
            )
          ))}
        </Group>
      </Section>
    )
  }
}

export default withRouter(OfficeNavigationBar)
