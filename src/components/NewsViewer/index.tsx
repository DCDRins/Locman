import React, { Component } from 'react';
import { HasChildren } from '../../common/types/props';
// import Div from '../.ui/Div';
import classNames from '../../lib/classNames';
import getHashCode from '../../lib/getHashCode';
import Section from '../.ui/Section';
import terms from '../../common/terms';
import Button from '../.ui/Button';
import LangContext from '../../common/context/lang/lang.context';
import Group from '../.ui/Group';

type State = {
  currentId: number;
}
type Props = typeof defaultProps & HasChildren & {
  newsList: Array<New>;
}
interface New {
  id: number;
  title: string;
  description: string;
  image?: string;
}
const defaultProps = Object.freeze({
  isLoading: true,
  newsList: [
    {
      id: 0,
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, doloribus cupiditate ipsum minus nostrum laudantium in facere veritatis quia',
      image: 'https://images.unsplash.com/photo-1527555197883-98e27ca0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
    {
      id: 1,
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, doloribus cupiditate ipsum minus',
      image: 'https://cdn23.img.ria.ru/images/103609/79/1036097900_0:158:3083:1892_600x0_80_0_0_30365e257ed6613f1974834fab5badfe.jpg',
    },
    {
      id: 2,
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, doloribus cupiditate ipsum minus',
      image: 'https://images.unsplash.com/photo-1527555197883-98e27ca0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
  ]
})

export default class Slider extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = {
    currentId: 0
  }
  _isMounted: boolean = true

  // componentDidMount() {
  //   const { newsList } = this.props
  //   if (newsList && newsList.length > 1) {
  //     // here state length param
  //   }
  // }

  componentWillUnmount() {
    this._isMounted = false
  }

  nextNew = () => {
    const { currentId } = this.state
    const { newsList: { length } } = this.props
    const { _isMounted } = this
    _isMounted && this.setState({ currentId: (currentId + 1) % length });
  }

  render() {
    const { currentId } = this.state
    const { newsList } = this.props
    const { nextNew } = this
    const base = "NewsViewer";
    return (
      <Section
        className={base}
        header={terms.NEWS_VIEWER}
        side={
          <LangContext.Consumer>
            {({ getActual }) => (
              getActual && (
                <Group className={`${base}__buttons`} content="center" justify="center">
                  <Button angular level="secondary" onClick={nextNew}>{getActual(terms.NEXT)}</Button>
                  <Button angular level="primary">{getActual(terms.NEWS_DETAILS)}</Button>
                </Group>
              )
            )}
          </LangContext.Consumer>
        }
      >
        <div className={`${base}__in`} onClick={nextNew}>
          {newsList.map(({ id, image, title, description }: New) => (
            <div key={getHashCode(`${id}`)}
              className={classNames(`${base}__in-image`, {
                [`${`${base}__in-image--active`}`]: id === currentId,
                [`${`${base}__in-image--passed`}`]: id < currentId,
              })}
              style={{ backgroundImage: `url('${image}')` }}
            >
              <div key={getHashCode(id + title)} className={`${base}__in-text-content`}>
                {title && <div className={`${base}__in-title`}>{title}</div>}
                {description && <div className={`${base}__in-description`}>{description}</div>}
              </div>
            </div>
          ))}
        </div>
      </Section>
    )
  }
}
