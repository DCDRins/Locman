import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { HasChildren, HasRouterProps } from '../../../../.types/props';
import getHashCode from '../../../../lib/getHashCode';
import { officeAppRoutes } from '../../../../common/dictionaries/routes';
import LangContext from '../../../../common/context/lang/lang.context';
import Div from '../../Div';
import Section from '../../Section';
import Group from '../../Group';
import isSatisfied from '../../../../lib/isSatisfied';
import useLocation from '../../../../lib/useLocation';

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
  static readonly defaultProps = defaultProps
  readonly state: State = initialState

  render() {
    const base = "Office-Navigation-Bar";
    const { location: { pathname } } = this.props
    return (
      // <Section>
        <Group content="center" justify="center" rotateOnMedia className={base}>
          {Object.values(officeAppRoutes).map(({ absolutePath, lang, credentials, visibleInHeader }) => (
            visibleInHeader && isSatisfied(credentials) && (
              pathname === absolutePath || useLocation(pathname, absolutePath, 2) ? (
                <Div both key={absolutePath} className={`${base}--current`}>
                  <LangContext.Consumer>
                    {({ getActual }) => getActual && getActual({ lang })}
                  </LangContext.Consumer>
                </Div>
              ) : (
                <Link to={absolutePath} key={absolutePath}>
                  <Div both>
                    <LangContext.Consumer>
                      {({ getActual }) => getActual && getActual({ lang })}
                    </LangContext.Consumer>
                  </Div>
                </Link>
              )
            )
          ))}
        </Group>
      // </Section>
    )
  }
}

export default withRouter(OfficeNavigationBar)
