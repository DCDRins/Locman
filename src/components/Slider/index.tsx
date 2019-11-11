import React, { Component } from 'react';
import { HasChildren } from '../../common/types/props';
import Div from '../.ui/Div';
import { Slide } from './types';
import classNames from '../../lib/classNames';
import getHashCode from '../../lib/getHashCode';

type State = {
  currentSlideId: number;
}
type Props = typeof defaultProps & HasChildren & {
  slideList?: Array<Slide>;
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
declare function clearInterval(intervalId: NodeJS.Timeout): void;

export default class Slider extends Component<Props, State> {
  static readonly defaultProps: Props = defaultProps
  readonly state: State = {
    currentSlideId: -1
  }
  intervalId: NodeJS.Timeout | undefined;

  componentDidMount() {
    const { slideList } = this.props
    const { startInterval, nextSlide } = this
    if (slideList && slideList.length > 1) {
      nextSlide()
      startInterval()
    }
  }

  componentWillUnmount() {
    const { intervalId } = this;
    if (intervalId) clearInterval(intervalId)
  }

  startInterval = () => {
    const { timeDuration } = this.props
    this.intervalId = setInterval(() => {
      this.nextSlide()
    }, timeDuration)
  }

  nextSlide = () => {
    const { currentSlideId } = this.state
    const { slideList } = this.props
    let nextSlide = slideList[currentSlideId + 1]
    this.setState({ currentSlideId: nextSlide ? currentSlideId + 1 : 0 });
  }

  render() {
    const { currentSlideId } = this.state
    const { slideList, timeDuration } = this.props
    const { intervalId, startInterval, nextSlide } = this

    const SlideContent = ({ image, title, description }: Slide) => {
      const handleClick = () => {
        if (intervalId) clearInterval(intervalId)
        nextSlide()
        startInterval()
      }
      return (
        <Div className="slide">
          <div className="slide__in" onClick={handleClick}>
            {image && <div className="slide__in-image" style={{ backgroundImage: `url('${image}')` }} />}
            <div className="slide__in-text-content">
              {title && <div className="slide__in-title">{title}</div>}
              {description && <div className="slide__in-description">{description}</div>}
            </div>
          </div>
        </Div>
      )
    }
    return (
      <section className="Slider">
        {slideList && (
          <div className="Slider__wrapper">
            <SlideContent {...slideList[currentSlideId]} />
            <Div className="Slider__pointers">
              {slideList.map(({ id }: Slide) => (
                <div key={getHashCode(`s-${id}`)}
                  className={classNames("Slider__pointers__in", {
                    'Slider__pointers__in--active': id === currentSlideId
                  })}
                >
                  <div className="Slider__pointers__in--progress" style={{ transition: id === currentSlideId ? `width ${timeDuration * 0.001}s linear` : 'all 0s' }} />
                </div>
              ))}
            </Div>
          </div>
        )}
      </section>
    )
  }
}
