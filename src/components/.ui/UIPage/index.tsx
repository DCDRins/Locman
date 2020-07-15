import React, { ReactElement } from 'react'
import { withRouter } from 'react-router-dom'
import { HasChildren, HasRouterProps, HasClassName } from '../../../.types/props'
import Header from '../../Header'
import classNames from '../../../lib/classNames'
import useLocation from '../../../lib/useLocation'
import { appRoutes, officeAppRoutes } from '../../../common/dictionaries/routes'
import { projectName } from '../../../common/constants'

type Props = HasChildren & HasRouterProps & HasClassName & {
  theme: 'light' | 'dark';
  moveFirst?: boolean;
}
const defaultProps = Object.freeze({
  theme: 'dark',
})

class UIPage extends React.Component<Props, {}> {
  static readonly defaultProps = defaultProps

  componentDidMount() {
    const { match: { path } } = this.props
    console.log(this.props)
    window.scrollTo(0, 0)
    const title = Object.values(appRoutes)
      .concat(Object.values(officeAppRoutes))
      .find(route => {
        const _route = route.param
          ? route.absolutePath.replace(route.param, '')
          : route.absolutePath
        return _route.split('/').join('') === path.split('/').join('')
      });
    if (!title) return false;
    document.title = `${projectName.lang.ru} :: ${title.lang.ru}`;
  }

  render() {
    const {
      children,
      location: { pathname },
      theme,
      moveFirst = false,
      className = '',
    } = this.props
    const base = "Page"
    return (
      <main
        className={classNames(base, className,
        `theme-${theme}`, {
          'move-first': moveFirst,
        },
      )}>
        {children}
      </main>
    )
  }
}

export default withRouter(UIPage)