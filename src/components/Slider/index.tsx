import React, { Component } from 'react';
import { HasChildren } from '../../common/types/props';
import Div from '../.ui/Div';
import classNames from '../../lib/classNames';
import getHashCode from '../../lib/getHashCode';
import Section from '../.ui/Section';

type State = {
  currentSlideId: number;
}
type Props = typeof defaultProps & HasChildren & {
  slideList: Array<Slide>;
}
interface Slide {
  id: number;
  title: string;
  description: string;
  image?: string;
}
const defaultProps = Object.freeze({
  isLoading: true,
  timeDuration: 5000, // One slide stands for 5 sec by default
  slideList: [
    {
      id: 0,
      title: 'Lorem ipsum',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam, doloribus cupiditate ipsum minus nostrum laudantium in facere veritatis quia',
      image: 'https://edunavi.online/img/slide4-6bea70.png',
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
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      image: 'https://images.unsplash.com/photo-1527555197883-98e27ca0c1ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
    {
      id: 3,
      title: 'Lorem ipsum',
      description: 'Ipsam, doloribus cupiditate ipsum minus nostrum laudantium in facere veritatis quia',
      image: 'https://edunavi.online/img/slide1-a6d513.png',
    },
  ]
})

// const getInitialSlide = ({ slideList }: Props) => slideList.slice().shift()
// declare function clearInterval(intervalId: NodeJS.Timeout): void;


export default class Slider extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = {
    currentSlideId: 0
  }
  _intervalId: NodeJS.Timeout | undefined
  _isMounted: boolean = true

  componentDidMount() {
    const { slideList } = this.props
    const { startInterval } = this
    if (slideList && slideList.length > 1) {
      startInterval()
    }
  }

  componentWillUnmount() {
    const { _intervalId } = this
    this._isMounted = false
    if (_intervalId) clearInterval(_intervalId)
  }

  startInterval = () => {
    const { timeDuration } = this.props
    const { nextSlide } = this
    this._intervalId = setInterval(() => {
      nextSlide()
    }, timeDuration)
  }

  nextSlide = () => {
    const { currentSlideId } = this.state
    const { slideList: { length } } = this.props
    const { _isMounted } = this
    _isMounted && this.setState({ currentSlideId: (currentSlideId + 1) % length });
  }

  handleClick = () => {
    const { nextSlide, startInterval, _intervalId } = this
    if (_intervalId) clearInterval(_intervalId)
    nextSlide()
    startInterval()
  }

  render() {
    const { currentSlideId } = this.state
    const { slideList, timeDuration } = this.props
    const { handleClick } = this
    const base = "Slider";
    return (
      <Section className={base}
        side={slideList.map(({ id, title, description }: Slide, index: number) => (
          <div
            key={getHashCode(id + title)}
            className={classNames(`${base}__in-text-content`, {
              [`${base}__in-text-content--active`]: id === currentSlideId,
            })}
          >
            {title && <div className={`${base}__in-title`}>{title}</div>}
            {description && <div className={`${base}__in-description`}>{description}</div>}
          </div>
        ))}
      >
        <div className={`${base}__in`} onClick={handleClick}>
          {slideList.map(({ id, image }: Slide) => (
            <div
              key={getHashCode(`${id}`)}
              className={classNames(`${base}__in-image`, {
                [`${`${base}__in-image--active`}`]: id === currentSlideId,
              })}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
        <Div className={`${base}__pointers`}>
          {slideList.map(({ id }: Slide) => (
            <div key={getHashCode(`s-${id}`)}
              className={classNames(`${base}__pointers__in`, {
                [`${base}__pointers__in--active`]: id === currentSlideId
              })}
            >
              <div className={`${base}__pointers__in--progress`} style={{ transition: id === currentSlideId ? `width ${timeDuration * 0.001}s linear` : 'all 0s' }} />
            </div>
          ))}
        </Div>
      </Section>
    )
  }
}
